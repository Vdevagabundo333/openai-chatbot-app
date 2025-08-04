import { BotCard } from '@/components/BotCard';
import { ChatInterface } from '@/components/ChatInterface';
import { CreateBotForm } from '@/components/CreateBotForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { createBot, getBots } from '@/services/botService';
import { Bot, ChatMessageResponse } from '@/types';
import { MessageCircle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [activeView, setActiveView] = useState<'list' | 'create' | 'chat'>('list');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function getBotsList() {
    try {
      const result = await getBots();

      setBots(result);
    } catch (error) {

    }
  }

  useEffect(() => {
    getBotsList();
  }, [])

  const handleCreateBot = async (botData: Bot) => {
    try {
      const result = await createBot({
        Name: botData.name,
        Context: botData.context,
      })

      setBots([...bots, result]);
      setShowCreateForm(false);

      toast({
        title: 'Sucesso!',
        description: 'Chatbot criado com sucesso.',
      });

      return result;
    } catch (error) {
      console.error('Error creating bot:', error);

      toast({
        title: 'Erro',
        description: error.message || 'Erro ao criar o chatbot.',
        variant: 'destructive',
      });

      return error;
    }
  };

  const handleStartChat = (bot: Bot) => {
    setSelectedBot(bot);
    setActiveView('chat');
    setMessages(bot.messages ?? []);
  };

  const handleSendMessage = (message: ChatMessageResponse) => {
    setMessages([...messages, message]);
  };

  const getBotMessages = (botId: string) => {
    return messages.filter(msg => msg.botId === botId);
  };

  const handleBack = () => {
    setActiveView('list');
    setSelectedBot(null);
  };

  if (activeView === 'chat' && selectedBot) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInterface
            bot={selectedBot}
            messages={getBotMessages(selectedBot.id)}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageCircle className="h-8 w-8" />
                Meus Chatbots
              </h1>
              <p className="text-muted-foreground mt-1">
                Crie e gerencie seus chatbots personalizados
              </p>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Bot
            </Button>
          </div>

          {showCreateForm && (
            <CreateBotForm onCreateBot={handleCreateBot} />
          )}

          {bots.length === 0 && !showCreateForm ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nenhum chatbot encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Comece criando seu primeiro chatbot personalizado
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Bot
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bots.map((bot) => (
                <BotCard
                  key={bot.id}
                  bot={bot}
                  onStartChat={handleStartChat}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
