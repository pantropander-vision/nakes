'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PROFESSION_TYPES, SPECIALIZATIONS, PROVINCES, FACILITY_TYPES } from '@/lib/constants';

const EMPLOYER_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<'nakes' | 'employer'>('nakes');
  const [form, setForm] = useState({
    full_name: '', email: '', username: '', password: '',
    profession_type: '', specialization: '', str_number: '', province: '', kota: '',
    employer_facility_name: '', employer_facility_type: '', employer_website: '', employer_size: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showSpecialization = form.profession_type === 'Dokter Spesialis' || form.profession_type === 'Dokter Gigi Spesialis';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ ...form, account_type: accountType });
      router.push(accountType === 'employer' ? '/employer/dashboard' : '/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Daftar di Nakes</h1>
          <p className="text-gray-500 mt-2">Bergabung dengan jaringan profesional kesehatan</p>
        </div>

        {/* Account Type Toggle */}
        <div className="bg-white rounded-xl shadow-sm border p-2 mb-6 flex">
          <button
            type="button"
            onClick={() => setAccountType('nakes')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
              accountType === 'nakes'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tenaga Kesehatan
          </button>
          <button
            type="button"
            onClick={() => setAccountType('employer')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
              accountType === 'employer'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pemberi Kerja
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {accountType === 'nakes' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    name="full_name" value={form.full_name} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="dr. Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    name="username" value={form.username} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Profesi</label>
                <select
                  name="profession_type" value={form.profession_type} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                >
                  <option value="">Pilih profesi</option>
                  {Object.entries(PROFESSION_TYPES).map(([group, types]) => (
                    <optgroup key={group} label={group}>
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              {showSpecialization && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
                  <select
                    name="specialization" value={form.specialization} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  >
                    <option value="">Pilih spesialisasi</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor STR</label>
                  <input
                    name="str_number" value={form.str_number} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Opsional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <select
                    name="province" value={form.province} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  >
                    <option value="">Pilih provinsi</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas / Perusahaan</label>
                <input
                  name="employer_facility_name" value={form.employer_facility_name} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="RS Cipto Mangunkusumo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama PIC</label>
                  <input
                    name="full_name" value={form.full_name} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Nama penanggung jawab"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    name="username" value={form.username} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="hrd@rumahsakit.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Fasilitas</label>
                <select
                  name="employer_facility_type" value={form.employer_facility_type} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                >
                  <option value="">Pilih jenis fasilitas</option>
                  {FACILITY_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <select
                    name="province" value={form.province} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  >
                    <option value="">Pilih provinsi</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <input
                    name="kota" value={form.kota} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Jakarta Pusat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    name="employer_website" value={form.employer_website} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="https://www.rs.co.id"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Perusahaan</label>
                  <select
                    name="employer_size" value={form.employer_size} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  >
                    <option value="">Pilih ukuran</option>
                    {EMPLOYER_SIZES.map(s => <option key={s} value={s}>{s} karyawan</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
