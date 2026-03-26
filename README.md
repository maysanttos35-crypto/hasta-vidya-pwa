# Hasta Vidya — Central de Leituras

PWA profissional para gerenciamento de leituras de mãos (Quiromancia Védica) com sincronização em nuvem, sistema de permissões e notificações em tempo real.

## 🚀 Tecnologias

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **PWA:** Workbox + Service Workers
- **Styling:** Tailwind CSS
- **Deploy:** Vercel

## 📋 Funcionalidades (Fase 1)

✅ Autenticação com email/senha e Google  
✅ Dashboard com estatísticas em tempo real  
✅ Sincronização em nuvem (Supabase Realtime)  
✅ Sistema de permissões (Admin/Professor/Aluno)  
✅ Histórico de mudanças e auditoria  
✅ Notificações em tempo real  
✅ PWA instalável em celular  

## 🔧 Instalação Local

```bash
# Instalar dependências
npm install

# Variáveis de ambiente
cp .env.example .env

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Deploy no Vercel

1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automático!

## 🗄️ Banco de Dados (Supabase)

As tabelas são criadas automaticamente pelo script SQL:

- `users` - Usuários do sistema
- `clients` - Clientes/leituras
- `readings` - Histórico de versões
- `audit_log` - Auditoria de mudanças
- `notifications` - Notificações
- `permissions` - Permissões de acesso

## 📧 Contato

Desenvolvido para Ueslem Medeiros - Hasta Vidya  
Quiromancia Védica

## 📄 Licença

Propriedade privada. Todos os direitos reservados.
