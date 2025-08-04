import { api } from '@/services/api';
import { ChatMessageResponse } from '@/types';

export interface ChatMessageRequest {
  botId: string;
  message: string;
}

export const sendMessage = async ({
  botId,
  message
}: ChatMessageRequest) => {
  try {
    const response = await api.post<ChatMessageResponse>('/chat', {
      message,
      botId
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Erro ao enviar mensagem para o chatbot');
  }
};
