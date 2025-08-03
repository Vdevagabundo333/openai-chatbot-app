using System;

namespace HighCapital.Chatbot.Api.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string UserMessage { get; set; }
        public string BotResponse { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public int BotId { get; set; }
        public Bot Bot { get; set; }
    }
}