using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class AppServicesExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<StudyContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
            });
        });

        return services;
    }
}