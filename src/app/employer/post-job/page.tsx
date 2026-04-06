'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROFESSION_TYPES, SPECIALIZATIONS, FACILITY_TYPES, EMPLOYMENT_TYPES, PROVINCES } from '@/lib/constants';

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', facility_name: '', facility_type: '', location: '', province: '',
    profession_type: '', specialization: '', employment_type: '',
    salary_min: '', salary_max: '', bpjs_required: '1',
    description: '', requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showSpecialization = form.profession_type === 'Dokter Spesialis' || form.profession_type === 'Dokter Gigi Spesialis';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('nakes_token');
      const res = await fetch('/api/employer/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min ? parseInt(form.salary_min) : null,
          salary_max: form.salary_max ? parseInt(form.salary_max) : null,
          bpjs_required: parseInt(form.bpjs_required),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push('/employer/jobs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memposting lowongan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pasang Lowongan Baru</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Posisi *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            placeholder="Dokter Umum IGD" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas *</label>
            <input name="facility_name" value={form.facility_name} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="RS Cipto Mangunkusumo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Fasilitas *</label>
            <select name="facility_type" value={form.facility_type} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {FACILITY_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi *</label>
            <input name="location" value={form.location} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="Jakarta Pusat" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
            <select name="province" value={form.province} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profesi yang Dibutuhkan *</label>
            <select name="profession_type" value={form.profession_type} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {Object.entries(PROFESSION_TYPES).map(([group, types]) => (
                <optgroup key={group} label={group}>
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kepegawaian *</label>
            <select name="employment_type" value={form.employment_type} onChange={handleChange} required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih</option>
              {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {showSpecialization && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
            <select name="specialization" value={form.specialization} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="">Pilih spesialisasi</option>
              {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Minimum</label>
            <input type="number" name="salary_min" value={form.salary_min} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="5000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Maksimum</label>
            <input type="number" name="salary_max" value={form.salary_max} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="15000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">BPJS</label>
            <select name="bpjs_required" value={form.bpjs_required} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition">
              <option value="1">Ya, disediakan</option>
              <option value="0">Tidak</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pekerjaan *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-y"
            placeholder="Tuliskan deskripsi pekerjaan..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan</label>
          <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-y"
            placeholder="1. STR aktif&#10;2. Pengalaman minimal 2 tahun&#10;3. ..." />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50">
            {loading ? 'Memposting...' : 'Posting Lowongan'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
