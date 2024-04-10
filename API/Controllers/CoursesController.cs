using API.DTOs;
using API.Extensions;
using AutoMapper.Configuration.Conventions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class CoursesController : BaseController
{
    private readonly ICourseRepository _repo;
    private readonly UserManager<AppUser> _userManager;

    public CoursesController(ICourseRepository repo, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _repo = repo;
    }

    [HttpGet]
    public async Task<IReadOnlyList<Course>> GetCourses()
    {
        return await _repo.GetCoursesAsync();
    }

    [HttpGet("{courseId}")]
    public async Task<ActionResult<Course>> GetCourseById(int courseId)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        var course = await _repo.GetCourseByIdAsync(courseId, user.Id);

        if (course != null) return course;

        else return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<CourseDto>> AddCourse([FromBody] string title)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        var course = new Course
        {
            Title = title,
            CreatorId = user.Id
        };

        await _repo.AddCourseAsync(course);

        return new CourseDto
        {
            Title = course.Title,
            CourseId = course.Id
        };
    }

    [HttpPost]
    [Route("enroll")]
    public async Task<ActionResult<EnrollDto>> AddUserToCourse(EnrollDto enrollDto)
    {
        var user = await _userManager.FindByEmailAsync(enrollDto.UserEmail);

        var currentUser = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (user == null) return NotFound("Could not find user with such email!");

        if (user.Email == null) return BadRequest("User email is null or invalid!");

        if (await _repo.IsCreator(enrollDto.CourseId, currentUser.Id) == false) return BadRequest("User can not enroll other users in this course!");

        var course = await _repo.GetCourseByIdAsync(enrollDto.CourseId, user.Id);

        var userCourse = new UserCourse
        {
            UsersId = user.Id,
            CoursesId = course.Id,
            User = user,
            Course = course
        };

        await _repo.AddUserToCourseAsync(userCourse);

        var result = new EnrollDto
        {
            CourseId = course.Id,
            UserEmail = user.Email
        };

        return Ok(result);
    }
}