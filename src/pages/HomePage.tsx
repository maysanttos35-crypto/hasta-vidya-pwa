import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, type Client } from '@/lib/supabase';
import { LogOut, Settings, Plus, Search } from 'lucide-react';

export function HomePage() {
  const { user, signOut } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchClients();

    // Subscribe to realtime changes
    const subscription = supabase
      .from('clients')
      .on('*', (payload) => {
        console.log('Realtime update:', payload);
        fetchClients();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.hand_type?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => client.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(
    new Set(clients.flatMap((c) => c.tags || []))
  );

  const stats = {
    total: clients.length,
    entregues: clients.filter((c) => c.status === 'entregue').length,
    pendentes: clients.filter((c) => c.status === 'pendente').length,
    followups: clients.filter((c) => c.status === 'follow').length,
  };

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      <div className="w-72 bg-[var(--surface)] border-r border-[rgba(201,168,76,0.13)] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[rgba(201,168,76,0.13)]">
          <h1 className="text-xl font-bold text-[var(--gold-hi)] playfair mb-1">
            Hasta Vidya
          </h1>
          <p className="text-xs text-[var(--muted)]">Central de Leituras</p>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[rgba(201,168,76,0.13)]">
          <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--rim)] rounded-lg px-3 py-2">
            <Search size={16} className="text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--text)] placeholder-[var(--faint)]"
            />
          </div>
        </div>

        {/* Clients list */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredClients.length === 0 ? (
            <div className="p-4 text-center text-[var(--faint)] text-sm">
              Nenhum cliente encontrado
            </div>
          ) : (
            <div className="space-y-1">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-3 rounded-lg cursor-pointer hover:bg-[rgba(201,168,76,0.07)] transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gold-lo)] to-[var(--gold-hi)] flex items-center justify-center text-xs font-bold text-[var(--bg)] flex-shrink-0">
                      {client.nome
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text-hi)] truncate">
                        {client.nome}
                      </p>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {client.hand_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--faint)]">
                      {client.data_leitura}
                    </span>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{
                        backgroundColor:
                          client.status === 'entregue'
                            ? '#2a7a50'
                            : client.status === 'pendente'
                            ? '#c9a84c'
                            : '#3a6070',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add button */}
        <div className="p-3 border-t border-[rgba(201,168,76,0.13)]">
          <button className="w-full bg-gradient-to-r from-[var(--gold-lo)] to-[var(--gold)] text-[var(--bg)] font-bold py-2 rounded-lg uppercase text-xs tracking-wider hover:brightness-110 flex items-center justify-center gap-2">
            <Plus size={16} />
            Nova Leitura
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-14 bg-[var(--surface)] border-b border-[rgba(201,168,76,0.13)] flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-[var(--gold-hi)] playfair">
            Home
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[var(--gold-dim)] transition text-[var(--muted)] hover:text-[var(--gold)]">
              <Settings size={20} />
            </button>
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-[var(--gold-dim)] transition text-[var(--muted)] hover:text-[var(--red)]"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-[var(--rim)] border-t-[var(--gold)] animate-spin mx-auto mb-4" />
                <p className="text-[var(--muted)]">Carregando clientes...</p>
              </div>
            </div>
          ) : (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-[var(--card)] border border-[rgba(201,168,76,0.18)] rounded-2xl p-5">
                  <p className="text-2xl font-bold text-[var(--gold)] playfair mb-1">
                    {stats.total}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Total de Clientes</p>
                </div>
                <div className="bg-[var(--card)] border border-[rgba(201,168,76,0.18)] rounded-2xl p-5">
                  <p className="text-2xl font-bold text-[var(--gold)] playfair mb-1">
                    {stats.entregues}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Entregues</p>
                </div>
                <div className="bg-[var(--card)] border border-[rgba(201,168,76,0.18)] rounded-2xl p-5">
                  <p className="text-2xl font-bold text-[var(--gold)] playfair mb-1">
                    {stats.pendentes}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Pendentes</p>
                </div>
                <div className="bg-[var(--card)] border border-[rgba(201,168,76,0.18)] rounded-2xl p-5">
                  <p className="text-2xl font-bold text-[var(--gold)] playfair mb-1">
                    {stats.followups}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Follow-ups</p>
                </div>
              </div>

              {/* Tags filter */}
              {allTags.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-bold text-[var(--text-hi)] mb-3">
                    Filtrar por Tipo
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.includes(tag)
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag]
                          )
                        }
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition ${
                          selectedTags.includes(tag)
                            ? 'bg-[var(--gold-dim)] border-[var(--gold-lo)] text-[var(--gold-hi)]'
                            : 'border border-[var(--rim)] text-[var(--muted)] hover:border-[var(--gold-lo)]'
                        }`}
                        style={{
                          borderWidth: '1px',
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clients grid */}
              <div>
                <p className="text-sm font-bold text-[var(--text-hi)] mb-3">
                  Clientes
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className="bg-[var(--card)] border border-[rgba(201,168,76,0.13)] rounded-2xl p-4 cursor-pointer hover:border-[rgba(201,168,76,0.32)] transition"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--gold-lo)] to-[var(--gold-hi)] flex items-center justify-center text-xs font-bold text-[var(--bg)] flex-shrink-0">
                          {client.nome
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[var(--text-hi)] truncate">
                            {client.nome}
                          </p>
                          <p className="text-xs text-[var(--muted)] truncate">
                            {client.hand_type}
                          </p>
                        </div>
                      </div>
                      {client.tags && client.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {client.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-[var(--gold-dim)] text-[var(--gold)] font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--faint)]">
                          {client.data_leitura}
                        </span>
                        <div
                          className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor:
                              client.status === 'entregue'
                                ? 'rgba(42, 122, 80, 0.2)'
                                : client.status === 'pendente'
                                ? 'rgba(201, 168, 76, 0.15)'
                                : 'rgba(58, 96, 112, 0.2)',
                            color:
                              client.status === 'entregue'
                                ? '#5dba88'
                                : client.status === 'pendente'
                                ? '#e2c97e'
                                : '#7fa8be',
                            border:
                              client.status === 'entregue'
                                ? '1px solid rgba(42, 122, 80, 0.4)'
                                : client.status === 'pendente'
                                ? '1px solid rgba(201, 168, 76, 0.3)'
                                : '1px solid rgba(58, 96, 112, 0.4)',
                          }}
                        >
                          {client.status === 'entregue' && '✅'}
                          {client.status === 'pendente' && '⏳'}
                          {client.status === 'rascunho' && '📝'}
                          {client.status === 'follow' && '🔔'}
                          {client.status === 'concluido' && '🏁'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold-lo)] to-[var(--gold)] text-[var(--bg)] font-bold text-2xl shadow-lg hover:scale-110 transition transform"
        style={{
          boxShadow: '0 4px 14px rgba(201, 168, 76, 0.28)',
        }}
      >
        +
      </button>
    </div>
  );
}
