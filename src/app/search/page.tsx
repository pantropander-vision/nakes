'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { PROVINCES } from '@/lib/constants';

interface SearchResult {
  id: number;
  username: string;
  full_name: string;
  avatar_url: string | null;
  profession_type: string;
  specialization: string | null;
  current_workplace: string | null;
  current_workplace_type: string | null;
  province: string | null;
  kota: string | null;
  bio: string | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [profession, setProfession] = useState('');
  const [province, setProvince] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params: Record<string, string> = {};
      if (query) params.q = query;
      if (profession) params.profession = profession;
      if (province) params.province = province;
      const data = await api.search(params);
      setResults(data.users);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cari Tenaga Kesehatan</h1>

      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-sm border p-5 mb-6">
        <div className="flex gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari nama, spesialisasi, atau tempat kerja..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
          />
          <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-600 transition text-sm font-medium shrink-0">
            Cari
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <select
            value={profession}
            onChange={e => setProfession(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Semua Profesi</option>
            {['Dokter Umum', 'Dokter Spesialis', 'Dokter Gigi', 'Ners (S1+Profesi)', 'Perawat Vokasional (D3)', 'Bidan Ahli (D4/S1)', 'Apoteker', 'Fisioterapis', 'Psikolog Klinis', 'Radiografer'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={province}
            onChange={e => setProvince(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Semua Provinsi</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !searched ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Masukkan kata kunci untuk mencari tenaga kesehatan</p>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">Tidak ditemukan hasil yang sesuai</div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{results.length} hasil ditemukan</p>
          {results.map(user => (
            <Link key={user.id} href={`/profile/${user.username}`} className="block bg-white rounded-xl shadow-sm border p-5 hover:border-primary transition">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary text-xl font-semibold shrink-0">
                  {user.full_name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                  <p className="text-sm text-primary">
                    {user.profession_type}
                    {user.specialization && ` - ${user.specialization}`}
                  </p>
                  {user.current_workplace && (
                    <p className="text-sm text-gray-500 mt-1">
                      {user.current_workplace}
                      {user.current_workplace_type && ` (${user.current_workplace_type})`}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {[user.kota, user.province].filter(Boolean).join(', ')}
                  </p>
                  {user.bio && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{user.bio}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
