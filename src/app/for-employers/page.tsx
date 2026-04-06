'use client';

import Link from 'next/link';

export default function ForEmployersPage() {
  const benefits = [
    {
      icon: '🎯',
      title: 'Talent Pool Terkurasi',
      desc: 'Akses 15.000+ profil tenaga kesehatan terverifikasi — dokter spesialis, perawat ICU, bidan, apoteker, dan lebih dari 40 profesi Nakes lainnya.',
    },
    {
      icon: '⚡',
      title: 'Pasang Lowongan dalam Menit',
      desc: 'Buat dan publikasikan lowongan kerja dengan mudah. Tentukan spesialisasi, jenis fasilitas, kisaran gaji, syarat BPJS — dan langsung live.',
    },
    {
      icon: '📋',
      title: 'Kelola Lamaran Terpusat',
      desc: 'Semua lamaran masuk dalam satu dashboard. Review profil, shortlist kandidat, dan atur jadwal wawancara — tanpa spreadsheet berantakan.',
    },
    {
      icon: '🔍',
      title: 'Cari Kandidat Proaktif',
      desc: 'Jangan hanya tunggu lamaran. Cari kandidat berdasarkan spesialisasi, lokasi, pengalaman, dan kepemilikan STR/SIP secara langsung.',
    },
    {
      icon: '✅',
      title: 'Kredensial Terverifikasi',
      desc: 'Setiap profil dilengkapi STR, SIP, SKP, dan riwayat pendidikan yang telah divalidasi — kurangi risiko rekrutmen yang salah.',
    },
    {
      icon: '📊',
      title: 'Analytics Rekrutmen',
      desc: 'Pantau performa setiap lowongan: jumlah views, lamaran masuk, conversion rate, dan waktu rata-rata hingga pengisian posisi.',
    },
  ];

  const testimonials = [
    {
      name: 'dr. Hendra Gunawan',
      role: 'Direktur SDM · RS Siloam Kebon Jeruk',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&h=120&fit=crop&crop=face',
      quote: 'Kami berhasil mengisi 12 posisi dokter spesialis dalam waktu kurang dari sebulan. Kualitas kandidat jauh di atas platform rekrutmen umum.',
    },
    {
      name: 'Ibu Ratna Dewi',
      role: 'Manajer HRD · Klinik Prodia Jakarta',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
      quote: 'Fitur pencarian kandidat aktif adalah game changer. Kami bisa langsung targeting perawat dengan sertifikasi spesifik yang kami butuhkan.',
    },
    {
      name: 'dr. Budi Santoso',
      role: 'Kepala Divisi Medis · RSCM',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&crop=face',
      quote: 'Nakes.id memahami kebutuhan fasilitas kesehatan Indonesia. STR dan SIP langsung terverifikasi — tidak perlu cek manual lagi.',
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Kandidat Aktif' },
    { value: '500+', label: 'Rekruter Terdaftar' },
    { value: '8,200+', label: 'Posisi Berhasil Diisi' },
    { value: '18 Hari', label: 'Rata-rata Time-to-Hire' },
  ];

  const facilityTypes = [
    { emoji: '🏥', name: 'RS Tipe A' },
    { emoji: '🏨', name: 'RS Tipe B' },
    { emoji: '🏪', name: 'RS Tipe C/D' },
    { emoji: '🩺', name: 'Klinik Pratama' },
    { emoji: '💊', name: 'Apotek Jaringan' },
    { emoji: '🔬', name: 'Lab Klinik' },
    { emoji: '🏛️', name: 'Puskesmas' },
    { emoji: '🏢', name: 'Klinik Korporat' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Gratis',
      period: '',
      color: 'border-gray-200',
      buttonClass: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50',
      features: ['3 lowongan aktif', 'Akses profil kandidat dasar', 'Dashboard lamaran', 'Support email'],
      tag: null,
    },
    {
      name: 'Professional',
      price: 'Rp 1,5 Jt',
      period: '/bulan',
      color: 'border-teal-500 shadow-2xl scale-105',
      buttonClass: 'bg-teal-600 text-white hover:bg-teal-700',
      features: ['Lowongan tidak terbatas', 'Pencarian kandidat aktif', 'STR/SIP verified badge', 'Analytics dashboard', 'Priority support', 'Logo RS di setiap lowongan'],
      tag: 'Paling Populer',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      color: 'border-blue-200',
      buttonClass: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      features: ['Semua fitur Professional', 'Dedicated account manager', 'API integration ke HRIS', 'Bulk posting & import', 'White-label job portal', 'SLA rekrutmen terjamin'],
      tag: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">Nakes<span className="text-blue-600">.id</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/for-professionals" className="text-sm text-gray-500 hover:text-blue-600 transition hidden sm:block">Untuk Nakes</Link>
            <Link href="/login" className="text-sm text-gray-700 hover:text-blue-600 px-4 py-2 border border-gray-200 rounded-lg transition">Masuk</Link>
            <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Daftar Rekruter</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-700/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Platform Rekrutmen Nakes #1 Indonesia
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Temukan Tenaga<br />
                Kesehatan <span className="text-yellow-300">Terbaik</span><br />
                untuk Fasilitas Anda
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
                Akses 15.000+ profil dokter, perawat, bidan, dan Nakes terverifikasi. Pasang lowongan gratis dan temukan kandidat yang tepat lebih cepat dari sebelumnya.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  Mulai Rekrut Gratis →
                </Link>
                <a href="#pricing" className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
                  Lihat Paket Harga
                </a>
              </div>
              <p className="mt-4 text-blue-200 text-sm">✓ Setup dalam 5 menit &nbsp;·&nbsp; ✓ Tanpa kontrak jangka panjang &nbsp;·&nbsp; ✓ Support 24/7</p>
            </div>

            {/* Hero image grid */}
            <div className="hidden lg:block relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80"
                  alt="Medical team meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stats cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-2xl font-extrabold text-blue-600">18 Hari</div>
                <div className="text-gray-500 text-xs font-medium">Avg. Time-to-Hire</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">8,200+ Posisi Terisi</div>
                    <div className="text-gray-400 text-xs">di seluruh Indonesia</div>
                  </div>
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
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY TYPES */}
      <section className="py-10 bg-blue-50 border-y border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-blue-700 font-semibold text-sm uppercase tracking-widest mb-6">Untuk Semua Jenis Fasilitas Kesehatan</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {facilityTypes.map((f) => (
              <div key={f.name} className="bg-white rounded-xl px-3 py-3 text-center shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-md transition">
                <div className="text-2xl mb-1">{f.emoji}</div>
                <div className="text-xs font-medium text-gray-700">{f.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Keunggulan Platform</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Rekrut Lebih Cepat,<br />Lebih Tepat, Lebih Efisien</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">Dirancang khusus untuk kebutuhan rekrutmen fasilitas kesehatan Indonesia — dari RS nasional hingga klinik pratama.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-100 transition">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Cara Kerja</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Mulai Rekrut dalam 4 Langkah</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🏥', title: 'Daftarkan Fasilitas', desc: 'Buat akun rekruter. Lengkapi profil fasilitas kesehatan Anda dalam 5 menit.' },
              { step: '02', icon: '📝', title: 'Pasang Lowongan', desc: 'Isi detail posisi, spesialisasi, gaji, dan syarat. Langsung live setelah disubmit.' },
              { step: '03', icon: '🔍', title: 'Review Kandidat', desc: 'Terima lamaran masuk atau cari kandidat aktif sesuai kriteria yang Anda tentukan.' },
              { step: '04', icon: '🤝', title: 'Hubungi & Rekrut', desc: 'Hubungi kandidat langsung dari platform. Jadwalkan wawancara dan buat penawaran.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-blue-600 font-bold text-xs tracking-widest mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Testimoni Rekruter</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Dipercaya oleh Ratusan Fasilitas Kesehatan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-blue-600 text-xs">{t.role}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-teal-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white lg:pr-8">
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-widest">Dashboard Rekruter</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold mb-6">Semua Kebutuhan Rekrutmen Nakes dalam Satu Platform</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📬', label: 'Lamaran Masuk', value: 'Real-time' },
                  { icon: '👥', label: 'Profil Kandidat', value: '15,000+' },
                  { icon: '✅', label: 'Terverifikasi', value: '100%' },
                  { icon: '📍', label: 'Cakupan', value: '34 Provinsi' },
                  { icon: '🏆', label: 'Posisi Terisi', value: '8,200+' },
                  { icon: '⚡', label: 'Time-to-Hire', value: '18 Hari' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{item.value}</div>
                      <div className="text-blue-200 text-xs">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/register" className="inline-block mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Akses Dashboard Gratis →
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
                  alt="Hospital recruitment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Paket Harga</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Pilih Paket yang Tepat untuk Fasilitas Anda</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi, tidak ada kontrak jangka panjang.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 border-2 ${plan.color}`}>
                {plan.tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">{plan.tag}</div>
                )}
                <div className="text-xl font-bold text-gray-900 mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-teal-500 font-bold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3 px-6 rounded-xl font-bold transition ${plan.buttonClass}`}>
                  {plan.name === 'Enterprise' ? 'Hubungi Sales' : 'Mulai Sekarang'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">🏥</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Mulai Rekrut Tenaga Kesehatan Terbaik Indonesia Hari Ini</h2>
          <p className="text-gray-500 text-lg mb-8">Bergabunglah dengan 500+ fasilitas kesehatan yang telah mempercayai Nakes.id untuk kebutuhan rekrutmen mereka.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition-all">
              Daftar Rekruter — Gratis →
            </Link>
            <Link href="/" className="border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:border-blue-400 hover:text-blue-600 transition">
              Kembali ke Beranda
            </Link>
          </div>
          <p className="mt-6 text-gray-400 text-sm">Sudah punya akun rekruter? <Link href="/login" className="text-blue-600 hover:underline font-medium">Masuk di sini</Link></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white font-bold text-lg">Nakes<span className="text-blue-400">.id</span></span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-white transition">Beranda</Link>
              <Link href="/jobs" className="hover:text-white transition">Lowongan</Link>
              <Link href="/for-professionals" className="hover:text-white transition">Untuk Nakes</Link>
              <Link href="/register" className="hover:text-white transition">Daftar</Link>
            </div>
            <p className="text-xs">© 2026 Nakes.id · Platform Rekrutmen Tenaga Kesehatan Indonesia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
