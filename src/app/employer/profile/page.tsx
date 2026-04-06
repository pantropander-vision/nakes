'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { FACILITY_TYPES, PROVINCES } from '@/lib/constants';

export default function EmployerProfilePage() {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    employer_facility_name: '', employer_facility_type: '', employer_description: '',
    employer_website: '', employer_size: '', province: '', kota: '', full_name: '', phone: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('nakes_token');
    fetch('/api/employer/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data.profile) {
          setForm({
            employer_facility_name: data.profile.employer_facility_name || '',
            employer_facility_type: data.profile.employer_facility_type || '',
            employer_description: data.profile.employer_description || '',
            employer_website: data.profile.employer_website || '',
            employer_size: data.profile.employer_size || '',
            province: data.profile.province || '',
            kota: data.profile.kota || '',
            full_name: data.profile.full_name || '',
            phone: data.profile.phone || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('nakes_token');
      const res = await fetch('/api/employer/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Gagal menyimpan');
      setSuccess('Profil berhasil diperbarui');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil Perusahaan</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm">{success}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas / Perusahaan</label>
          <input name="employer_facility_name" value={form.employer_facility_name} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Fasilitas</label>
            <select name="employer_facility_type" value={form.employer_facility_type} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {FACILITY_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Perusahaan</label>
            <select name="employer_size" value={form.employer_size} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} karyawan</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Perusahaan</label>
          <textarea name="employer_description" value={form.employer_description} onChange={handleChange} rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-y"
            placeholder="Deskripsi singkat tentang fasilitas/perusahaan..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input name="employer_website" value={form.employer_website} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            placeholder="https://www.rumahsakit.co.id" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <select name="province" value={form.province} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
            <input name="kota" value={form.kota} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="Jakarta Pusat" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama PIC</label>
            <input name="full_name" value={form.full_name} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="021-xxx-xxxx" />
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50">
          {saving ? 'Menyimpan...' : 'Simpan Profil'}
        </button>
      </form>
    </div>
  );
}
