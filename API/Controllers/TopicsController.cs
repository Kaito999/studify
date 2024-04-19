using API.DTOs;
using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TopicsController : BaseController
{
    private readonly ICourseRepository _repo;
    private readonly UserManager<AppUser> _userManager;
    private readonly IGenericRepository<Topic> _topicRepo;

    public TopicsController(ICourseRepository repo, IGenericRepository<Topic> topicRepo, UserManager<AppUser> userManager)
    {
        _topicRepo = topicRepo;
        _userManager = userManager;
        _repo = repo;
    }

    [HttpPost]
    [Route("addtopic")]
    public async Task<ActionResult<TopicDto>> AddTopic([FromQuery] TopicDto topicDto)
    {
        if (!IsUserCourseCreator(topicDto.CourseId).Result.Value) return BadRequest("Current user can not create topics in this course!");

        var course = new Topic
        {
            CourseId = topicDto.CourseId,
            Title = topicDto.Title
        };

        await _topicRepo.AddAsync(course);

        var result = new TopicDto
        {
            CourseId = course.Id,
            Title = course.Title
        };

        return Ok(result);
    }

    // [HttpPut]
    // [Route("updatetopic")]
    // public async Task<ActionResult<TopicDto>> UpdateTopic([FromQuery] TopicDto topicDto)
    // {
    //     if (!IsUserCourseCreator(topicDto.CourseId).Result.Value) return BadRequest("Current user can not create topics in this course!");

    //     var course = new Topic
    //     {
    //         CourseId = topicDto.CourseId,
    //         Title = topicDto.Title
    //     };

    //     await _topicRepo.AddAsync(course);

    //     var result = new TopicDto
    //     {
    //         CourseId = course.Id,
    //         Title = course.Title
    //     };

    //     return Ok(result);
    // }

    public async Task<ActionResult<bool>> IsUserCourseCreator(int courseId)
    {
        var currentUser = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (currentUser == null) return Unauthorized();

        return await _repo.IsCreator(courseId, currentUser.Id);
    }
}