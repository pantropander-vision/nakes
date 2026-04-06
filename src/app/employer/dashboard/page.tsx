'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

interface DashboardStats {
  active_jobs: number;
  total_applications: number;
  new_this_week: number;
  saved_candidates: number;
}

interface RecentApplication {
  id: number;
  job_title: string;
  applicant_name: string;
  applicant_profession: string;
  status: string;
  applied_at: string;
}

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ active_jobs: 0, total_applications: 0, new_this_week: 0, saved_candidates: 0 });
  const [recentApps, setRecentApps] = useState<RecentApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nakes_token');
    fetch('/api/employer/analytics', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setStats(data.stats || { active_jobs: 0, total_applications: 0, new_this_week: 0, saved_candidates: 0 });
        setRecentApps(data.recent_applications || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-primary-100 text-primary',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const statusLabel: Record<string, string> = {
    pending: 'Menunggu',
    reviewed: 'Ditinjau',
    shortlisted: 'Shortlist',
    accepted: 'Diterima',
    rejected: 'Ditolak',
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang, {user?.employer_facility_name || user?.full_name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Lowongan Aktif" value={stats.active_jobs} color="bg-primary" icon="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <StatCard label="Total Lamaran" value={stats.total_applications} color="bg-blue-500" icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <StatCard label="Baru Minggu Ini" value={stats.new_this_week} color="bg-green-500" icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        <StatCard label="Kandidat Tersimpan" value={stats.saved_candidates} color="bg-orange-500" icon="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link href="/employer/post-job" className="bg-primary text-white rounded-xl p-4 hover:bg-primary-600 transition flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span className="font-semibold">Pasang Lowongan Baru</span>
        </Link>
        <Link href="/employer/candidates" className="bg-white border rounded-xl p-4 hover:border-primary transition flex items-center gap-3 text-gray-700">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="font-semibold">Cari Kandidat</span>
        </Link>
        <Link href="/employer/jobs" className="bg-white border rounded-xl p-4 hover:border-primary transition flex items-center gap-3 text-gray-700">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          <span className="font-semibold">Kelola Lowongan</span>
        </Link>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Lamaran Terbaru</h2>
          <Link href="/employer/jobs" className="text-sm text-primary hover:underline">Lihat Semua</Link>
        </div>
        {recentApps.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Belum ada lamaran masuk</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Pelamar</th>
                  <th className="px-4 py-3 text-left">Posisi</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentApps.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{app.applicant_name}</div>
                      <div className="text-xs text-gray-500">{app.applicant_profession}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{app.job_title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[app.status] || 'bg-gray-100 text-gray-700'}`}>
                        {statusLabel[app.status] || app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(app.applied_at).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
