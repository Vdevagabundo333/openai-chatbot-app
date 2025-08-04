import { api } from '@/services/api';
import { Bot } from '@/types';

export interface ChatMessageRequest {
  Name: string;
  Context: string;
}

export const createBot = async ({
  Name,
  Context
}: ChatMessageRequest) => {
  try {
    const response = await api.post<Bot>('/bots', {
      Context,
      Name
    });

    return response.data;
  } catch (error) {
    console.error('Error on create bot:', error);
    throw new Error('Erro ao criar o bot');
  }
};

export const getBots = async () => {
  try {
    const response = await api.get<Bot[]>('/bots');

    return response.data;
  } catch (error) {
    console.error('Error on get bot:', error);
    throw new Error('Erro ao buscar os bots');
  }
};
