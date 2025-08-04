using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HighCapital.Chatbot.Api.Data;
using HighCapital.Chatbot.Api.Services;
using HighCapital.Chatbot.Api.Models;

public class SendMessageRequest
{
    public int BotId { get; set; }
    public required string Message { get; set; }
}

namespace HighCapital.Chatbot.Api.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ChatService _chatService;

        public ChatController(AppDbContext context, ChatService chatService)
        {
            _context = context;
            _chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(SendMessageRequest request)
        {
            string userMessage = request.Message;
            int botId = request.BotId;

            var bot = await _context.Bots.Include(bot => bot.Messages).FirstOrDefaultAsync(bot => bot.Id == botId);
            if (bot == null) return NotFound();

            var history = bot.Messages?.Select(m => m.UserMessage).ToList() ?? new List<string>();
            var botReply = await _chatService.SendMessageAsync(bot.Context, history, userMessage);

            var newMessage = new ChatMessage
            {
                UserMessage = userMessage,
                BotResponse = botReply,
                BotId = botId
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();

            return Ok(newMessage);
        }
    }
}