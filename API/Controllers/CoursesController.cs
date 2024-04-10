using API.DTOs;
using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CoursesController : BaseController
{
    private readonly ICourseRepository _repo;
    private readonly UserManager<AppUser> _userManager;

    public CoursesController(ICourseRepository repo, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _repo = repo;
    }

    [HttpPost]
    [Route("enroll")]
    public async Task<ActionResult<EnrollDto>> AddUserToCourse(EnrollDto enrollDto)
    {
        var course = await _repo.GetCourseByIdAsync(enrollDto.CourseId);
        var user = await _userManager.FindByEmailAsync(enrollDto.UserEmail);

        var userCourse = new UserCourse
        {
            UsersId = user.Id,
            CoursesId = course.Id,
            User = user,
            Course = course
        };

        await _repo.AddUserToCourseAsync(userCourse);

        return new EnrollDto
        {
            CourseId = userCourse.CoursesId,
            UserEmail = user.Email
        };
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CourseDto>> AddCourse([FromBody] CourseDto courseDto)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(HttpContext.User);

        var course = new Course
        {
            Title = courseDto.Title,
            CreatorId = user.Id
        };

        await _repo.AddCourseAsync(course);

        return new CourseDto
        {
            Title = courseDto.Title,
        };
    }

    [HttpGet]
    public async Task<IReadOnlyList<Course>> GetCourses()
    {
        return await _repo.GetCoursesAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourseById(int id)
    {
        var course = await _repo.GetCourseByIdAsync(id);
        if (course != null) return course;
        else return NotFound();
    }
}