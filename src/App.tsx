import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[var(--rim)] border-t-[var(--gold)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted)]">Carregando...</p>
        </div>
      </div>
    );
  }

  return user ? <HomePage /> : <LoginPage />;
}

export default App;
