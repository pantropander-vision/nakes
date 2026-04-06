'use client';

import Link from 'next/link';

export default function ForProfessionalsPage() {
  const benefits = [
    {
      icon: '🔍',
      title: 'Temukan Karier Impian Anda',
      desc: 'Akses ribuan lowongan kerja dari RS Tipe A hingga klinik swasta — difilter sesuai spesialisasi, lokasi, dan jenis fasilitas Anda.',
    },
    {
      icon: '🪪',
      title: 'Profil Kredensial Terverifikasi',
      desc: 'Tampilkan STR, SIP, SKP, dan pengalaman klinis Anda dalam satu profil profesional yang dapat diverifikasi oleh rekruter.',
    },
    {
      icon: '🤝',
      title: 'Jaringan Sesama Nakes',
      desc: 'Terhubung dengan dokter, perawat, bidan, dan tenaga kesehatan lain dari seluruh Indonesia. Berbagi ilmu, referensi, dan peluang.',
    },
    {
      icon: '📈',
      title: 'Tingkatkan Karier Anda',
      desc: 'Dapatkan notifikasi lowongan relevan, tips karier, dan akses ke pelatihan & sertifikasi yang diakui oleh IDI, PPNI, dan IBI.',
    },
    {
      icon: '💰',
      title: 'Transparansi Gaji',
      desc: 'Bandingkan kisaran gaji berdasarkan spesialisasi, lokasi, dan jenis fasilitas — sehingga Anda bisa bernegosiasi dengan percaya diri.',
    },
    {
      icon: '🏥',
      title: 'Direkrut Langsung HR',
      desc: 'Rekruter dari RSCM, Siloam, Prodia, dan ratusan fasilitas kesehatan lain aktif mencari profil seperti Anda — tanpa perantara.',
    },
  ];

  const testimonials = [
    {
      name: 'dr. Arief Santoso, Sp.JP',
      role: 'Dokter Jantung · RSCM Jakarta',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face',
      quote: 'Dalam 2 minggu setelah membuat profil, saya langsung dihubungi oleh 3 rumah sakit swasta dengan tawaran yang sangat menarik.',
    },
    {
      name: 'Ns. Dewi Rahayu, S.Kep',
      role: 'Perawat ICU · RS Cipto Mangunkusumo',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face',
      quote: 'Nakes.id membantu saya menampilkan kredensial ICU saya secara profesional. Akhirnya pindah ke posisi yang jauh lebih baik!',
    },
    {
      name: 'Bidan Siti Nurhaliza, S.Tr.Keb',
      role: 'Bidan Delima · Puskesmas Bandung',
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&crop=face',
      quote: 'Platform ini sangat memudahkan saya menemukan lowongan bidan di kota yang saya tuju. Prosesnya cepat dan transparan.',
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Tenaga Kesehatan Terdaftar' },
    { value: '500+', label: 'Fasilitas Kesehatan Partner' },
    { value: '2,400+', label: 'Lowongan Aktif' },
    { value: '92%', label: 'Tingkat Kepuasan Pengguna' },
  ];

  const professions = [
    { emoji: '🩺', name: 'Dokter Umum' },
    { emoji: '❤️', name: 'Sp. Jantung' },
    { emoji: '🧠', name: 'Sp. Neurologi' },
    { emoji: '🦷', name: 'Dokter Gigi' },
    { emoji: '💉', name: 'Perawat ICU' },
    { emoji: '👶', name: 'Bidan' },
    { emoji: '🧪', name: 'Analis Lab' },
    { emoji: '💊', name: 'Apoteker' },
    { emoji: '🩻', name: 'Radiografer' },
    { emoji: '🧘', name: 'Fisioterapis' },
    { emoji: '🔬', name: 'Patologi Klinik' },
    { emoji: '🏃', name: '+ 40 Profesi Lain' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">Nakes<span className="text-teal-600">.id</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/for-employers" className="text-sm text-gray-500 hover:text-teal-600 transition hidden sm:block">Untuk Rekruter</Link>
            <Link href="/login" className="text-sm text-gray-700 hover:text-teal-600 px-4 py-2 border border-gray-200 rounded-lg transition">Masuk</Link>
            <Link href="/register" className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition font-medium">Daftar Gratis</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 via-teal-700/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Platform #1 Karier Tenaga Kesehatan Indonesia
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Wujudkan Karier<br />
                <span className="text-yellow-300">Kesehatan Terbaik</span><br />
                Anda di Sini
              </h1>
              <p className="text-lg sm:text-xl text-teal-100 mb-8 max-w-lg leading-relaxed">
                Bergabunglah dengan 15.000+ tenaga kesehatan profesional yang telah menemukan pekerjaan impian, membangun jaringan, dan memajukan karier mereka bersama Nakes.id.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Buat Profil Gratis →
                </Link>
                <Link href="/jobs" className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
                  Lihat Lowongan
                </Link>
              </div>
              <p className="mt-4 text-teal-200 text-sm">✓ Gratis selamanya &nbsp;·&nbsp; ✓ Tanpa biaya pendaftaran &nbsp;·&nbsp; ✓ Profil terverifikasi</p>
            </div>

            {/* Hero image grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-52">
                  <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80" alt="Doctor" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl h-36">
                  <img src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=400&q=80" alt="Nurse" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-36">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80" alt="Medical team" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl h-52">
                  <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80" alt="Healthcare professional" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80H1440V40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONS TICKER */}
      <section className="py-10 bg-teal-50 border-y border-teal-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-teal-700 font-semibold text-sm uppercase tracking-widest mb-6">Untuk Semua Profesi Kesehatan</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {professions.map((p) => (
              <div key={p.name} className="bg-white rounded-xl px-3 py-3 text-center shadow-sm border border-teal-100 hover:border-teal-300 hover:shadow-md transition">
                <div className="text-2xl mb-1">{p.emoji}</div>
                <div className="text-xs font-medium text-gray-700">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Mengapa Nakes.id?</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Semua yang Anda Butuhkan untuk<br />Karier Kesehatan yang Gemilang</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">Dari profil terverifikasi hingga ribuan lowongan — platform kami dirancang khusus untuk kebutuhan tenaga kesehatan Indonesia.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-teal-100 transition">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Cara Kerja</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">3 Langkah Menuju Karier Impian</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Buat Profil Gratis', desc: 'Daftar dalam 2 menit. Lengkapi STR, SIP, pengalaman, dan foto profesional Anda.', color: 'from-teal-400 to-teal-600' },
              { step: '02', title: 'Temukan Lowongan', desc: 'Jelajahi ribuan posisi dari seluruh Indonesia. Filter by spesialisasi, kota, gaji, dan fasilitas.', color: 'from-blue-400 to-blue-600' },
              { step: '03', title: 'Apply & Berhasil', desc: 'Lamar dengan satu klik. Rekruter langsung melihat profil Anda dan menghubungi tanpa perantara.', color: 'from-purple-400 to-purple-600' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mx-auto mb-4`}>{item.step}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-widest">Cerita Sukses</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Mereka Sudah Merasakannya</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-teal-600 text-xs">{t.role}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE IMAGE FEATURE */}
      <section className="py-24 bg-teal-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80"
                  alt="Healthcare professionals team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">✓</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Profil Terverifikasi</div>
                    <div className="text-gray-500 text-xs">STR & SIP divalidasi</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white lg:pl-8">
              <span className="text-teal-200 font-semibold text-sm uppercase tracking-widest">Eksklusif</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold mb-6">Khusus untuk Tenaga Kesehatan Profesional Indonesia</h2>
              <ul className="space-y-4">
                {[
                  'Profil mencakup STR, SIP, dan SKP — diakui oleh rekruter RS nasional',
                  'Koneksi langsung ke IDI, PPNI, IBI, dan asosiasi profesi lainnya',
                  'Update lowongan real-time dari RS Tipe A, B, C, D dan klinik swasta',
                  'Fitur referral: rekomendasikan kolega dan bangun reputasi profesional Anda',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-300 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-teal-100 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="inline-block mt-8 bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Daftar Sekarang — Gratis!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">🩺</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Siap Memulai Perjalanan Karier Terbaik Anda?</h2>
          <p className="text-gray-500 text-lg mb-8">Bergabunglah sekarang. Gratis. Tanpa batas waktu. Ratusan rekruter sudah menunggu profil Anda.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-teal-700 hover:shadow-2xl hover:scale-105 transition-all">
              Buat Profil Gratis Sekarang →
            </Link>
            <Link href="/jobs" className="border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:border-teal-400 hover:text-teal-600 transition">
              Jelajahi Lowongan
            </Link>
          </div>
          <p className="mt-6 text-gray-400 text-sm">Sudah punya akun? <Link href="/login" className="text-teal-600 hover:underline font-medium">Masuk di sini</Link></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white font-bold text-lg">Nakes<span className="text-teal-400">.id</span></span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-white transition">Beranda</Link>
              <Link href="/jobs" className="hover:text-white transition">Lowongan</Link>
              <Link href="/for-employers" className="hover:text-white transition">Untuk Rekruter</Link>
              <Link href="/register" className="hover:text-white transition">Daftar</Link>
            </div>
            <p className="text-xs">© 2026 Nakes.id · Platform Karier Tenaga Kesehatan Indonesia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
