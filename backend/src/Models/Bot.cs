using System.Collections.Generic;

namespace HighCapital.Chatbot.Api.Models
{
    public class Bot
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Context { get; set; }
        public List<ChatMessage> Messages { get; set; }
    }
}