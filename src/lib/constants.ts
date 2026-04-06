export const PROFESSION_TYPES = {
  'Dokter': [
    'Dokter Umum',
    'Dokter Spesialis',
    'Dokter Subspesialis',
    'Dokter Gigi',
    'Dokter Gigi Spesialis',
  ],
  'Perawat': [
    'Perawat Vokasional (D3)',
    'Ners (S1+Profesi)',
    'Ners Spesialis (S2)',
    'Penata Anestesi',
  ],
  'Bidan': [
    'Bidan Terampil (D3)',
    'Bidan Ahli (D4/S1)',
    'Bidan Spesialis',
  ],
  'Lainnya': [
    'Apoteker',
    'Asisten Apoteker',
    'Dietisien/Tenaga Gizi',
    'Fisioterapis',
    'Terapis Wicara',
    'Okupasi Terapis',
    'Radiografer',
    'Rekam Medis',
    'Teknisi Laboratorium Medis',
    'Analis Kesehatan',
    'Teknisi Elektromedis',
    'Psikolog Klinis',
    'Sanitarian',
  ],
} as const;

export const SPECIALIZATIONS = [
  'Sp.A', 'Sp.OG', 'Sp.PD', 'Sp.B', 'Sp.JP', 'Sp.S', 'Sp.M',
  'Sp.THT-KL', 'Sp.KK', 'Sp.KJ', 'Sp.Rad', 'Sp.An', 'Sp.P',
  'Sp.U', 'Sp.EM', 'Sp.GK', 'Sp.KO',
];

export const FACILITY_TYPES = [
  'RS Tipe A', 'RS Tipe B', 'RS Tipe C', 'RS Tipe D',
  'Puskesmas', 'Klinik Pratama', 'Klinik Utama', 'Praktik Mandiri',
];

export const EMPLOYMENT_TYPES = [
  'Tetap', 'Kontrak', 'BLUD', 'Honorer', 'Paruh Waktu',
];

export const PROFESSIONAL_ASSOCIATIONS = ['IDI', 'PPNI', 'IBI', 'IAI'];

export const PROVINCES = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi',
  'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kep. Bangka Belitung',
  'Kep. Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah',
  'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat',
  'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur',
  'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah',
  'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo',
  'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat',
  'Papua', 'Papua Tengah', 'Papua Pegunungan', 'Papua Selatan', 'Papua Barat Daya',
];
