'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Connection {
  id: number;
  username: string;
  full_name: string;
  avatar_url: string | null;
  profession_type: string;
  specialization: string | null;
  current_workplace: string | null;
  kota?: string | null;
  connection_id: number;
  status?: string;
}

export default function NetworkPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pending, setPending] = useState<Connection[]>([]);
  const [suggestions, setSuggestions] = useState<Connection[]>([]);
  const [tab, setTab] = useState<'connections' | 'pending' | 'suggestions'>('connections');

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      api.getConnections().then(data => {
        setConnections(data.connections);
        setPending(data.pending);
        setSuggestions(data.suggestions);
      }).catch(() => {});
    }
  }, [user]);

  const handleAccept = async (connectionId: number) => {
    await api.respondConnection(connectionId, 'accept');
    const conn = pending.find(p => p.connection_id === connectionId);
    setPending(prev => prev.filter(p => p.connection_id !== connectionId));
    if (conn) setConnections(prev => [...prev, conn]);
  };

  const handleReject = async (connectionId: number) => {
    await api.respondConnection(connectionId, 'reject');
    setPending(prev => prev.filter(p => p.connection_id !== connectionId));
  };

  const handleConnect = async (userId: number) => {
    await api.sendConnection(userId);
    setSuggestions(prev => prev.filter(s => s.id !== userId));
  };

  if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Jaringan Saya</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm border p-1 mb-6">
        {[
          { key: 'connections' as const, label: `Koneksi (${connections.length})` },
          { key: 'pending' as const, label: `Permintaan (${pending.length})` },
          { key: 'suggestions' as const, label: 'Saran' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 text-sm py-2.5 rounded-lg font-medium transition ${
              tab === t.key ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'connections' && (
        connections.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
            <p className="mb-2">Belum ada koneksi</p>
            <button onClick={() => setTab('suggestions')} className="text-primary hover:underline text-sm">Lihat saran koneksi</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {connections.map(conn => (
              <PersonCard key={conn.id} person={conn} />
            ))}
          </div>
        )
      )}

      {tab === 'pending' && (
        pending.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">Tidak ada permintaan koneksi</div>
        ) : (
          <div className="space-y-3">
            {pending.map(p => (
              <div key={p.connection_id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4">
                <Link href={`/profile/${p.username}`}>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
                    {p.full_name?.charAt(0)}
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/profile/${p.username}`} className="font-semibold text-gray-900 hover:text-primary">{p.full_name}</Link>
                  <p className="text-xs text-gray-500 truncate">{p.profession_type}{p.specialization ? ` - ${p.specialization}` : ''}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleAccept(p.connection_id)} className="bg-primary text-white text-xs px-4 py-2 rounded-lg hover:bg-primary-600 transition">Terima</button>
                  <button onClick={() => handleReject(p.connection_id)} className="bg-gray-100 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-200 transition">Tolak</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'suggestions' && (
        suggestions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">Tidak ada saran saat ini</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {suggestions.map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4">
                <Link href={`/profile/${s.username}`}>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
                    {s.full_name?.charAt(0)}
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/profile/${s.username}`} className="font-semibold text-gray-900 hover:text-primary">{s.full_name}</Link>
                  <p className="text-xs text-gray-500 truncate">{s.profession_type}{s.specialization ? ` - ${s.specialization}` : ''}</p>
                  {s.current_workplace && <p className="text-xs text-gray-400 truncate">{s.current_workplace}</p>}
                </div>
                <button onClick={() => handleConnect(s.id)} className="bg-primary text-white text-xs px-4 py-2 rounded-lg hover:bg-primary-600 transition shrink-0">
                  Hubungkan
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

function PersonCard({ person }: { person: Connection }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4">
      <Link href={`/profile/${person.username}`}>
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
          {person.full_name?.charAt(0)}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/profile/${person.username}`} className="font-semibold text-gray-900 hover:text-primary">{person.full_name}</Link>
        <p className="text-xs text-gray-500 truncate">{person.profession_type}{person.specialization ? ` - ${person.specialization}` : ''}</p>
        {person.current_workplace && <p className="text-xs text-gray-400 truncate">{person.current_workplace}</p>}
      </div>
    </div>
  );
}
