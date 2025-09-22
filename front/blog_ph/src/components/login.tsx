"use client";

import { useState } from 'react';
import axios from 'axios';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from '../lib/api';
import { toast } from 'sonner';

// Definição do schema de validação com Zod
const emailFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido.").refine(
    email => email.endsWith('@phng.com.br'),
    "Domínio de e-mail não permitido."
  ),
});

const codeFormSchema = z.object({
  code: z.string().length(6, "O código deve ter 6 dígitos."),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;
type CodeFormValues = z.infer<typeof codeFormSchema>;

type LoginState = 'emailInput' | 'codeInput';

const LoginPage = () => {
  const [step, setStep] = useState<LoginState>('emailInput');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const codeForm = useForm<CodeFormValues>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSendCode = async (data: EmailFormValues) => {
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/send-code', { name: data.name , email: data.email });
      setUserEmail(data.email);
      setStep('codeInput');
      toast.success("Por favor, verifique o seu e-mail corporativo.");

    } catch {
      setError('Falha ao enviar o código. Tente novamente.');
      toast.error("Por favor, verifique seus dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (data: CodeFormValues) => {
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/verify-code', { code: data.code, email: userEmail,  });
      toast.success(`Bem vindo!`);
    } catch {
      setError('Código inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'emailInput') {
    return (
      <div className="space-y-4 w-3/4 m-auto">
        <div className='w-full flex flex-col text-left'>
          <h1>Bem vindo de volta!</h1>
          <p>Entre para gerenciar os posts.</p>
        </div>
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleSendCode)} >
            <FormField
              control={emailForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full bg-red-600 py-6 hover:bg-red-700 transition cursor-pointer' disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar código'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </Form>
      </div>
    );
  }

  return (
    <Form {...codeForm}>
      <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-4">
        <FormField
          control={codeForm.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Verificação</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Verificando...' : 'Verificar Código'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default LoginPage;