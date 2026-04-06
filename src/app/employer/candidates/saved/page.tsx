'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SavedCandidate {
  id: number;
  candidate_id: number;
  username: string;
  full_name: string;
  profession_type: string;
  specialization: string | null;
  province: string | null;
  kota: string | null;
  current_workplace: string | null;
  notes: string | null;
  saved_at: string;
}

export default function SavedCandidatesPage() {
  const [candidates, setCandidates] = useState<SavedCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = () => {
    const token = localStorage.getItem('nakes_token');
    fetch('/api/employer/saved', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setCandidates(data.saved || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSaved(); }, []);

  const removeSaved = async (candidateId: number) => {
    const token = localStorage.getItem('nakes_token');
    await fetch('/api/employer/saved', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ candidate_id: candidateId }),
    });
    setCandidates(prev => prev.filter(c => c.candidate_id !== candidateId));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link href="/employer/candidates" className="text-sm text-primary hover:underline mb-4 inline-block">&larr; Kembali ke Pencarian</Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kandidat Tersimpan</h1>
        <p className="text-gray-500 text-sm mt-1">{candidates.length} kandidat tersimpan</p>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Belum ada kandidat yang disimpan
        </div>
      ) : (
        <div className="space-y-3">
          {candidates.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border p-4 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
                {c.full_name.charAt(0)}
              </div>
              <div className="flex-1">
                <Link href={`/profile/${c.username}`} className="font-semibold text-gray-900 hover:text-primary">{c.full_name}</Link>
                <p className="text-sm text-primary">{c.profession_type}{c.specialization ? ` - ${c.specialization}` : ''}</p>
                {c.current_workplace && <p className="text-xs text-gray-500 mt-1">{c.current_workplace}</p>}
                {(c.province || c.kota) && <p className="text-xs text-gray-400">{[c.kota, c.province].filter(Boolean).join(', ')}</p>}
                <p className="text-xs text-gray-400 mt-1">Disimpan {new Date(c.saved_at).toLocaleDateString('id-ID')}</p>
              </div>
              <button onClick={() => removeSaved(c.candidate_id)}
                className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
