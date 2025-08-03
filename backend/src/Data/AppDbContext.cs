using Microsoft.EntityFrameworkCore;
using HighCapital.Chatbot.Api.Models;

namespace HighCapital.Chatbot.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Bot> Bots { get; set; }
        public DbSet<ChatMessage> Messages { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}