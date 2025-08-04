import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bot } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const botSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  context: z.string().min(20, 'Contexto deve ter pelo menos 20 caracteres'),
});

type BotFormData = z.infer<typeof botSchema>;

interface CreateBotFormProps {
  onCreateBot: (bot: Omit<Bot, 'id' | 'createdAt'>) => Promise<void>;
}

export const CreateBotForm = ({ onCreateBot }: CreateBotFormProps) => {
  const form = useForm<BotFormData>({
    resolver: zodResolver(botSchema),
    defaultValues: {
      name: '',
      context: '',
    },
  });

  const onSubmit = async (data: BotFormData) => {
    await onCreateBot({
      name: data.name,
      context: data.context,
    })

    form.reset();
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Criar Novo Chatbot</CardTitle>
        <CardDescription>
          Defina as características do seu chatbot personalizado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Bot</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Assistente de Vendas" {...field} />
                  </FormControl>
                  <FormDescription>
                    Um nome descritivo para identificar seu chatbot
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contexto Inicial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Você é um assistente de vendas educado e prestativo. Sempre responda de forma cordial e tente ajudar o cliente com suas dúvidas sobre produtos."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este contexto será usado em todas as interações com o bot
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Criar Chatbot
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};