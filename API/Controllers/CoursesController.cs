using API.DTOs;
using API.Extensions;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
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
    private readonly IGenericRepository<Topic> _topicRepo;

    public CoursesController(ICourseRepository repo, IGenericRepository<Course> courseRepo, IGenericRepository<Topic> topicRepo, UserManager<AppUser> userManager)
    {
        _courseRepo = courseRepo;
        _topicRepo = topicRepo;
        _userManager = userManager;
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<Pagination<CourseDto>>> GetCourses([FromQuery] PaginationParams pageParams)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        var courses = await _repo.GetCoursesAsync(user.Id, pageParams.PageIndex, pageParams.PageSize);

        var totalCount = await _repo.GetTotalCourseCountAsync(user.Id);

        var data = courses.Select(c => new CourseDto
        {
            CourseId = c.Id,
            CreatorId = c.CreatorId,
            Title = c.Title,
            Topics = c.Topics,
            ImageUrl = c.ImageUrl
        })
        .OrderBy(c => c.Title)
        .ToList();

        return Ok(new Pagination<CourseDto>(pageParams.PageIndex, pageParams.PageSize, totalCount, data));
    }

    [HttpGet("{courseId}")]
    public async Task<ActionResult<CourseDto>> GetCourseById(int courseId)
    {
        var course = await _courseRepo.GetByIdAsync(courseId);

        if (course == null) return NotFound();

        return new CourseDto
        {
            CourseId = course.Id,
            CreatorId = course.CreatorId,
            Title = course.Title,
            Topics = course.Topics,
            ImageUrl = course.ImageUrl
        };
    }

    [HttpPost]
    public async Task<ActionResult<CourseCreationDto>> AddCourse([FromQuery] CourseCreationDto courseCreationDto)
    {
        var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (user == null) return NotFound("User not found!");

        var course = new Course
        {
            Title = courseCreationDto.Title,
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

    [HttpDelete]
    [Route("delete")]
    public async Task<ActionResult> DeleteCourse([FromQuery] int courseId)
    {
        if (!IsUserCourseCreator(courseId).Result.Value) return BadRequest("");

        await _courseRepo.DeleteAsync(courseId);

        return Ok();
    }
}