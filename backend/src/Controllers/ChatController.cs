using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HighCapital.Chatbot.Api.Data;
using HighCapital.Chatbot.Api.Services;
using System.Linq;
using System.Threading.Tasks;
using HighCapital.Chatbot.Api.Models;

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

        [HttpPost("{botId}")]
        public async Task<IActionResult> SendMessage(int botId, [FromBody] string userMessage)
        {
            var bot = await _context.Bots.Include(b => b.Messages).FirstOrDefaultAsync(b => b.Id == botId);
            if (bot == null) return NotFound();

            var history = bot.Messages.Select(m => m.UserMessage).ToList();
            var botReply = await _chatService.SendMessageAsync(bot.Context, history, userMessage);

            var msg = new ChatMessage
            {
                UserMessage = userMessage,
                BotResponse = botReply,
                BotId = botId
            };

            _context.Messages.Add(msg);
            await _context.SaveChangesAsync();

            return Ok(msg);
        }
    }
}