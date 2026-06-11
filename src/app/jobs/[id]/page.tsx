'use client';
export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';

interface JobDetail {
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
  is_active: number;
  created_at: string;
  poster_username: string | null;
  poster_name: string | null;
  poster_account_type: string | null;
  poster_facility_name: string | null;
}

function formatIDR(n: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

const employmentColor: Record<string, string> = {
  'Tetap': 'bg-green-100 text-green-700',
  'Kontrak': 'bg-yellow-100 text-yellow-700',
  'BLUD': 'bg-blue-100 text-blue-700',
  'Honorer': 'bg-orange-100 text-orange-700',
  'Paruh Waktu': 'bg-purple-100 text-purple-700',
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id;
  const { user } = useAuth();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applyMsg, setApplyMsg] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);

  const isNakes = !user || user.account_type !== 'employer';

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then(r => r.json())
      .then(data => setJob(data.job || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleApply = async () => {
    if (!job || !user) return;
    setApplying(true);
    setApplyMsg('');
    try {
      const token = localStorage.getItem('nakes_token');
      const res = await fetch(`/api/jobs/${job.id}/apply`, {
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

  if (loading) {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-gray-500 gap-4">
        <p>Lowongan tidak ditemukan</p>
        <Link href="/jobs" className="text-primary hover:underline text-sm">&larr; Kembali ke daftar lowongan</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link href="/jobs" className="text-sm text-primary hover:underline mb-4 inline-block">&larr; Kembali ke daftar lowongan</Link>

      {applyMsg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${applyMsg.includes('berhasil') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {applyMsg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-primary font-medium mt-1">{job.facility_name}</p>
            <p className="text-sm text-gray-500">{job.location}, {job.province}</p>
          </div>
          {!job.is_active && (
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium shrink-0">Nonaktif</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${employmentColor[job.employment_type] || 'bg-gray-100 text-gray-700'}`}>
            {job.employment_type}
          </span>
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{job.facility_type}</span>
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {job.profession_type}{job.specialization ? ` (${job.specialization})` : ''}
          </span>
          {job.bpjs_required ? (
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">BPJS Disediakan</span>
          ) : null}
        </div>

        {job.salary_min && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-500">Gaji</p>
            <p className="text-lg font-bold text-primary">
              {formatIDR(job.salary_min)}{job.salary_max ? ` - ${formatIDR(job.salary_max)}` : ''}
            </p>
            <p className="text-xs text-gray-400">per bulan</p>
          </div>
        )}

        <div className="mt-6">
          <h2 className="font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{job.description}</p>
        </div>

        {job.requirements && (
          <div className="mt-5">
            <h2 className="font-semibold text-gray-900 mb-2">Persyaratan</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{job.requirements}</p>
          </div>
        )}

        {job.poster_username && (
          <div className="mt-6 pt-5 border-t">
            <p className="text-xs text-gray-400 mb-2">Diposting oleh</p>
            <Link href={`/profile/${job.poster_username}`} className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold">
                {(job.poster_facility_name || job.poster_name || '?').charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-primary transition">
                  {job.poster_facility_name || job.poster_name}
                </p>
                <p className="text-xs text-gray-500">
                  {job.poster_account_type === 'employer' ? 'Pemberi Kerja' : job.poster_name} · Lihat profil
                </p>
              </div>
            </Link>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-5">
          Diposting {new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {job.is_active ? (
          user && isNakes ? (
            <button
              onClick={() => setShowApplyModal(true)}
              className="mt-6 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition"
            >
              Lamar Sekarang
            </button>
          ) : !user ? (
            <Link href="/login" className="mt-6 w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition block text-center">
              Masuk untuk Melamar
            </Link>
          ) : null
        ) : (
          <p className="mt-6 text-center text-sm text-gray-400">Lowongan ini sudah tidak aktif</p>
        )}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Lamar: {job.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{job.facility_name}</p>

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
