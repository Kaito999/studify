namespace API.DTOs;

public class UserDto
{
    public required string Nickname { get; set; }
    public required string Email { get; set; }
    public required string Token { get; set; }
}