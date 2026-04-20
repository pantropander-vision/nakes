'use client';
export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Applicant {
  id: number;
  applicant_id: number;
  full_name: string;
  email: string;
  profession_type: string;
  specialization: string | null;
  province: string | null;
  kota: string | null;
  current_workplace: string | null;
  cover_letter: string | null;
  status: string;
  applied_at: string;
  username: string;
}

interface JobInfo {
  id: number;
  title: string;
  facility_name: string;
}

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.id;
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchApplicants = () => {
    const token = localStorage.getItem('nakes_token');
    const qs = statusFilter ? `?status=${statusFilter}` : '';
    fetch(`/api/employer/jobs/${jobId}/applicants${qs}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setApplicants(data.applicants || []);
        setJobInfo(data.job || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchApplicants(); }, [jobId, statusFilter]);

  const updateStatus = async (applicationId: number, status: string) => {
    const token = localStorage.getItem('nakes_token');
    await fetch(`/api/employer/applications/${applicationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchApplicants();
  };

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link href="/employer/jobs" className="text-sm text-primary hover:underline mb-4 inline-block">&larr; Kembali ke Lowongan</Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pelamar</h1>
        {jobInfo && <p className="text-gray-500 text-sm mt-1">{jobInfo.title} - {jobInfo.facility_name}</p>}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 flex flex-wrap gap-2">
        {['', 'pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${statusFilter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s === '' ? 'Semua' : statusLabel[s]}
          </button>
        ))}
      </div>

      {applicants.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          Belum ada pelamar{statusFilter ? ' dengan status ini' : ''}
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                      {app.full_name.charAt(0)}
                    </div>
                    <div>
                      <Link href={`/profile/${app.username}`} className="font-semibold text-gray-900 hover:text-primary">{app.full_name}</Link>
                      <p className="text-xs text-gray-500">{app.profession_type}{app.specialization ? ` - ${app.specialization}` : ''}</p>
                    </div>
                  </div>
                  {app.current_workplace && <p className="text-sm text-gray-500 mt-2">{app.current_workplace}</p>}
                  {(app.province || app.kota) && <p className="text-xs text-gray-400">{[app.kota, app.province].filter(Boolean).join(', ')}</p>}
                  {app.cover_letter && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">Surat Lamaran:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{app.cover_letter}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">Melamar {new Date(app.applied_at).toLocaleDateString('id-ID')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-center ${statusColor[app.status] || 'bg-gray-100 text-gray-700'}`}>
                    {statusLabel[app.status] || app.status}
                  </span>
                  <select
                    value={app.status}
                    onChange={e => updateStatus(app.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="pending">Menunggu</option>
                    <option value="reviewed">Ditinjau</option>
                    <option value="shortlisted">Shortlist</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
