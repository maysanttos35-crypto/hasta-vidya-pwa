import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, nome);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] p-6">
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 55 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2.5 + 0.8 + 'px',
              height: Math.random() * 2.5 + 0.8 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twk ${2 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: Math.random() * 6 + 's',
              opacity: 0.15 + Math.random() * 0.45,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md">
        <div
          className="bg-[var(--card)] border border-[rgba(201,168,76,0.22)] rounded-2xl p-10 shadow-2xl"
          style={{
            animation: 'loginIn 0.4s cubic-bezier(0.34, 1.36, 0.64, 1) both',
          }}
        >
          {/* Top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold-lo)] via-[var(--gold)] to-[var(--gold-lo)] rounded-t-2xl" />

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold-lo)] to-[var(--gold-hi)] flex items-center justify-center text-3xl shadow-lg"
              style={{
                boxShadow: '0 4px 18px rgba(201, 168, 76, 0.3)',
              }}
            >
              ✋
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center font-bold text-2xl text-[var(--text-hi)] mb-1 playfair">
            Hasta Vidya
          </h1>
          <p className="text-center text-sm text-[var(--muted)] mb-7">
            Central de Leituras · Ueslem Medeiros
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[var(--bg)] border border-[var(--rim)] rounded-lg px-4 py-3 text-[var(--text-hi)] placeholder-[var(--faint)] focus:border-[var(--gold-lo)] focus:bg-[var(--mid)] outline-none transition"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[var(--bg)] border border-[var(--rim)] rounded-lg px-4 py-3 text-[var(--text-hi)] placeholder-[var(--faint)] focus:border-[var(--gold-lo)] focus:bg-[var(--mid)] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--bg)] border border-[var(--rim)] rounded-lg px-4 py-3 text-[var(--text-hi)] placeholder-[var(--faint)] focus:border-[var(--gold-lo)] focus:bg-[var(--mid)] outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--gold)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-[rgba(192,64,64,0.12)] border border-[rgba(192,64,64,0.3)] rounded-lg p-3 text-sm text-[#e07070] text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full bg-gradient-to-r from-[var(--gold-lo)] to-[var(--gold)] text-[var(--bg)] font-bold py-3 rounded-lg uppercase tracking-wider hover:brightness-110 active:brightness-100 disabled:opacity-50 transition transform hover:translate-y-[-2px]"
            >
              {isLoading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          {/* Toggle signup/signin */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm text-[var(--muted)] hover:text-[var(--gold)] transition"
            >
              {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Crie uma'}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[var(--faint)] mt-8">
            Hasta Vidya v1.0 · Acesso restrito à equipe
          </p>
        </div>
      </div>
    </div>
  );
}
