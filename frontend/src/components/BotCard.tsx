import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from '@/types';
import { MessageCircle } from 'lucide-react';

interface BotCardProps {
  bot: Bot;
  onStartChat: (bot: Bot) => void;
}

export const BotCard = ({ bot, onStartChat }: BotCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {bot.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Contexto:</p>
            <p className="text-sm bg-muted p-2 rounded">{bot.context}</p>
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={() => onStartChat(bot)} size="sm">
              Iniciar Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};