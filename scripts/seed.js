const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'nakes.db');

// Remove existing DB for clean seed
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    profession_type TEXT NOT NULL,
    specialization TEXT,
    nurse_level TEXT,
    str_number TEXT,
    str_expiry TEXT,
    str_status TEXT DEFAULT 'Aktif',
    sip_number TEXT,
    sip_facility TEXT,
    skp_credits INTEGER DEFAULT 0,
    professional_association TEXT,
    province TEXT,
    kota TEXT,
    current_workplace TEXT,
    current_workplace_type TEXT,
    bio TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    posted_by INTEGER,
    title TEXT NOT NULL,
    facility_name TEXT NOT NULL,
    facility_type TEXT NOT NULL,
    location TEXT NOT NULL,
    province TEXT NOT NULL,
    profession_type TEXT NOT NULL,
    specialization TEXT,
    employment_type TEXT NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    bpjs_required INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    requirements TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    facility_name TEXT NOT NULL,
    facility_type TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    is_current INTEGER DEFAULT 0,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT,
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    endorsements INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    related_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Employer columns
try { db.exec("ALTER TABLE users ADD COLUMN account_type TEXT DEFAULT 'nakes'"); } catch {}
try { db.exec("ALTER TABLE users ADD COLUMN employer_facility_name TEXT"); } catch {}
try { db.exec("ALTER TABLE users ADD COLUMN employer_facility_type TEXT"); } catch {}
try { db.exec("ALTER TABLE users ADD COLUMN employer_description TEXT"); } catch {}
try { db.exec("ALTER TABLE users ADD COLUMN employer_website TEXT"); } catch {}
try { db.exec("ALTER TABLE users ADD COLUMN employer_size TEXT"); } catch {}

db.exec(`CREATE TABLE IF NOT EXISTS job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  applicant_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  cover_letter TEXT,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, applicant_id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS saved_candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employer_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  notes TEXT,
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employer_id, candidate_id)
)`);

const hashedPassword = bcrypt.hashSync('password123', 10);

const insertUser = db.prepare(`
  INSERT INTO users (username, email, password, full_name, profession_type, specialization, nurse_level, str_number, str_expiry, str_status, sip_number, sip_facility, skp_credits, professional_association, province, kota, current_workplace, current_workplace_type, bio, phone)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertExperience = db.prepare(`
  INSERT INTO experiences (user_id, title, facility_name, facility_type, location, start_date, end_date, is_current, description)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertEducation = db.prepare(`
  INSERT INTO education (user_id, institution, degree, field_of_study, start_year, end_year)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const insertSkill = db.prepare(`
  INSERT INTO skills (user_id, name, endorsements)
  VALUES (?, ?, ?)
`);

const insertPost = db.prepare(`
  INSERT INTO posts (user_id, content, likes, created_at)
  VALUES (?, ?, ?, ?)
`);

const insertJob = db.prepare(`
  INSERT INTO jobs (posted_by, title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertConnection = db.prepare(`
  INSERT INTO connections (requester_id, receiver_id, status)
  VALUES (?, ?, ?)
`);

// ===== USERS =====
const users = [
  // 1. Dokter Spesialis Jantung - RSCM Jakarta
  {
    username: 'dr.arief.jp', email: 'arief.cardio@nakes.id', full_name: 'dr. Arief Wibowo, Sp.JP, FIHA',
    profession_type: 'Dokter Spesialis', specialization: 'Sp.JP', nurse_level: null,
    str_number: 'STR-31-2024-00145', str_expiry: '2029-03-15', str_status: 'Aktif',
    sip_number: 'SIP-DKI-445/2024', sip_facility: 'RSUPN Dr. Cipto Mangunkusumo',
    skp_credits: 185, professional_association: 'IDI',
    province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    current_workplace: 'RSUPN Dr. Cipto Mangunkusumo', current_workplace_type: 'RS Tipe A',
    bio: 'Dokter Spesialis Jantung dan Pembuluh Darah dengan pengalaman 12 tahun. Fokus pada intervensi koroner perkutan dan elektrofisiologi. Aktif dalam penelitian klinis kardiovaskular di RSCM.',
    phone: '081234567001',
  },
  // 2. Dokter Spesialis Anak - Siloam
  {
    username: 'dr.putri.spa', email: 'putri.anak@nakes.id', full_name: 'dr. Putri Maharani, Sp.A, M.Kes',
    profession_type: 'Dokter Spesialis', specialization: 'Sp.A', nurse_level: null,
    str_number: 'STR-31-2023-00892', str_expiry: '2028-07-20', str_status: 'Aktif',
    sip_number: 'SIP-DKI-1122/2023', sip_facility: 'RS Siloam Semanggi',
    skp_credits: 210, professional_association: 'IDI',
    province: 'DKI Jakarta', kota: 'Jakarta Selatan',
    current_workplace: 'RS Siloam Semanggi', current_workplace_type: 'RS Tipe A',
    bio: 'Dokter Spesialis Anak dengan keahlian di bidang tumbuh kembang anak dan nutrisi pediatrik. Lulusan terbaik FK UI 2012. Aktif memberikan edukasi kesehatan anak melalui media sosial.',
    phone: '081234567002',
  },
  // 3. Dokter Spesialis Obgyn - RS Bunda
  {
    username: 'dr.hendra.spog', email: 'hendra.obgyn@nakes.id', full_name: 'dr. Hendra Gunawan, Sp.OG(K)',
    profession_type: 'Dokter Spesialis', specialization: 'Sp.OG', nurse_level: null,
    str_number: 'STR-31-2022-01567', str_expiry: '2027-11-10', str_status: 'Aktif',
    sip_number: 'SIP-DKI-2234/2022', sip_facility: 'RS Bunda Menteng',
    skp_credits: 245, professional_association: 'IDI',
    province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    current_workplace: 'RS Bunda Menteng', current_workplace_type: 'RS Tipe B',
    bio: 'Konsultan Fetomaternal dengan pengalaman 15 tahun menangani kehamilan risiko tinggi. Pioneer program USG 4D di Indonesia. Dosen FK Universitas Indonesia.',
    phone: '081234567003',
  },
  // 4. Dokter Umum - Puskesmas Bandung
  {
    username: 'dr.siti.umum', email: 'siti.umum@nakes.id', full_name: 'dr. Siti Nurhaliza',
    profession_type: 'Dokter Umum', specialization: null, nurse_level: null,
    str_number: 'STR-32-2023-03421', str_expiry: '2028-05-01', str_status: 'Aktif',
    sip_number: 'SIP-JABAR-567/2023', sip_facility: 'Puskesmas Cikutra Bandung',
    skp_credits: 95, professional_association: 'IDI',
    province: 'Jawa Barat', kota: 'Bandung',
    current_workplace: 'Puskesmas Cikutra', current_workplace_type: 'Puskesmas',
    bio: 'Dokter umum Puskesmas dengan passion di bidang kesehatan masyarakat dan program imunisasi. Koordinator program Posbindu PTM Kota Bandung.',
    phone: '081234567004',
  },
  // 5. Dokter Umum - Puskesmas Surabaya
  {
    username: 'dr.budi.umum', email: 'budi.umum@nakes.id', full_name: 'dr. Budi Santoso, M.Kes',
    profession_type: 'Dokter Umum', specialization: null, nurse_level: null,
    str_number: 'STR-35-2024-01234', str_expiry: '2029-01-20', str_status: 'Aktif',
    sip_number: 'SIP-JATIM-890/2024', sip_facility: 'Puskesmas Tanjung Perak Surabaya',
    skp_credits: 120, professional_association: 'IDI',
    province: 'Jawa Timur', kota: 'Surabaya',
    current_workplace: 'Puskesmas Tanjung Perak', current_workplace_type: 'Puskesmas',
    bio: 'Kepala Puskesmas Tanjung Perak. Berpengalaman 8 tahun di pelayanan primer. Fokus pada program TB-HIV dan kesehatan pelayaran.',
    phone: '081234567005',
  },
  // 6. Ners ICU - RS Cipto
  {
    username: 'ns.dewi.icu', email: 'dewi.icu@nakes.id', full_name: 'Ns. Dewi Anggraini, S.Kep',
    profession_type: 'Ners (S1+Profesi)', specialization: null, nurse_level: 'Ners (S1+Profesi)',
    str_number: 'STR-31-2023-07891', str_expiry: '2028-09-15', str_status: 'Aktif',
    sip_number: 'SIP-DKI-3345/2023', sip_facility: 'RSUPN Dr. Cipto Mangunkusumo',
    skp_credits: 75, professional_association: 'PPNI',
    province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    current_workplace: 'RSUPN Dr. Cipto Mangunkusumo - ICU', current_workplace_type: 'RS Tipe A',
    bio: 'Perawat ICU dengan sertifikasi BTCLS dan ACLS. 6 tahun pengalaman di unit perawatan intensif. Aktif dalam tim Code Blue RSCM.',
    phone: '081234567006',
  },
  // 7. Ners IGD - RS Fatmawati
  {
    username: 'ns.rizky.igd', email: 'rizky.igd@nakes.id', full_name: 'Ns. Rizky Pratama, S.Kep',
    profession_type: 'Ners (S1+Profesi)', specialization: null, nurse_level: 'Ners (S1+Profesi)',
    str_number: 'STR-31-2024-04567', str_expiry: '2029-02-28', str_status: 'Aktif',
    sip_number: 'SIP-DKI-4456/2024', sip_facility: 'RSUP Fatmawati',
    skp_credits: 60, professional_association: 'PPNI',
    province: 'DKI Jakarta', kota: 'Jakarta Selatan',
    current_workplace: 'RSUP Fatmawati - IGD', current_workplace_type: 'RS Tipe A',
    bio: 'Emergency Nurse dengan sertifikasi BTCLS, ACLS, dan Triage. Koordinator pelatihan triase IGD. Anggota Tim Disaster Response RSUP Fatmawati.',
    phone: '081234567007',
  },
  // 8. Ners Maternitas - RS Harapan Kita
  {
    username: 'ns.maya.mat', email: 'maya.maternitas@nakes.id', full_name: 'Ns. Maya Sari, S.Kep, Ners',
    profession_type: 'Ners (S1+Profesi)', specialization: null, nurse_level: 'Ners (S1+Profesi)',
    str_number: 'STR-31-2023-08234', str_expiry: '2028-12-01', str_status: 'Aktif',
    sip_number: 'SIP-DKI-5567/2023', sip_facility: 'RS Jantung dan Pembuluh Darah Harapan Kita',
    skp_credits: 85, professional_association: 'PPNI',
    province: 'DKI Jakarta', kota: 'Jakarta Barat',
    current_workplace: 'RS Harapan Kita - Maternitas', current_workplace_type: 'RS Tipe A',
    bio: 'Perawat maternitas berpengalaman dengan sertifikasi asuhan neonatal. Fokus pada perawatan ibu dan bayi pasca operasi jantung saat kehamilan.',
    phone: '081234567008',
  },
  // 9. Bidan Ahli - Klinik Pratama Jakarta
  {
    username: 'bd.rina.ahli', email: 'rina.bidan@nakes.id', full_name: 'Bd. Rina Wulandari, S.Tr.Keb',
    profession_type: 'Bidan Ahli (D4/S1)', specialization: null, nurse_level: null,
    str_number: 'STR-31-2024-09876', str_expiry: '2029-06-30', str_status: 'Aktif',
    sip_number: 'SIP-DKI-6678/2024', sip_facility: 'Klinik Pratama Bunda Sehat Jakarta',
    skp_credits: 55, professional_association: 'IBI',
    province: 'DKI Jakarta', kota: 'Jakarta Timur',
    current_workplace: 'Klinik Pratama Bunda Sehat', current_workplace_type: 'Klinik Pratama',
    bio: 'Bidan Ahli dengan 5 tahun pengalaman. Kompeten dalam ANC terpadu, persalinan normal, dan KB pascasalin. Aktif dalam program Kelas Ibu Hamil.',
    phone: '081234567009',
  },
  // 10. Bidan Ahli - Klinik Pratama Yogyakarta
  {
    username: 'bd.lestari.yogya', email: 'lestari.bidan@nakes.id', full_name: 'Bd. Lestari Handayani, S.Tr.Keb',
    profession_type: 'Bidan Ahli (D4/S1)', specialization: null, nurse_level: null,
    str_number: 'STR-34-2023-05432', str_expiry: '2028-08-15', str_status: 'Aktif',
    sip_number: 'SIP-DIY-789/2023', sip_facility: 'Klinik Pratama Ibu dan Anak Yogyakarta',
    skp_credits: 70, professional_association: 'IBI',
    province: 'DI Yogyakarta', kota: 'Yogyakarta',
    current_workplace: 'Klinik Pratama Ibu dan Anak Yogyakarta', current_workplace_type: 'Klinik Pratama',
    bio: 'Bidan senior dengan keahlian di bidang laktasi dan perawatan neonatal. Konselor menyusui bersertifikat. Pengurus IBI Cabang Yogyakarta.',
    phone: '081234567010',
  },
  // 11. Apoteker - RS Tipe C Tangerang
  {
    username: 'apt.farhan', email: 'farhan.apoteker@nakes.id', full_name: 'Apt. Farhan Maulana, S.Farm',
    profession_type: 'Apoteker', specialization: null, nurse_level: null,
    str_number: 'STR-36-2024-02345', str_expiry: '2029-04-10', str_status: 'Aktif',
    sip_number: 'SIP-BTN-234/2024', sip_facility: 'RS Tipe C Kota Tangerang',
    skp_credits: 45, professional_association: 'IAI',
    province: 'Banten', kota: 'Tangerang',
    current_workplace: 'RS Tipe C Kota Tangerang', current_workplace_type: 'RS Tipe C',
    bio: 'Apoteker rumah sakit dengan keahlian di farmasi klinis dan manajemen obat. Bertanggung jawab atas formularium RS dan program pharmacovigilance.',
    phone: '081234567011',
  },
  // 12. Fisioterapis - RS Ortopedi Surakarta
  {
    username: 'ft.agung', email: 'agung.fisio@nakes.id', full_name: 'Agung Prasetyo, S.Ft',
    profession_type: 'Fisioterapis', specialization: null, nurse_level: null,
    str_number: 'STR-33-2023-06789', str_expiry: '2028-10-20', str_status: 'Aktif',
    sip_number: 'SIP-JATENG-456/2023', sip_facility: 'RS Ortopedi Prof. Dr. R. Soeharso Surakarta',
    skp_credits: 65, professional_association: null,
    province: 'Jawa Tengah', kota: 'Surakarta',
    current_workplace: 'RS Ortopedi Prof. Dr. R. Soeharso Surakarta', current_workplace_type: 'RS Tipe A',
    bio: 'Fisioterapis ortopedi dengan 7 tahun pengalaman rehabilitasi pasca operasi. Spesialis terapi manual dan rehabilitasi cedera olahraga.',
    phone: '081234567012',
  },
  // 13. Psikolog Klinis - Klinik Jiwa Jakarta
  {
    username: 'psi.anita', email: 'anita.psikolog@nakes.id', full_name: 'Anita Kusuma, M.Psi, Psikolog',
    profession_type: 'Psikolog Klinis', specialization: null, nurse_level: null,
    str_number: 'STR-31-2024-11234', str_expiry: '2029-08-25', str_status: 'Aktif',
    sip_number: 'SIP-DKI-7789/2024', sip_facility: 'Klinik Jiwa Harmoni Jakarta',
    skp_credits: 40, professional_association: null,
    province: 'DKI Jakarta', kota: 'Jakarta Selatan',
    current_workplace: 'Klinik Jiwa Harmoni', current_workplace_type: 'Klinik Utama',
    bio: 'Psikolog Klinis dengan keahlian CBT dan EMDR. Fokus pada gangguan kecemasan, depresi, dan trauma. Supervisor klinis untuk psikolog muda.',
    phone: '081234567013',
  },
  // 14. Dokter Gigi
  {
    username: 'drg.indah', email: 'indah.gigi@nakes.id', full_name: 'drg. Indah Permata Sari',
    profession_type: 'Dokter Gigi', specialization: null, nurse_level: null,
    str_number: 'STR-31-2023-12567', str_expiry: '2028-04-15', str_status: 'Aktif',
    sip_number: 'SIP-DKI-8890/2023', sip_facility: 'Klinik Gigi Senyum Cerah Jakarta',
    skp_credits: 80, professional_association: null,
    province: 'DKI Jakarta', kota: 'Jakarta Utara',
    current_workplace: 'Klinik Gigi Senyum Cerah', current_workplace_type: 'Klinik Pratama',
    bio: 'Dokter gigi umum dengan keahlian di estetika dental dan perawatan endodontik. 5 tahun pengalaman praktik mandiri dan klinik.',
    phone: '081234567014',
  },
  // 15. Dokter Gigi Spesialis Ortodonsi
  {
    username: 'drg.fajar.spbm', email: 'fajar.ortho@nakes.id', full_name: 'drg. Fajar Nugroho, Sp.Ort',
    profession_type: 'Dokter Gigi Spesialis', specialization: 'Ortodonsi', nurse_level: null,
    str_number: 'STR-31-2024-13890', str_expiry: '2029-11-30', str_status: 'Aktif',
    sip_number: 'SIP-DKI-9901/2024', sip_facility: 'RS Gigi dan Mulut FKG UI',
    skp_credits: 150, professional_association: null,
    province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    current_workplace: 'RS Gigi dan Mulut FKG UI', current_workplace_type: 'RS Tipe A',
    bio: 'Spesialis Ortodonsi dengan keahlian di perawatan maloklusi dan aligner. Dosen tetap FKG Universitas Indonesia. Peneliti aktif di bidang ortodonsi digital.',
    phone: '081234567015',
  },
];

console.log('Seeding users...');
const userIds = [];
for (const u of users) {
  const result = insertUser.run(
    u.username, u.email, hashedPassword, u.full_name, u.profession_type,
    u.specialization, u.nurse_level, u.str_number, u.str_expiry, u.str_status,
    u.sip_number, u.sip_facility, u.skp_credits, u.professional_association,
    u.province, u.kota, u.current_workplace, u.current_workplace_type, u.bio, u.phone
  );
  userIds.push(result.lastInsertRowid);
  console.log(`  + ${u.full_name}`);
}

// ===== EXPERIENCES =====
console.log('Seeding experiences...');
const experiences = [
  // Dr. Arief (Sp.JP)
  [userIds[0], 'Dokter Spesialis Jantung dan Pembuluh Darah', 'RSUPN Dr. Cipto Mangunkusumo', 'RS Tipe A', 'Jakarta Pusat', '2018-01', null, 1, 'Pelayanan kardiologi intervensi dan elektrofisiologi'],
  [userIds[0], 'Fellow Kardiologi Intervensi', 'National Heart Centre Singapore', null, 'Singapore', '2016-01', '2018-01', 0, 'Fellowship intervensi koroner perkutan'],
  // Dr. Putri (Sp.A)
  [userIds[1], 'Dokter Spesialis Anak', 'RS Siloam Semanggi', 'RS Tipe A', 'Jakarta Selatan', '2019-06', null, 1, 'Pelayanan tumbuh kembang dan nutrisi pediatrik'],
  [userIds[1], 'Dokter Spesialis Anak', 'RS Pondok Indah', 'RS Tipe B', 'Jakarta Selatan', '2016-01', '2019-06', 0, null],
  // Dr. Hendra (Sp.OG)
  [userIds[2], 'Konsultan Fetomaternal', 'RS Bunda Menteng', 'RS Tipe B', 'Jakarta Pusat', '2015-03', null, 1, 'Penanganan kehamilan risiko tinggi dan USG 4D'],
  // Dr. Siti (Umum)
  [userIds[3], 'Dokter Puskesmas', 'Puskesmas Cikutra', 'Puskesmas', 'Bandung', '2020-01', null, 1, 'Pelayanan kesehatan primer dan program imunisasi'],
  // Dr. Budi (Umum)
  [userIds[4], 'Kepala Puskesmas', 'Puskesmas Tanjung Perak', 'Puskesmas', 'Surabaya', '2021-06', null, 1, 'Manajemen Puskesmas dan program TB-HIV'],
  [userIds[4], 'Dokter Puskesmas', 'Puskesmas Wonokromo', 'Puskesmas', 'Surabaya', '2017-01', '2021-06', 0, null],
  // Ns. Dewi (ICU)
  [userIds[5], 'Perawat ICU', 'RSUPN Dr. Cipto Mangunkusumo', 'RS Tipe A', 'Jakarta Pusat', '2019-03', null, 1, 'Asuhan keperawatan intensif dan tim Code Blue'],
  // Ns. Rizky (IGD)
  [userIds[6], 'Perawat IGD', 'RSUP Fatmawati', 'RS Tipe A', 'Jakarta Selatan', '2020-07', null, 1, 'Emergency nursing dan triase'],
  // Ns. Maya (Maternitas)
  [userIds[7], 'Perawat Maternitas', 'RS Harapan Kita', 'RS Tipe A', 'Jakarta Barat', '2018-09', null, 1, 'Perawatan ibu dan bayi pasca operasi jantung'],
  // Bd. Rina
  [userIds[8], 'Bidan Pelaksana', 'Klinik Pratama Bunda Sehat', 'Klinik Pratama', 'Jakarta Timur', '2020-04', null, 1, 'ANC terpadu dan persalinan normal'],
  // Bd. Lestari
  [userIds[9], 'Bidan Senior', 'Klinik Pratama Ibu dan Anak Yogyakarta', 'Klinik Pratama', 'Yogyakarta', '2017-08', null, 1, 'Pelayanan kebidanan dan konseling laktasi'],
  // Apt. Farhan
  [userIds[10], 'Apoteker Rumah Sakit', 'RS Tipe C Kota Tangerang', 'RS Tipe C', 'Tangerang', '2021-01', null, 1, 'Farmasi klinis dan manajemen formularium'],
  // Ft. Agung
  [userIds[11], 'Fisioterapis', 'RS Ortopedi Prof. Dr. R. Soeharso Surakarta', 'RS Tipe A', 'Surakarta', '2018-05', null, 1, 'Rehabilitasi ortopedi pasca operasi'],
  // Psi. Anita
  [userIds[12], 'Psikolog Klinis', 'Klinik Jiwa Harmoni', 'Klinik Utama', 'Jakarta Selatan', '2020-10', null, 1, 'Terapi CBT dan EMDR untuk gangguan kecemasan dan trauma'],
  // drg. Indah
  [userIds[13], 'Dokter Gigi', 'Klinik Gigi Senyum Cerah', 'Klinik Pratama', 'Jakarta Utara', '2019-11', null, 1, 'Estetika dental dan endodontik'],
  // drg. Fajar
  [userIds[14], 'Spesialis Ortodonsi', 'RS Gigi dan Mulut FKG UI', 'RS Tipe A', 'Jakarta Pusat', '2017-02', null, 1, 'Perawatan maloklusi dan ortodonsi digital'],
];

for (const exp of experiences) {
  insertExperience.run(...exp);
}

// ===== EDUCATION =====
console.log('Seeding education...');
const educationData = [
  [userIds[0], 'Universitas Indonesia', 'Spesialis', 'Kardiologi dan Kedokteran Vaskular', 2012, 2016],
  [userIds[0], 'Universitas Indonesia', 'S1 Kedokteran', 'Pendidikan Dokter', 2005, 2011],
  [userIds[1], 'Universitas Indonesia', 'Spesialis', 'Ilmu Kesehatan Anak', 2012, 2016],
  [userIds[1], 'Universitas Indonesia', 'S1 Kedokteran', 'Pendidikan Dokter', 2006, 2012],
  [userIds[2], 'Universitas Gadjah Mada', 'Subspesialis', 'Fetomaternal', 2012, 2015],
  [userIds[2], 'Universitas Gadjah Mada', 'Spesialis', 'Obstetri dan Ginekologi', 2007, 2012],
  [userIds[3], 'Universitas Padjadjaran', 'S1 Kedokteran', 'Pendidikan Dokter', 2013, 2019],
  [userIds[4], 'Universitas Airlangga', 'S2 Kesehatan Masyarakat', 'Manajemen Kesehatan', 2019, 2021],
  [userIds[4], 'Universitas Airlangga', 'S1 Kedokteran', 'Pendidikan Dokter', 2010, 2016],
  [userIds[5], 'Universitas Indonesia', 'Profesi Ners', 'Keperawatan', 2017, 2018],
  [userIds[5], 'Universitas Indonesia', 'S1 Keperawatan', 'Ilmu Keperawatan', 2013, 2017],
  [userIds[6], 'Universitas Padjadjaran', 'Profesi Ners', 'Keperawatan', 2018, 2019],
  [userIds[6], 'Universitas Padjadjaran', 'S1 Keperawatan', 'Ilmu Keperawatan', 2014, 2018],
  [userIds[7], 'Universitas Gadjah Mada', 'Profesi Ners', 'Keperawatan Maternitas', 2016, 2017],
  [userIds[8], 'Poltekkes Kemenkes Jakarta III', 'D4 Kebidanan', 'Kebidanan', 2016, 2020],
  [userIds[9], 'Poltekkes Kemenkes Yogyakarta', 'D4 Kebidanan', 'Kebidanan', 2013, 2017],
  [userIds[10], 'Universitas Pancasila', 'Profesi Apoteker', 'Farmasi', 2019, 2020],
  [userIds[10], 'Universitas Pancasila', 'S1 Farmasi', 'Ilmu Farmasi', 2015, 2019],
  [userIds[11], 'Universitas Muhammadiyah Surakarta', 'S1 Fisioterapi', 'Fisioterapi', 2013, 2017],
  [userIds[12], 'Universitas Indonesia', 'S2 Profesi Psikolog', 'Psikologi Klinis', 2017, 2020],
  [userIds[12], 'Universitas Indonesia', 'S1 Psikologi', 'Psikologi', 2013, 2017],
  [userIds[13], 'Universitas Trisakti', 'S1 Kedokteran Gigi', 'Kedokteran Gigi', 2013, 2019],
  [userIds[14], 'Universitas Indonesia', 'Spesialis', 'Ortodonsia', 2013, 2017],
  [userIds[14], 'Universitas Indonesia', 'S1 Kedokteran Gigi', 'Kedokteran Gigi', 2007, 2013],
];

for (const edu of educationData) {
  insertEducation.run(...edu);
}

// ===== SKILLS =====
console.log('Seeding skills...');
const skillsData = [
  // Dr. Arief
  [userIds[0], 'Intervensi Koroner Perkutan', 45], [userIds[0], 'Elektrofisiologi', 32], [userIds[0], 'Ekokardiografi', 28], [userIds[0], 'ACLS', 25],
  // Dr. Putri
  [userIds[1], 'Tumbuh Kembang Anak', 38], [userIds[1], 'Nutrisi Pediatrik', 30], [userIds[1], 'Imunisasi', 25], [userIds[1], 'PALS', 20],
  // Dr. Hendra
  [userIds[2], 'USG 4D', 50], [userIds[2], 'Kehamilan Risiko Tinggi', 42], [userIds[2], 'Fetomaternal', 35],
  // Dr. Siti
  [userIds[3], 'Kesehatan Masyarakat', 15], [userIds[3], 'Imunisasi', 12], [userIds[3], 'Posbindu PTM', 10],
  // Dr. Budi
  [userIds[4], 'Manajemen Puskesmas', 20], [userIds[4], 'TB-HIV', 18], [userIds[4], 'Kesehatan Pelayaran', 12],
  // Ns. Dewi
  [userIds[5], 'BTCLS', 22], [userIds[5], 'ACLS', 20], [userIds[5], 'Ventilator Management', 18], [userIds[5], 'Hemodinamik', 15],
  // Ns. Rizky
  [userIds[6], 'Triase', 25], [userIds[6], 'BTCLS', 22], [userIds[6], 'ACLS', 18], [userIds[6], 'Disaster Response', 15],
  // Ns. Maya
  [userIds[7], 'Asuhan Neonatal', 20], [userIds[7], 'Perawatan Maternitas', 18], [userIds[7], 'Laktasi', 15],
  // Bd. Rina
  [userIds[8], 'ANC Terpadu', 12], [userIds[8], 'Persalinan Normal', 15], [userIds[8], 'KB Pascasalin', 10],
  // Bd. Lestari
  [userIds[9], 'Konseling Laktasi', 25], [userIds[9], 'Perawatan Neonatal', 20], [userIds[9], 'ANC', 18],
  // Apt. Farhan
  [userIds[10], 'Farmasi Klinis', 15], [userIds[10], 'Manajemen Obat', 12], [userIds[10], 'Pharmacovigilance', 10],
  // Ft. Agung
  [userIds[11], 'Terapi Manual', 22], [userIds[11], 'Rehabilitasi Ortopedi', 20], [userIds[11], 'Cedera Olahraga', 18],
  // Psi. Anita
  [userIds[12], 'CBT', 25], [userIds[12], 'EMDR', 20], [userIds[12], 'Psikometri', 15],
  // drg. Indah
  [userIds[13], 'Estetika Dental', 18], [userIds[13], 'Endodontik', 15], [userIds[13], 'Scaling & Root Planing', 12],
  // drg. Fajar
  [userIds[14], 'Ortodonsi Digital', 30], [userIds[14], 'Aligner', 25], [userIds[14], 'Bracket', 28],
];

for (const skill of skillsData) {
  insertSkill.run(...skill);
}

// ===== POSTS =====
console.log('Seeding posts...');
const postsData = [
  [userIds[0], 'Baru saja menyelesaikan prosedur PCI kompleks pada pasien dengan triple vessel disease. Tim katlab RSCM bekerja sangat baik! Reminder: chest pain dengan onset <12 jam adalah golden period untuk intervensi. #Kardiologi #RSCM', 23, '2024-01-15 09:30:00'],
  [userIds[1], 'Penting untuk orang tua: jadwal imunisasi anak harus tepat waktu. Jangan tunda karena mitos yang beredar. Vaksinasi adalah cara terbaik melindungi buah hati Anda. Konsultasikan ke dokter anak terdekat. #ImunisasiAnak', 45, '2024-01-14 14:00:00'],
  [userIds[3], 'Hari ini kunjungan posyandu lansia di wilayah kerja Puskesmas Cikutra. Deteksi dini hipertensi dan diabetes sangat penting untuk mencegah komplikasi. Mari jaga kesehatan sejak dini! #PromosiKesehatan', 12, '2024-01-13 10:00:00'],
  [userIds[5], 'Tips untuk sesama perawat ICU: selalu monitoring hemodinamik secara ketat pada pasien post cardiac surgery. Early warning score sangat membantu dalam deteksi dini perburukan. Stay vigilant! #NursingICU', 18, '2024-01-12 16:00:00'],
  [userIds[8], 'Edukasi kepada ibu hamil tentang tanda bahaya kehamilan sangat krusial. Jika mengalami perdarahan, sakit kepala hebat, atau pandangan kabur, segera ke faskes terdekat. #KehamilanSehat', 15, '2024-01-11 11:00:00'],
  [userIds[11], 'Pasien post TKR (Total Knee Replacement) hari ke-3 sudah bisa jalan dengan walker. Rehabilitasi dini sangat penting untuk pemulihan optimal. Semangat untuk semua pasien ortopedi! #Fisioterapi', 20, '2024-01-10 13:30:00'],
  [userIds[12], 'Mental health awareness: tidak ada salahnya meminta bantuan profesional. Kecemasan dan depresi bisa ditangani dengan baik melalui terapi yang tepat. Jangan ragu berkonsultasi. #KesehatanMental', 35, '2024-01-09 15:00:00'],
  [userIds[14], 'Presentasi hasil penelitian tentang digital orthodontics di Kongres PDGI. Teknologi aligner semakin berkembang dan memberikan pilihan treatment yang lebih nyaman untuk pasien. #Ortodonsi', 28, '2024-01-08 09:00:00'],
];

for (const post of postsData) {
  insertPost.run(...post);
}

// ===== CONNECTIONS =====
console.log('Seeding connections...');
const connectionsData = [
  [userIds[0], userIds[1], 'accepted'],
  [userIds[0], userIds[2], 'accepted'],
  [userIds[0], userIds[5], 'accepted'],
  [userIds[1], userIds[3], 'accepted'],
  [userIds[1], userIds[7], 'accepted'],
  [userIds[2], userIds[8], 'accepted'],
  [userIds[3], userIds[4], 'accepted'],
  [userIds[5], userIds[6], 'accepted'],
  [userIds[5], userIds[7], 'accepted'],
  [userIds[9], userIds[8], 'accepted'],
  [userIds[10], userIds[11], 'accepted'],
  [userIds[13], userIds[14], 'accepted'],
  [userIds[12], userIds[1], 'accepted'],
  [userIds[6], userIds[7], 'pending'],
  [userIds[10], userIds[0], 'pending'],
];

for (const conn of connectionsData) {
  insertConnection.run(...conn);
}

// ===== JOBS =====
console.log('Seeding jobs...');
const jobsData = [
  [
    userIds[0], 'Dokter Spesialis Jantung dan Pembuluh Darah',
    'RS Hermina Bekasi', 'RS Tipe B', 'Bekasi', 'Jawa Barat',
    'Dokter Spesialis', 'Sp.JP', 'Tetap',
    35000000, 60000000, 1,
    'Dibutuhkan Dokter Spesialis Jantung dan Pembuluh Darah untuk bergabung dengan tim kardiologi RS Hermina Bekasi. Bertanggung jawab atas pelayanan rawat jalan dan rawat inap kardiologi, prosedur diagnostik non-invasif, serta konsultasi antar bagian.',
    '- STR dan SIP aktif\n- Pengalaman minimal 2 tahun\n- Sertifikat ACLS\n- Mampu melakukan ekokardiografi\n- Bersedia on-call',
  ],
  [
    userIds[4], 'Dokter Umum Puskesmas',
    'Puskesmas Kecamatan Cilincing', 'Puskesmas', 'Jakarta Utara', 'DKI Jakarta',
    'Dokter Umum', null, 'BLUD',
    12000000, 18000000, 1,
    'Puskesmas Kecamatan Cilincing membuka lowongan untuk Dokter Umum dengan status BLUD. Bertanggung jawab atas pelayanan kesehatan dasar, program promotif-preventif, dan pengelolaan program kesehatan wilayah.',
    '- STR aktif\n- Sertifikat ATLS/ACLS diutamakan\n- Pengalaman di Puskesmas diutamakan\n- Bersedia ditempatkan di Jakarta Utara\n- Mampu bekerja dalam tim',
  ],
  [
    userIds[5], 'Perawat ICU',
    'RS Mayapada Tangerang', 'RS Tipe B', 'Tangerang', 'Banten',
    'Ners (S1+Profesi)', null, 'Kontrak',
    8000000, 12000000, 1,
    'RS Mayapada Tangerang membutuhkan Perawat ICU untuk unit perawatan intensif dewasa. Harus mampu mengoperasikan ventilator, monitoring hemodinamik, dan memberikan asuhan keperawatan intensif.',
    '- Ners (S1 + Profesi)\n- STR aktif\n- Sertifikat BTCLS dan ACLS\n- Pengalaman ICU minimal 1 tahun\n- Bersedia shift',
  ],
  [
    userIds[9], 'Bidan Klinik Pratama',
    'Klinik Pratama Sehat Ibu dan Anak', 'Klinik Pratama', 'Sleman', 'DI Yogyakarta',
    'Bidan Ahli (D4/S1)', null, 'Tetap',
    5500000, 8000000, 1,
    'Dibutuhkan Bidan untuk pelayanan ANC, pertolongan persalinan, dan pelayanan KB di Klinik Pratama. Lingkungan kerja nyaman dengan fasilitas memadai.',
    '- D4/S1 Kebidanan\n- STR dan SIP aktif\n- Pengalaman minimal 1 tahun\n- Sertifikat APN\n- Ramah dan komunikatif',
  ],
  [
    userIds[10], 'Apoteker Rumah Sakit',
    'RS Islam Jakarta Cempaka Putih', 'RS Tipe B', 'Jakarta Pusat', 'DKI Jakarta',
    'Apoteker', null, 'Tetap',
    10000000, 15000000, 1,
    'RS Islam Jakarta membutuhkan Apoteker untuk instalasi farmasi rumah sakit. Bertanggung jawab atas dispensing, clinical pharmacy, dan medication safety.',
    '- Profesi Apoteker\n- STR dan SIPA aktif\n- Pengalaman di RS minimal 1 tahun\n- Memahami sistem formularium\n- Terampil menggunakan SIMRS',
  ],
];

for (const job of jobsData) {
  insertJob.run(...job);
}

console.log('\n✅ Seed berhasil! Database telah diisi dengan:');
console.log(`   - ${users.length} pengguna`);
console.log(`   - ${experiences.length} pengalaman kerja`);
console.log(`   - ${educationData.length} pendidikan`);
console.log(`   - ${skillsData.length} keahlian`);
console.log(`   - ${postsData.length} postingan`);
console.log(`   - ${connectionsData.length} koneksi`);
console.log(`   - ${jobsData.length} lowongan kerja`);
console.log('\n   Semua password: password123');

db.close();
