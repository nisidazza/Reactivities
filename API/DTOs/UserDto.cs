namespace API.DTOs
{
    public class UserDto
    {
        // props we want to send back when a user has successfully logged in or registered
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
    }
}