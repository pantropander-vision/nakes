'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Silently redirect logged-in users to feed — but never block the landing page render
  useEffect(() => {
    if (!loading && user) router.replace('/home');
  }, [user, loading, router]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary to-primary-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Jaringan Profesional Kesehatan Indonesia
            </h1>
            <p className="text-lg lg:text-xl text-primary-100 mb-8">
              Platform khusus tenaga kesehatan Indonesia. Bangun jaringan profesional, temukan peluang karir, dan kembangkan kompetensi Anda bersama rekan sejawat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg"
              >
                Bergabung Sekarang
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition text-lg"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1.2 Jt+', label: 'Tenaga Kesehatan' },
              { value: '15,000+', label: 'Fasilitas Kesehatan' },
              { value: '34', label: 'Provinsi' },
              { value: '500+', label: 'Lowongan Aktif' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* US Nursing Opportunities */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white py-20 lg:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── Text Content ── */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-blue-300 text-sm font-semibold mb-6">
                &#127482;&#127480; Peluang Karir Internasional
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                Wujudkan Impian{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Berkarir di Amerika Serikat
                </span>
              </h2>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Ribuan perawat Indonesia berhasil berkarir di AS. Program kami dirancang khusus untuk pemegang{' '}
                <span className="text-white font-semibold">STR (Surat Tanda Registrasi)</span> dengan jalur terarah
                menuju lisensi <span className="text-white font-semibold">RN (Registered Nurse)</span> Amerika —
                termasuk NCLEX-RN, visa sponsorship, dan dukungan relokasi.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-blue-300">2,000+</div>
                  <div className="text-xs text-slate-400 mt-1 leading-snug">Posisi Tersedia</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-xl font-bold text-emerald-400">$60K–$120K</div>
                  <div className="text-xs text-slate-400 mt-1 leading-snug">Gaji Per Tahun (USD)</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-yellow-300">Visa</div>
                  <div className="text-xs text-slate-400 mt-1 leading-snug">Sponsor Tersedia</div>
                </div>
              </div>

              {/* Pathway checklist */}
              <ul className="space-y-3 mb-10">
                {[
                  'STR aktif sebagai syarat utama pendaftaran',
                  'Persiapan NCLEX-RN & English proficiency (IELTS/OET)',
                  'Evaluasi kredensial CGFNS & VisaScreen',
                  'Visa sponsorship H-1B / EB-3 oleh employer AS',
                  'Dukungan relokasi & orientasi kehidupan di AS',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-7 py-3 rounded-xl hover:from-blue-400 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/30 text-base"
                >
                  Daftar Program US Nurse
                </Link>
                <Link
                  href="/register"
                  className="border border-white/30 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/10 transition text-base"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>

            {/* ── Image Grid ── */}
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800"
                  alt="Perawat profesional"
                  className="rounded-2xl object-cover w-full h-52 lg:h-60 shadow-xl shadow-black/40"
                />
                <img
                  src="https://images.unsplash.com/photo-1492666673288-3c4b4f1a8b6a?w=800"
                  alt="Statue of Liberty"
                  className="rounded-2xl object-cover w-full h-52 lg:h-60 shadow-xl shadow-black/40"
                />
                <img
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800"
                  alt="Golden Gate Bridge San Francisco"
                  className="rounded-2xl object-cover w-full h-52 lg:h-60 shadow-xl shadow-black/40"
                />
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
                  alt="Perawat bekerja"
                  className="rounded-2xl object-cover w-full h-52 lg:h-60 shadow-xl shadow-black/40"
                />
              </div>
              {/* Caption badge */}
              <div className="mt-4 flex justify-center">
                <span className="text-xs text-slate-500 italic">
                  Bergabung dengan 500+ perawat Indonesia yang sudah berkarir di AS
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Fitur untuk Tenaga Kesehatan</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Dibangun khusus untuk kebutuhan profesional kesehatan Indonesia
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                title: 'Jaringan Sejawat',
                desc: 'Terhubung dengan dokter, perawat, bidan, dan tenaga kesehatan lainnya di seluruh Indonesia.',
              },
              {
                icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                title: 'Lowongan Khusus Nakes',
                desc: 'Temukan lowongan dari RS, Puskesmas, dan Klinik. Filter berdasarkan profesi, lokasi, dan tipe fasilitas.',
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Verifikasi STR & SIP',
                desc: 'Tampilkan status STR dan SIP Anda. Lacak kredit SKP dan masa berlaku registrasi.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professions */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Untuk Semua Profesi Kesehatan</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Dokter Umum', 'Dokter Spesialis', 'Dokter Gigi', 'Ners', 'Perawat',
              'Bidan', 'Apoteker', 'Fisioterapis', 'Psikolog Klinis', 'Radiografer',
              'Dietisien', 'Analis Kesehatan', 'Rekam Medis', 'Sanitarian',
            ].map((prof) => (
              <span key={prof} className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                {prof}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Bergabung?</h2>
          <p className="text-primary-100 mb-8">Ribuan tenaga kesehatan Indonesia sudah terhubung. Saatnya Anda bergabung.</p>
          <Link href="/register" className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg inline-block">
            Daftar Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-white font-bold">Nakes</span>
            </div>
            <p className="text-sm">&copy; 2026 Nakes. Platform Jaringan Profesional Kesehatan Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
