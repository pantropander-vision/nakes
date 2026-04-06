'use client';

import { useState, useEffect } from 'react';

interface Analytics {
  stats: {
    active_jobs: number;
    total_applications: number;
    new_this_week: number;
    saved_candidates: number;
  };
  jobs_breakdown: Array<{ title: string; application_count: number; status_counts: Record<string, number> }>;
  applications_by_status: Record<string, number>;
  applications_by_month: Array<{ month: string; count: number }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nakes_token');
    fetch('/api/employer/analytics', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) return null;

  const statusLabel: Record<string, string> = {
    pending: 'Menunggu',
    reviewed: 'Ditinjau',
    shortlisted: 'Shortlist',
    accepted: 'Diterima',
    rejected: 'Ditolak',
  };

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-500',
    reviewed: 'bg-blue-500',
    shortlisted: 'bg-teal-500',
    accepted: 'bg-green-500',
    rejected: 'bg-red-500',
  };

  const totalByStatus = data.applications_by_status || {};
  const maxApps = Math.max(...(data.applications_by_month?.map(m => m.count) || [1]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analitik</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-3xl font-bold text-primary">{data.stats.active_jobs}</p>
          <p className="text-sm text-gray-500">Lowongan Aktif</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-3xl font-bold text-blue-500">{data.stats.total_applications}</p>
          <p className="text-sm text-gray-500">Total Lamaran</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-3xl font-bold text-green-500">{data.stats.new_this_week}</p>
          <p className="text-sm text-gray-500">Baru Minggu Ini</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-3xl font-bold text-orange-500">{data.stats.saved_candidates}</p>
          <p className="text-sm text-gray-500">Kandidat Tersimpan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applications by Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Lamaran per Status</h2>
          <div className="space-y-3">
            {Object.entries(totalByStatus).map(([status, count]) => {
              const total = data.stats.total_applications || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{statusLabel[status] || status}</span>
                    <span className="text-gray-900 font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${statusColor[status] || 'bg-gray-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {Object.keys(totalByStatus).length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">Belum ada data</p>
            )}
          </div>
        </div>

        {/* Applications by Month */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Lamaran per Bulan</h2>
          {data.applications_by_month && data.applications_by_month.length > 0 ? (
            <div className="flex items-end gap-2 h-48">
              {data.applications_by_month.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">{m.count}</span>
                  <div className="w-full bg-primary rounded-t" style={{ height: `${(m.count / maxApps) * 100}%`, minHeight: '4px' }} />
                  <span className="text-xs text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">Belum ada data</p>
          )}
        </div>

        {/* Per Job Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Lamaran per Lowongan</h2>
          {data.jobs_breakdown && data.jobs_breakdown.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Posisi</th>
                    <th className="px-4 py-3 text-center">Total</th>
                    <th className="px-4 py-3 text-center">Menunggu</th>
                    <th className="px-4 py-3 text-center">Ditinjau</th>
                    <th className="px-4 py-3 text-center">Shortlist</th>
                    <th className="px-4 py-3 text-center">Diterima</th>
                    <th className="px-4 py-3 text-center">Ditolak</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.jobs_breakdown.map((job, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{job.title}</td>
                      <td className="px-4 py-3 text-center font-semibold">{job.application_count}</td>
                      <td className="px-4 py-3 text-center">{job.status_counts?.pending || 0}</td>
                      <td className="px-4 py-3 text-center">{job.status_counts?.reviewed || 0}</td>
                      <td className="px-4 py-3 text-center">{job.status_counts?.shortlisted || 0}</td>
                      <td className="px-4 py-3 text-center">{job.status_counts?.accepted || 0}</td>
                      <td className="px-4 py-3 text-center">{job.status_counts?.rejected || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">Belum ada data</p>
          )}
        </div>
      </div>
    </div>
  );
}
