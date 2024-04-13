using API.DTOs;
using API.Extensions;
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
    private readonly IGenericRepository<Course> _courseRepo;

    public CoursesController(ICourseRepository repo, IGenericRepository<Course> courseRepo, UserManager<AppUser> userManager)
    {
        _courseRepo = courseRepo;
        _userManager = userManager;
        _repo = repo;
    }

    [HttpGet]
    public async Task<IReadOnlyList<CourseDto>> GetCourses()
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        var courses = await _repo.GetCourses(user.Id);

        var result = courses.Select(c => new CourseDto
        {
            CourseId = c.Id,
            CreatorId = c.CreatorId,
            Title = c.Title,
            Topics = c.Topics,
            ImageUrl = c.ImageUrl
        }).ToList();

        return result;
    }

    [HttpGet("{courseId}")]
    public async Task<ActionResult<Course>> GetCourseById(int courseId)
    {
        var course = await _courseRepo.GetByIdAsync(courseId);

        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<CourseCreationDto>> AddCourse([FromBody] CourseCreationDto courseDto)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (user == null) return NotFound("User not found!");

        var course = new Course
        {
            Title = courseDto.Title,
            CreatorId = user.Id
        };

        await _courseRepo.AddAsync(course);

        return new CourseCreationDto
        {
            Title = course.Title,
            CourseId = course.Id
        };
    }

    [HttpGet("iscreator/{courseId}")]
    public async Task<ActionResult<bool>> IsUserCourseCreator(int courseId)
    {
        var currentUser = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (currentUser == null) return Unauthorized();

        return await _repo.IsCreator(courseId, currentUser.Id);
    }

    [HttpPost]
    [Route("enroll")]
    public async Task<ActionResult<EnrollDto>> AddUserToCourse(EnrollDto enrollDto)
    {
        if (!IsUserCourseCreator(enrollDto.CourseId).Result.Value) return BadRequest("Current user can not enroll other users in this course!");

        var user = await _userManager.FindByEmailAsync(enrollDto.UserEmail);

        if (user == null) return NotFound("Could not find user with such email!");

        if (user.Email == null) return BadRequest("User email is null or invalid!");

        var course = await _repo.GetCourseByIdAsync(enrollDto.CourseId);

        if (course == null) return NotFound("Course not found!");

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