'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  facility_name: string;
  location: string;
  province: string;
  profession_type: string;
  employment_type: string;
  is_active: number;
  created_at: string;
  application_count: number;
}

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    const token = localStorage.getItem('nakes_token');
    fetch('/api/employer/jobs', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setJobs(data.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchJobs(); }, []);

  const toggleJob = async (jobId: number, isActive: number) => {
    const token = localStorage.getItem('nakes_token');
    await fetch(`/api/employer/jobs/${jobId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: isActive ? 0 : 1 }),
    });
    fetchJobs();
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lowongan Saya</h1>
          <p className="text-gray-500 text-sm mt-1">{jobs.length} lowongan</p>
        </div>
        <Link href="/employer/post-job" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition">
          + Lowongan Baru
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <p className="text-gray-400 mb-4">Belum ada lowongan yang dipasang</p>
          <Link href="/employer/post-job" className="text-primary font-medium hover:underline">Pasang lowongan pertama</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {job.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{job.facility_name} - {job.location}, {job.province}</p>
                <p className="text-xs text-gray-400 mt-1">{job.profession_type} | {job.employment_type} | {new Date(job.created_at).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/employer/jobs/${job.id}/applicants`}
                  className="flex items-center gap-1.5 bg-primary-50 text-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-100 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.application_count} Pelamar
                </Link>
                <button onClick={() => toggleJob(job.id, job.is_active)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${job.is_active ? 'border border-gray-300 text-gray-600 hover:bg-gray-50' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                  {job.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
