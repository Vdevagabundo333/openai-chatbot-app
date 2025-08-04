using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HighCapital.Chatbot.Api.Data;
using HighCapital.Chatbot.Api.Models;

namespace HighCapital.Chatbot.Api.Controllers
{
    [ApiController]
    [Route("api/bots")]
    public class BotsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BotsController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Create(Bot bot)
        {
            _context.Bots.Add(bot);
            await _context.SaveChangesAsync();
            return Ok(bot);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var botsWithMessages = await _context.Bots
                .Include(bot => bot.Messages)
                .ToListAsync();

            return Ok(botsWithMessages);
        }
    }
}