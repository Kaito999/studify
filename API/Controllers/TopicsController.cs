using API.DTOs;
using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class TopicsController : BaseController
{
    private readonly ICourseRepository _courseRepo;
    private readonly UserManager<AppUser> _userManager;
    private readonly IGenericRepository<Topic> _genericTopicRepo;
    private readonly ITopicRepository _topicRepository;

    public TopicsController(ICourseRepository repo, ITopicRepository topicRepository, IGenericRepository<Topic> genericTopicRepo, UserManager<AppUser> userManager)
    {
        _topicRepository = topicRepository;
        _genericTopicRepo = genericTopicRepo;
        _userManager = userManager;
        _courseRepo = repo;
    }


    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Topic>>> GetCourseTopics([FromQuery] int courseId)
    {
        var topics = await _topicRepository.GetTopicsByCourseIdAsync(courseId);
        return Ok(topics);
    }


    [HttpPost]
    [Route("addtopic")]
    public async Task<ActionResult<Topic>> AddTopic([FromQuery] TopicDto topicDto)
    {
        if (!IsUserCourseCreator(topicDto.CourseId).Result.Value) return BadRequest("Current user can not create topics in this course!");

        var course = new Topic
        {
            CourseId = topicDto.CourseId,
            Title = topicDto.Title
        };

        await _genericTopicRepo.AddAsync(course);

        return Ok(course);
    }


    [HttpPost]
    [Route("addfeedback")]
    public async Task<ActionResult<FeedbackDto>> AddTopicFeedback([FromBody] FeedbackDto feedbackDto)
    {
        var feedback = new Feedback
        {
            TopicId = feedbackDto.TopicId,
            Text = feedbackDto.Text,
            UploadTime = feedbackDto.UploadTime
        };

        await _topicRepository.AddFeedbackAsync(feedback);

        return Ok(feedbackDto);
    }


    [HttpGet]
    [Route("feedbacks")]
    public async Task<ActionResult<IReadOnlyList<Feedback>>> GetTopicFeedbacks([FromQuery] int topicId)
    {
        var feedbacks = await _topicRepository.GetFeedbacksByTopicIdAsync(topicId);

        return Ok(feedbacks);
    }


    [HttpGet]
    [Route("check")]
    public async Task<ActionResult<bool>> IsUserCourseCreator(int courseId)
    {
        var currentUser = await _userManager.FindByEmailFromClaimsPrincipal(User);

        if (currentUser == null) return Unauthorized();

        return await _courseRepo.IsCreator(courseId, currentUser.Id);
    }
}