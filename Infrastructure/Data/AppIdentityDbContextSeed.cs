using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
        if (!@userManager.Users.Any())
        {
            var user = new AppUser
            {
                Nickname = "mike",
                Email = "mike@test.com",
                UserName = "mike@test.com",
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}