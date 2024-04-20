using API.Extensions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Helpers;

public static class EndPointValidation
{
    public static async Task<bool> IsUserCourseCreator(int courseId, string userId, ICourseRepository context)
    {
        return await context.IsCreator(courseId, userId);
    }
}