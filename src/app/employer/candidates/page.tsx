'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROVINCES } from '@/lib/constants';

interface Candidate {
  id: number;
  username: string;
  full_name: string;
  profession_type: string;
  specialization: string | null;
  province: string | null;
  kota: string | null;
  current_workplace: string | null;
  bio: string | null;
  is_saved: number;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({ query: '', profession: '', province: '' });

  const search = async () => {
    setLoading(true);
    setSearched(true);
    const token = localStorage.getItem('nakes_token');
    const params = new URLSearchParams();
    if (filters.query) params.set('query', filters.query);
    if (filters.profession) params.set('profession', filters.profession);
    if (filters.province) params.set('province', filters.province);
    try {
      const res = await fetch(`/api/employer/candidates?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch {}
    setLoading(false);
  };

  const toggleSave = async (candidateId: number, isSaved: number) => {
    const token = localStorage.getItem('nakes_token');
    if (isSaved) {
      await fetch('/api/employer/saved', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ candidate_id: candidateId }),
      });
    } else {
      await fetch('/api/employer/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ candidate_id: candidateId }),
      });
    }
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, is_saved: isSaved ? 0 : 1 } : c));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cari Kandidat</h1>
          <p className="text-gray-500 text-sm mt-1">Temukan tenaga kesehatan terbaik</p>
        </div>
        <Link href="/employer/candidates/saved" className="text-sm text-primary hover:underline font-medium">
          Kandidat Tersimpan
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="grid sm:grid-cols-4 gap-3">
          <input
            value={filters.query} onChange={e => setFilters(f => ({ ...f, query: e.target.value }))}
            placeholder="Cari nama, profesi, tempat kerja..."
            className="sm:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            onKeyDown={e => e.key === 'Enter' && search()}
          />
          <select value={filters.profession} onChange={e => setFilters(f => ({ ...f, profession: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none">
            <option value="">Semua Profesi</option>
            {['Dokter Umum', 'Dokter Spesialis', 'Ners (S1+Profesi)', 'Bidan Ahli (D4/S1)', 'Apoteker', 'Fisioterapis', 'Psikolog Klinis'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select value={filters.province} onChange={e => setFilters(f => ({ ...f, province: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none">
            <option value="">Semua Provinsi</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button onClick={search} className="mt-3 bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition">
          Cari Kandidat
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !searched ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Gunakan filter di atas untuk mencari kandidat
        </div>
      ) : candidates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Tidak ada kandidat yang ditemukan
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {candidates.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
                  {c.full_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <Link href={`/profile/${c.username}`} className="font-semibold text-gray-900 hover:text-primary">{c.full_name}</Link>
                  <p className="text-sm text-primary">{c.profession_type}{c.specialization ? ` - ${c.specialization}` : ''}</p>
                  {c.current_workplace && <p className="text-xs text-gray-500 mt-1">{c.current_workplace}</p>}
                  {(c.province || c.kota) && <p className="text-xs text-gray-400">{[c.kota, c.province].filter(Boolean).join(', ')}</p>}
                  {c.bio && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{c.bio}</p>}
                </div>
                <button onClick={() => toggleSave(c.id, c.is_saved)}
                  className={`p-2 rounded-lg transition ${c.is_saved ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'}`}>
                  <svg className="w-5 h-5" fill={c.is_saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
