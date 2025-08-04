namespace HighCapital.Chatbot.Api.Models
{
    public class Bot
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Context { get; set; }

        public List<ChatMessage>? Messages { get; set; } = new List<ChatMessage>();
    }
}