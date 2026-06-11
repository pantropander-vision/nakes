'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'verify' | 'reset' | 'done'>('verify');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResetToken(data.reset_token);
      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Konfirmasi password tidak sama');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lupa Password</h1>
          <p className="text-gray-500 mt-2">
            {step === 'verify' && 'Verifikasi akun Anda untuk mereset password'}
            {step === 'reset' && 'Buat password baru'}
            {step === 'done' && 'Password berhasil direset'}
          </p>
        </div>

        {step === 'verify' && (
          <form onSubmit={handleVerify} className="bg-white rounded-xl shadow-sm border p-8 space-y-5">
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Username akun Anda"
              />
              <p className="text-xs text-gray-400 mt-1">Masukkan username yang Anda gunakan saat mendaftar sebagai verifikasi kepemilikan akun.</p>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
            >
              {loading ? 'Memverifikasi...' : 'Lanjutkan'}
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleReset} className="bg-white rounded-xl shadow-sm border p-8 space-y-5">
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
              <input
                type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Ulangi password baru"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Reset Password'}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">Password Anda berhasil direset.</p>
            <Link href="/login" className="block w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition">
              Masuk Sekarang
            </Link>
          </div>
        )}

        <p className="text-center mt-6 text-sm text-gray-500">
          Ingat password Anda?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Kembali ke halaman masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
