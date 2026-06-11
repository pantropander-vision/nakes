'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ profession: '', province: '', facility_type: '' });

  const fetchJobs = () => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.profession) params.profession = filters.profession;
    if (filters.province) params.province = filters.province;
    if (filters.facility_type) params.facility_type = filters.facility_type;
    api.getJobs(params)
      .then(data => setJobs(data.jobs))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJobs(); }, [filters]);

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
        <p className="text-gray-500 text-sm mt-1">Temukan peluang karir di fasilitas kesehatan Indonesia. Klik lowongan untuk melihat detail.</p>
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

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Tidak ada lowongan yang sesuai filter
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map(job => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="bg-white rounded-xl border p-5 hover:border-primary hover:shadow-md transition block"
            >
              <h3 className="font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{job.facility_name}</p>
              <p className="text-xs text-gray-400">{job.location}, {job.province}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${employmentColor[job.employment_type] || 'bg-gray-100 text-gray-700'}`}>
                  {job.employment_type}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.facility_type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.profession_type}</span>
              </div>
              {job.salary_min && (
                <p className="text-sm text-primary font-medium mt-3">
                  {formatIDR(job.salary_min)}{job.salary_max ? ` - ${formatIDR(job.salary_max)}` : ''}
                </p>
              )}
              <p className="text-xs text-primary font-medium mt-3">Lihat detail &rarr;</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
