namespace HighCapital.Chatbot.Api.Helpers
{
  public static class Env
  {
    public static string OPENAI_API_KEY => Environment.GetEnvironmentVariable("OPENAI_API_KEY") ?? "";
    public static string FRONTEND_URL => Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "";
    public static string ASPNETCORE_DATABASE_CONNECTION => "/app/data/chatbots.db";
    public static string ASPNETCORE_URLS => Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ?? "";
    public static string ASPNETCORE_ENVIRONMENT => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "";
  }
}
