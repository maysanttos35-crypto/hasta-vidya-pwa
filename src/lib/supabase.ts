import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://svcozvffwqlnksgbiewx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Y296dmZmd3FsbmtzZ2JpZXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODc3MzQsImV4cCI6MjA5MDA2MzczNH0._p6rUtSMoRV3fEiiQK8TP28dkRhS2ptQcobSJ1tjcso';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type User = {
  id: string;
  email: string;
  nome: string;
  role: 'admin' | 'professor' | 'aluno';
  foto_url?: string;
  ativo: boolean;
  criado_em: string;
  atualizado_em: string;
};

export type Client = {
  id: string;
  nome: string;
  hand_type?: string;
  data_leitura?: string;
  status: 'rascunho' | 'pendente' | 'entregue' | 'follow' | 'concluido';
  tags: string[];
  html?: string;
  filename?: string;
  telefone?: string;
  email?: string;
  follow_up_date?: string;
  follow_up_note?: string;
  profile_notes?: string;
  owner_id: string;
  criado_em: string;
  atualizado_em: string;
};

export type AuditLog = {
  id: string;
  tabela: string;
  acao: 'INSERT' | 'UPDATE' | 'DELETE';
  registro_id: string;
  usuario_id?: string;
  dados_antes?: Record<string, any>;
  dados_depois?: Record<string, any>;
  criado_em: string;
};

export type Notification = {
  id: string;
  usuario_id: string;
  tipo: string;
  titulo: string;
  mensagem?: string;
  dados?: Record<string, any>;
  lido: boolean;
  criado_em: string;
};

export type Permission = {
  id: string;
  usuario_id: string;
  client_id: string;
  nivel_acesso: 'view' | 'edit' | 'admin';
  criado_em: string;
};

export type Reading = {
  id: string;
  client_id: string;
  versao: number;
  html?: string;
  criado_por?: string;
  criado_em: string;
};
