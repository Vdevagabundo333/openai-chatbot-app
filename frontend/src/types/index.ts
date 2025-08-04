export interface Bot {
  id: string;
  name: string;
  context: string;
  messages?: ChatMessageResponse[];
}

export interface ChatMessageResponse {
  id: string;
  botId: string;
  userMessage: string;
  botResponse: string;
  timestamp: Date;
}
