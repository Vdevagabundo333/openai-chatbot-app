using System;
using System.Text.Json.Serialization;

namespace HighCapital.Chatbot.Api.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public required string UserMessage { get; set; }
        public required string BotResponse { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public int BotId { get; set; }

        [JsonIgnore]
        public Bot? Bot { get; set; }
    }
}