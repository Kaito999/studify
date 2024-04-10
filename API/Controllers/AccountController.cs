using System.Security.Claims;
using API.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        var user = await _userManager.FindByEmailAsync(email);

        return new UserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user),
            Nickname = user.Nickname
        };
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }

    /*
    [Authorize]
    [HttpGet("courses")]
    public async Task<ActionResult<Address>> GetUserAddress()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        var user = await _userManager.FindByEmailAsync(email);

        return user.Address;
    }
    */

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized();

        return new UserDto
        {
            Email = loginDto.Email,
            Token = _tokenService.CreateToken(user),
            Nickname = user.Nickname
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            return BadRequest("Email is already being used!");

        var user = new AppUser
        {
            Nickname = registerDto.Email,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest();

        return new UserDto
        {
            Nickname = user.Nickname,
            Email = registerDto.Email,
            Token = _tokenService.CreateToken(user),
        };
    }
}