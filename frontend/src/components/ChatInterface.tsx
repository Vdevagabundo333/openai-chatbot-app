import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { sendMessage } from '@/services/chatService';
import { Bot, ChatMessageResponse } from '@/types';
import { ArrowLeft, Bot as BotIcon, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ChatInterfaceProps {
  bot: Bot;
  messages: ChatMessageResponse[];
  onSendMessage: (message: ChatMessageResponse) => void;
  onBack: () => void;
}

interface MessageFormData {
  message: string;
}

export const ChatInterface = ({ bot, messages, onSendMessage, onBack }: ChatInterfaceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, watch } = useForm<MessageFormData>();

  const messageValue = watch('message', '');

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (data: MessageFormData) => {
    if (!data.message.trim()) return;

    onSendMessage({
      botId: bot.id,
      userMessage: data.message,
      botResponse: '',
      timestamp: new Date(),
      id: Date.now().toString(),
    });
    reset();
    setIsLoading(true);

    try {
      const response = await sendMessage({
        botId: bot.id,
        message: data.message,
      });

      const botResponse = response;

      onSendMessage(botResponse);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a mensagem. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-row items-center space-y-0 pb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <BotIcon className="h-5 w-5" />
            <div>
              <CardTitle className="text-lg">{bot.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{bot.context}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6 max-h-[700px] overflow-auto" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <BotIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Inicie uma conversa com {bot.name}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    <div className="flex items-start gap-3 flex-row-reverse">
                      <div className="p-2 rounded-full bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="max-w-[70%] text-right">
                        <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                          <p className="text-sm">{message.userMessage}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {message.botResponse && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-muted">
                          <BotIcon className="h-4 w-4" />
                        </div>
                        <div className="max-w-[70%] text-left">
                          <div className="p-3 rounded-lg bg-muted">
                            <p className="text-sm">{message.botResponse}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <BotIcon className="h-4 w-4" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <Input
                {...register('message', { required: true })}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !messageValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};