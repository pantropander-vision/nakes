'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthContext';
import { PROVINCES, FACILITY_TYPES } from '@/lib/constants';

interface Job {
  id: number;
  title: string;
  facility_name: string;
  facility_type: string;
  location: string;
  province: string;
  profession_type: string;
  specialization: string | null;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  bpjs_required: number;
  description: string;
  requirements: string | null;
  created_at: string;
}

function formatIDR(n: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ profession: '', province: '', facility_type: '' });
  const [selected, setSelected] = useState<Job | null>(null);
  const [applying, setApplying] = useState(false);
  const [applyMsg, setApplyMsg] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);

  const isNakes = !user || user.account_type !== 'employer';

  const fetchJobs = () => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.profession) params.profession = filters.profession;
    if (filters.province) params.province = filters.province;
    if (filters.facility_type) params.facility_type = filters.facility_type;
    api.getJobs(params)
      .then(data => { setJobs(data.jobs); if (data.jobs.length > 0 && !selected) setSelected(data.jobs[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJobs(); }, [filters]);

  const handleApply = async () => {
    if (!selected || !user) return;
    setApplying(true);
    setApplyMsg('');
    try {
      const token = localStorage.getItem('nakes_token');
      const res = await fetch(`/api/jobs/${selected.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cover_letter: coverLetter }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setApplyMsg('Lamaran berhasil dikirim!');
      setCoverLetter('');
      setShowApplyModal(false);
    } catch (err) {
      setApplyMsg(err instanceof Error ? err.message : 'Gagal mengirim lamaran');
    } finally {
      setApplying(false);
    }
  };

  const employmentColor: Record<string, string> = {
    'Tetap': 'bg-green-100 text-green-700',
    'Kontrak': 'bg-yellow-100 text-yellow-700',
    'BLUD': 'bg-blue-100 text-blue-700',
    'Honorer': 'bg-orange-100 text-orange-700',
    'Paruh Waktu': 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lowongan Tenaga Kesehatan</h1>
        <p className="text-gray-500 text-sm mt-1">Temukan peluang karir di fasilitas kesehatan Indonesia</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="grid sm:grid-cols-3 gap-3">
          <select
            value={filters.profession}
            onChange={e => setFilters(f => ({ ...f, profession: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Semua Profesi</option>
            {['Dokter Umum', 'Dokter Spesialis', 'Ners (S1+Profesi)', 'Bidan Ahli (D4/S1)', 'Apoteker', 'Fisioterapis', 'Psikolog Klinis'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={filters.province}
            onChange={e => setFilters(f => ({ ...f, province: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Semua Provinsi</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select
            value={filters.facility_type}
            onChange={e => setFilters(f => ({ ...f, facility_type: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Semua Fasilitas</option>
            {FACILITY_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {applyMsg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${applyMsg.includes('berhasil') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {applyMsg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Tidak ada lowongan yang sesuai filter
        </div>
      ) : (
        <div className="grid lg:grid-cols-[380px_1fr] gap-4">
          {/* Job List */}
          <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
            {jobs.map(job => (
              <button
                key={job.id}
                onClick={() => { setSelected(job); setApplyMsg(''); }}
                className={`w-full text-left bg-white rounded-xl border p-4 hover:border-primary transition ${selected?.id === job.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
              >
                <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{job.facility_name}</p>
                <p className="text-xs text-gray-400">{job.location}, {job.province}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${employmentColor[job.employment_type] || 'bg-gray-100 text-gray-700'}`}>
                    {job.employment_type}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.facility_type}</span>
                </div>
                {job.salary_min && (
                  <p className="text-xs text-primary font-medium mt-2">
                    {formatIDR(job.salary_min)} - {formatIDR(job.salary_max!)}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Job Detail */}
          {selected && (
            <div className="bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-20">
              <h2 className="text-xl font-bold text-gray-900">{selected.title}</h2>
              <p className="text-primary font-medium mt-1">{selected.facility_name}</p>
              <p className="text-sm text-gray-500">{selected.location}, {selected.province}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${employmentColor[selected.employment_type] || 'bg-gray-100 text-gray-700'}`}>
                  {selected.employment_type}
                </span>
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{selected.facility_type}</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{selected.profession_type}</span>
                {selected.bpjs_required ? (
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">BPJS</span>
                ) : null}
              </div>

              {selected.salary_min && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-gray-500">Gaji</p>
                  <p className="text-lg font-bold text-primary">{formatIDR(selected.salary_min)} - {formatIDR(selected.salary_max!)}</p>
                  <p className="text-xs text-gray-400">per bulan</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selected.description}</p>
              </div>

              {selected.requirements && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Persyaratan</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selected.requirements}</p>
                </div>
              )}

              {user && isNakes ? (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="mt-6 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition"
                >
                  Lamar Sekarang
                </button>
              ) : !user ? (
                <a href="/login" className="mt-6 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition block text-center">
                  Masuk untuk Melamar
                </a>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Lamar: {selected.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{selected.facility_name}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surat Lamaran (opsional)</label>
              <textarea
                value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-y"
                placeholder="Tulis pesan untuk pemberi kerja..."
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={handleApply} disabled={applying}
                className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50">
                {applying ? 'Mengirim...' : 'Kirim Lamaran'}
              </button>
              <button onClick={() => { setShowApplyModal(false); setCoverLetter(''); }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
