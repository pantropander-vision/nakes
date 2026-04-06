const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'nakes.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Ensure employer columns exist
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

// Clean up existing employer data
db.exec("DELETE FROM saved_candidates");
db.exec("DELETE FROM job_applications");
db.exec("DELETE FROM users WHERE account_type = 'employer'");

console.log('Seeding employer accounts...');

const insertEmployer = db.prepare(`
  INSERT INTO users (username, email, password, full_name, profession_type, province, kota, phone, bio, account_type, employer_facility_name, employer_facility_type, employer_description, employer_website, employer_size)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'employer', ?, ?, ?, ?, ?)
`);

const employers = [
  {
    username: 'rscm_hrd', email: 'rscm@nakes.id', full_name: 'HRD RSUPN RSCM',
    profession_type: 'Pemberi Kerja', province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    phone: '021-3923456', bio: 'Divisi SDM RSUPN Dr. Cipto Mangunkusumo',
    employer_facility_name: 'RSUPN Dr. Cipto Mangunkusumo',
    employer_facility_type: 'RS Tipe A',
    employer_description: 'Rumah Sakit Umum Pusat Nasional Dr. Cipto Mangunkusumo adalah rumah sakit rujukan nasional tipe A yang berlokasi di Jakarta Pusat. Sebagai RS pendidikan utama FK UI, RSCM menyediakan layanan kesehatan komprehensif dan menjadi pusat penelitian medis terdepan di Indonesia.',
    employer_website: 'https://www.rscm.co.id',
    employer_size: '500+',
  },
  {
    username: 'siloam_hrd', email: 'siloam@nakes.id', full_name: 'HRD Siloam Hospitals',
    profession_type: 'Pemberi Kerja', province: 'DKI Jakarta', kota: 'Jakarta Selatan',
    phone: '021-29308888', bio: 'Divisi Human Capital Siloam Hospitals Group',
    employer_facility_name: 'Siloam Hospitals Group',
    employer_facility_type: 'RS Tipe A',
    employer_description: 'Siloam Hospitals adalah jaringan rumah sakit swasta terbesar di Indonesia dengan 41 rumah sakit di 28 kota. Menyediakan layanan kesehatan berkualitas internasional dengan standar JCI dan teknologi terkini.',
    employer_website: 'https://www.siloamhospitals.com',
    employer_size: '500+',
  },
  {
    username: 'prodia_hrd', email: 'prodia@nakes.id', full_name: 'HRD Prodia',
    profession_type: 'Pemberi Kerja', province: 'DKI Jakarta', kota: 'Jakarta Pusat',
    phone: '021-31936188', bio: 'Divisi SDM PT Prodia Widyahusada Tbk',
    employer_facility_name: 'Prodia Widyahusada',
    employer_facility_type: 'Klinik Utama',
    employer_description: 'Prodia adalah laboratorium klinik terbesar di Indonesia dengan lebih dari 270 outlet di seluruh Indonesia. Menyediakan layanan pemeriksaan laboratorium lengkap dengan standar mutu internasional ISO 15189.',
    employer_website: 'https://www.prodia.co.id',
    employer_size: '500+',
  },
];

const employerIds = [];
for (const emp of employers) {
  const result = insertEmployer.run(
    emp.username, emp.email, hashedPassword, emp.full_name, emp.profession_type,
    emp.province, emp.kota, emp.phone, emp.bio,
    emp.employer_facility_name, emp.employer_facility_type, emp.employer_description,
    emp.employer_website, emp.employer_size
  );
  employerIds.push(result.lastInsertRowid);
  console.log(`  + ${emp.employer_facility_name} (${emp.email})`);
}

// Get existing nakes user IDs for applications
const nakesUsers = db.prepare("SELECT id, full_name FROM users WHERE account_type = 'nakes' OR account_type IS NULL LIMIT 10").all();

console.log('\nSeeding employer job postings...');

const insertJob = db.prepare(`
  INSERT INTO jobs (posted_by, title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = new Date();
const daysAgo = (n) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

// RSCM Jobs
const rscmJobs = [
  insertJob.run(
    employerIds[0], 'Dokter Spesialis Penyakit Dalam',
    'RSUPN Dr. Cipto Mangunkusumo', 'RS Tipe A', 'Jakarta Pusat', 'DKI Jakarta',
    'Dokter Spesialis', 'Sp.PD', 'Tetap',
    40000000, 70000000, 1,
    'RSCM membuka lowongan untuk Dokter Spesialis Penyakit Dalam. Bergabung dengan tim internist terbaik di rumah sakit rujukan nasional. Kesempatan untuk terlibat dalam penelitian klinis dan pendidikan kedokteran.',
    '- STR dan SIP aktif\n- Lulusan program spesialis terakreditasi\n- Pengalaman minimal 3 tahun\n- Publikasi ilmiah diutamakan\n- Mampu bekerja dalam tim multidisiplin',
    daysAgo(5)
  ),
  insertJob.run(
    employerIds[0], 'Perawat ICU Dewasa',
    'RSUPN Dr. Cipto Mangunkusumo', 'RS Tipe A', 'Jakarta Pusat', 'DKI Jakarta',
    'Ners (S1+Profesi)', null, 'Kontrak',
    10000000, 15000000, 1,
    'Dibutuhkan Perawat ICU untuk unit perawatan intensif dewasa RSCM. Menangani pasien kritis dengan berbagai kasus kompleks. Kesempatan pengembangan karir dan pelatihan berkelanjutan.',
    '- Ners (S1 + Profesi)\n- STR aktif\n- Sertifikat BTCLS dan ACLS wajib\n- Pengalaman ICU minimal 2 tahun\n- Mampu mengoperasikan ventilator dan monitoring invasif',
    daysAgo(3)
  ),
  insertJob.run(
    employerIds[0], 'Apoteker Klinis',
    'RSUPN Dr. Cipto Mangunkusumo', 'RS Tipe A', 'Jakarta Pusat', 'DKI Jakarta',
    'Apoteker', null, 'Tetap',
    12000000, 18000000, 1,
    'RSCM membutuhkan Apoteker Klinis untuk instalasi farmasi. Bertanggung jawab atas clinical pharmacy service, medication reconciliation, dan drug information service.',
    '- Profesi Apoteker\n- STR dan SIPA aktif\n- S2 Farmasi Klinis diutamakan\n- Pengalaman di RS tipe A minimal 1 tahun\n- Sertifikat pelatihan farmasi klinis',
    daysAgo(7)
  ),
];

// Siloam Jobs
const siloamJobs = [
  insertJob.run(
    employerIds[1], 'Dokter Umum IGD',
    'RS Siloam Semanggi', 'RS Tipe A', 'Jakarta Selatan', 'DKI Jakarta',
    'Dokter Umum', null, 'Kontrak',
    20000000, 30000000, 1,
    'Siloam Hospitals Semanggi membuka lowongan Dokter Umum untuk instalasi gawat darurat 24 jam. Sistem kerja shift dengan kompensasi kompetitif dan benefit lengkap.',
    '- STR aktif\n- Sertifikat ATLS dan ACLS wajib\n- Pengalaman IGD minimal 1 tahun\n- Mampu berkomunikasi dalam Bahasa Inggris\n- Bersedia kerja shift',
    daysAgo(2)
  ),
  insertJob.run(
    employerIds[1], 'Dokter Spesialis Anak',
    'RS Siloam Kebon Jeruk', 'RS Tipe B', 'Jakarta Barat', 'DKI Jakarta',
    'Dokter Spesialis', 'Sp.A', 'Tetap',
    45000000, 75000000, 1,
    'Siloam Hospitals Kebon Jeruk membutuhkan Dokter Spesialis Anak untuk memperkuat layanan pediatrik. Fasilitas lengkap termasuk NICU dan PICU.',
    '- STR dan SIP aktif\n- Board certified Sp.A\n- Pengalaman minimal 3 tahun\n- Subspesialis diutamakan\n- Bersedia on-call',
    daysAgo(4)
  ),
  insertJob.run(
    employerIds[1], 'Bidan Kamar Bersalin',
    'RS Siloam Surabaya', 'RS Tipe B', 'Surabaya', 'Jawa Timur',
    'Bidan Ahli (D4/S1)', null, 'Tetap',
    7000000, 10000000, 1,
    'RS Siloam Surabaya membutuhkan Bidan untuk kamar bersalin. Menangani persalinan normal dan asistensi operasi sectio caesarea.',
    '- D4/S1 Kebidanan\n- STR dan SIP aktif\n- Sertifikat APN\n- Pengalaman di kamar bersalin minimal 1 tahun\n- Bersedia shift',
    daysAgo(6)
  ),
  insertJob.run(
    employerIds[1], 'Fisioterapis Rehabilitasi',
    'RS Siloam Semanggi', 'RS Tipe A', 'Jakarta Selatan', 'DKI Jakarta',
    'Fisioterapis', null, 'Kontrak',
    8000000, 12000000, 1,
    'Unit Rehabilitasi Medik RS Siloam Semanggi membutuhkan Fisioterapis untuk layanan rehabilitasi muskuloskeletal dan neurologis.',
    '- S1 Fisioterapi\n- STR aktif\n- Pengalaman minimal 1 tahun\n- Sertifikasi McKenzie/Manual Therapy diutamakan',
    daysAgo(1)
  ),
];

// Prodia Jobs
const prodiaJobs = [
  insertJob.run(
    employerIds[2], 'Analis Kesehatan / Teknisi Lab',
    'Prodia Lab Jakarta Kramat', 'Klinik Utama', 'Jakarta Pusat', 'DKI Jakarta',
    'Analis Kesehatan', null, 'Tetap',
    7000000, 10000000, 1,
    'Prodia Widyahusada membuka lowongan Analis Kesehatan untuk laboratorium pusat Jakarta. Menangani pemeriksaan hematologi, kimia klinik, dan immunoserologi.',
    '- D3/S1 Analis Kesehatan/Teknologi Laboratorium Medik\n- STR aktif\n- Pengalaman di laboratorium klinik minimal 1 tahun\n- Memahami prosedur mutu ISO 15189\n- Teliti dan detail oriented',
    daysAgo(3)
  ),
  insertJob.run(
    employerIds[2], 'Dokter Umum Klinik',
    'Prodia Clinic Surabaya', 'Klinik Utama', 'Surabaya', 'Jawa Timur',
    'Dokter Umum', null, 'Paruh Waktu',
    8000000, 12000000, 1,
    'Prodia Clinic Surabaya membutuhkan Dokter Umum untuk pelayanan medical check-up dan konsultasi kesehatan. Jam kerja fleksibel.',
    '- STR aktif\n- Pengalaman MCU diutamakan\n- Mampu interpretasi hasil laboratorium\n- Komunikatif dan ramah\n- Bersedia kerja weekend',
    daysAgo(8)
  ),
  insertJob.run(
    employerIds[2], 'Perawat Phlebotomist',
    'Prodia Lab Bandung', 'Klinik Utama', 'Bandung', 'Jawa Barat',
    'Ners (S1+Profesi)', null, 'Kontrak',
    5500000, 8000000, 1,
    'Prodia Bandung membutuhkan Perawat untuk pelayanan pengambilan sampel darah (phlebotomy) dan pelayanan pasien.',
    '- D3 Keperawatan / Ners\n- STR aktif\n- Sertifikat Phlebotomy diutamakan\n- Pengalaman minimal 6 bulan\n- Teliti dan memiliki empati tinggi',
    daysAgo(10)
  ),
];

// Collect all job IDs
const allJobIds = [
  ...rscmJobs.map(r => r.lastInsertRowid),
  ...siloamJobs.map(r => r.lastInsertRowid),
  ...prodiaJobs.map(r => r.lastInsertRowid),
];

console.log(`  + ${allJobIds.length} lowongan dari 3 employer`);

// Seed job applications
console.log('\nSeeding job applications...');
const insertApplication = db.prepare(`
  INSERT OR IGNORE INTO job_applications (job_id, applicant_id, status, cover_letter, applied_at)
  VALUES (?, ?, ?, ?, ?)
`);

const statuses = ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'];
const coverLetters = [
  'Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.',
  'Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.',
  'Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.',
  null,
  'Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.',
];

let appCount = 0;
if (nakesUsers.length > 0) {
  // Distribute applications across jobs
  for (let i = 0; i < allJobIds.length; i++) {
    const jobId = allJobIds[i];
    // Each job gets 2-4 applicants
    const numApplicants = 2 + (i % 3);
    for (let j = 0; j < numApplicants && j < nakesUsers.length; j++) {
      const applicantIdx = (i + j) % nakesUsers.length;
      const status = statuses[(i + j) % statuses.length];
      const cover = coverLetters[(i + j) % coverLetters.length];
      const appliedAt = daysAgo(Math.floor(Math.random() * 14) + 1);
      try {
        insertApplication.run(jobId, nakesUsers[applicantIdx].id, status, cover, appliedAt);
        appCount++;
      } catch {}
    }
  }
}
console.log(`  + ${appCount} lamaran`);

// Seed saved candidates
console.log('\nSeeding saved candidates...');
const insertSaved = db.prepare(`
  INSERT OR IGNORE INTO saved_candidates (employer_id, candidate_id, notes)
  VALUES (?, ?, ?)
`);

let savedCount = 0;
if (nakesUsers.length >= 3) {
  const safeIdx = (i) => nakesUsers[i % nakesUsers.length];
  // RSCM saves some candidates
  insertSaved.run(employerIds[0], safeIdx(0).id, 'Kandidat kuat untuk posisi spesialis');
  insertSaved.run(employerIds[0], safeIdx(5).id, 'Perawat ICU berpengalaman');
  insertSaved.run(employerIds[0], safeIdx(2).id, 'Apoteker potensial');
  savedCount += 3;

  // Siloam saves some candidates
  insertSaved.run(employerIds[1], safeIdx(1).id, 'Sp.A berkualitas');
  insertSaved.run(employerIds[1], safeIdx(6).id, 'Perawat IGD kompeten');
  insertSaved.run(employerIds[1], safeIdx(8).id, 'Bidan berpengalaman');
  insertSaved.run(employerIds[1], safeIdx(4).id, 'Fisioterapis terampil');
  savedCount += 4;

  // Prodia saves some candidates
  insertSaved.run(employerIds[2], safeIdx(3).id, 'Dokter umum untuk MCU');
  insertSaved.run(employerIds[2], safeIdx(7).id, 'Perawat untuk phlebotomy');
  savedCount += 2;
}
console.log(`  + ${savedCount} kandidat tersimpan`);

console.log('\n✅ Seed employer berhasil!');
console.log(`   - 3 akun employer`);
console.log(`   - ${allJobIds.length} lowongan kerja`);
console.log(`   - ${appCount} lamaran`);
console.log(`   - ${savedCount} kandidat tersimpan`);
console.log('\n   Login employer:');
console.log('   - rscm@nakes.id / password123');
console.log('   - siloam@nakes.id / password123');
console.log('   - prodia@nakes.id / password123');

db.close();
