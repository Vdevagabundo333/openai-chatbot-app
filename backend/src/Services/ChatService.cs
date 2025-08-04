using OpenAI_API;

namespace HighCapital.Chatbot.Api.Services
{
    public class ChatService
    {
        private readonly OpenAIAPI _api;

        public ChatService(string apiKey)
        {
            _api = new OpenAIAPI(apiKey);
        }

        public async Task<string> SendMessageAsync(string context, List<string> history, string newMessage)
        {
            var chat = _api.Chat.CreateConversation();
            chat.AppendSystemMessage(context);
            foreach (var msg in history)
                chat.AppendUserInput(msg);

            chat.AppendUserInput(newMessage);
            var response = await chat.GetResponseFromChatbotAsync();
            return response;
        }
    }
}