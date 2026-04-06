PRAGMA foreign_keys=OFF;
CREATE TABLE users (
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
  , account_type TEXT DEFAULT 'nakes', employer_facility_name TEXT, employer_facility_type TEXT, employer_description TEXT, employer_website TEXT, employer_size TEXT);
INSERT INTO users VALUES(1,'dr.arief.jp','arief.cardio@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','dr. Arief Wibowo, Sp.JP, FIHA','Dokter Spesialis','Sp.JP',NULL,'STR-31-2024-00145','2029-03-15','Aktif','SIP-DKI-445/2024','RSUPN Dr. Cipto Mangunkusumo',185,'IDI','DKI Jakarta','Jakarta Pusat','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Dokter Spesialis Jantung dan Pembuluh Darah dengan pengalaman 12 tahun. Fokus pada intervensi koroner perkutan dan elektrofisiologi. Aktif dalam penelitian klinis kardiovaskular di RSCM.',NULL,'081234567001','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(2,'dr.putri.spa','putri.anak@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','dr. Putri Maharani, Sp.A, M.Kes','Dokter Spesialis','Sp.A',NULL,'STR-31-2023-00892','2028-07-20','Aktif','SIP-DKI-1122/2023','RS Siloam Semanggi',210,'IDI','DKI Jakarta','Jakarta Selatan','RS Siloam Semanggi','RS Tipe A','Dokter Spesialis Anak dengan keahlian di bidang tumbuh kembang anak dan nutrisi pediatrik. Lulusan terbaik FK UI 2012. Aktif memberikan edukasi kesehatan anak melalui media sosial.',NULL,'081234567002','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(3,'dr.hendra.spog','hendra.obgyn@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','dr. Hendra Gunawan, Sp.OG(K)','Dokter Spesialis','Sp.OG',NULL,'STR-31-2022-01567','2027-11-10','Aktif','SIP-DKI-2234/2022','RS Bunda Menteng',245,'IDI','DKI Jakarta','Jakarta Pusat','RS Bunda Menteng','RS Tipe B','Konsultan Fetomaternal dengan pengalaman 15 tahun menangani kehamilan risiko tinggi. Pioneer program USG 4D di Indonesia. Dosen FK Universitas Indonesia.',NULL,'081234567003','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(4,'dr.siti.umum','siti.umum@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','dr. Siti Nurhaliza','Dokter Umum',NULL,NULL,'STR-32-2023-03421','2028-05-01','Aktif','SIP-JABAR-567/2023','Puskesmas Cikutra Bandung',95,'IDI','Jawa Barat','Bandung','Puskesmas Cikutra','Puskesmas','Dokter umum Puskesmas dengan passion di bidang kesehatan masyarakat dan program imunisasi. Koordinator program Posbindu PTM Kota Bandung.',NULL,'081234567004','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(5,'dr.budi.umum','budi.umum@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','dr. Budi Santoso, M.Kes','Dokter Umum',NULL,NULL,'STR-35-2024-01234','2029-01-20','Aktif','SIP-JATIM-890/2024','Puskesmas Tanjung Perak Surabaya',120,'IDI','Jawa Timur','Surabaya','Puskesmas Tanjung Perak','Puskesmas','Kepala Puskesmas Tanjung Perak. Berpengalaman 8 tahun di pelayanan primer. Fokus pada program TB-HIV dan kesehatan pelayaran.',NULL,'081234567005','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(6,'ns.dewi.icu','dewi.icu@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Ns. Dewi Anggraini, S.Kep','Ners (S1+Profesi)',NULL,'Ners (S1+Profesi)','STR-31-2023-07891','2028-09-15','Aktif','SIP-DKI-3345/2023','RSUPN Dr. Cipto Mangunkusumo',75,'PPNI','DKI Jakarta','Jakarta Pusat','RSUPN Dr. Cipto Mangunkusumo - ICU','RS Tipe A','Perawat ICU dengan sertifikasi BTCLS dan ACLS. 6 tahun pengalaman di unit perawatan intensif. Aktif dalam tim Code Blue RSCM.',NULL,'081234567006','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(7,'ns.rizky.igd','rizky.igd@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Ns. Rizky Pratama, S.Kep','Ners (S1+Profesi)',NULL,'Ners (S1+Profesi)','STR-31-2024-04567','2029-02-28','Aktif','SIP-DKI-4456/2024','RSUP Fatmawati',60,'PPNI','DKI Jakarta','Jakarta Selatan','RSUP Fatmawati - IGD','RS Tipe A','Emergency Nurse dengan sertifikasi BTCLS, ACLS, dan Triage. Koordinator pelatihan triase IGD. Anggota Tim Disaster Response RSUP Fatmawati.',NULL,'081234567007','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(8,'ns.maya.mat','maya.maternitas@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Ns. Maya Sari, S.Kep, Ners','Ners (S1+Profesi)',NULL,'Ners (S1+Profesi)','STR-31-2023-08234','2028-12-01','Aktif','SIP-DKI-5567/2023','RS Jantung dan Pembuluh Darah Harapan Kita',85,'PPNI','DKI Jakarta','Jakarta Barat','RS Harapan Kita - Maternitas','RS Tipe A','Perawat maternitas berpengalaman dengan sertifikasi asuhan neonatal. Fokus pada perawatan ibu dan bayi pasca operasi jantung saat kehamilan.',NULL,'081234567008','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(9,'bd.rina.ahli','rina.bidan@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Bd. Rina Wulandari, S.Tr.Keb','Bidan Ahli (D4/S1)',NULL,NULL,'STR-31-2024-09876','2029-06-30','Aktif','SIP-DKI-6678/2024','Klinik Pratama Bunda Sehat Jakarta',55,'IBI','DKI Jakarta','Jakarta Timur','Klinik Pratama Bunda Sehat','Klinik Pratama','Bidan Ahli dengan 5 tahun pengalaman. Kompeten dalam ANC terpadu, persalinan normal, dan KB pascasalin. Aktif dalam program Kelas Ibu Hamil.',NULL,'081234567009','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(10,'bd.lestari.yogya','lestari.bidan@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Bd. Lestari Handayani, S.Tr.Keb','Bidan Ahli (D4/S1)',NULL,NULL,'STR-34-2023-05432','2028-08-15','Aktif','SIP-DIY-789/2023','Klinik Pratama Ibu dan Anak Yogyakarta',70,'IBI','DI Yogyakarta','Yogyakarta','Klinik Pratama Ibu dan Anak Yogyakarta','Klinik Pratama','Bidan senior dengan keahlian di bidang laktasi dan perawatan neonatal. Konselor menyusui bersertifikat. Pengurus IBI Cabang Yogyakarta.',NULL,'081234567010','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(11,'apt.farhan','farhan.apoteker@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Apt. Farhan Maulana, S.Farm','Apoteker',NULL,NULL,'STR-36-2024-02345','2029-04-10','Aktif','SIP-BTN-234/2024','RS Tipe C Kota Tangerang',45,'IAI','Banten','Tangerang','RS Tipe C Kota Tangerang','RS Tipe C','Apoteker rumah sakit dengan keahlian di farmasi klinis dan manajemen obat. Bertanggung jawab atas formularium RS dan program pharmacovigilance.',NULL,'081234567011','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(12,'ft.agung','agung.fisio@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Agung Prasetyo, S.Ft','Fisioterapis',NULL,NULL,'STR-33-2023-06789','2028-10-20','Aktif','SIP-JATENG-456/2023','RS Ortopedi Prof. Dr. R. Soeharso Surakarta',65,NULL,'Jawa Tengah','Surakarta','RS Ortopedi Prof. Dr. R. Soeharso Surakarta','RS Tipe A','Fisioterapis ortopedi dengan 7 tahun pengalaman rehabilitasi pasca operasi. Spesialis terapi manual dan rehabilitasi cedera olahraga.',NULL,'081234567012','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(13,'psi.anita','anita.psikolog@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','Anita Kusuma, M.Psi, Psikolog','Psikolog Klinis',NULL,NULL,'STR-31-2024-11234','2029-08-25','Aktif','SIP-DKI-7789/2024','Klinik Jiwa Harmoni Jakarta',40,NULL,'DKI Jakarta','Jakarta Selatan','Klinik Jiwa Harmoni','Klinik Utama','Psikolog Klinis dengan keahlian CBT dan EMDR. Fokus pada gangguan kecemasan, depresi, dan trauma. Supervisor klinis untuk psikolog muda.',NULL,'081234567013','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(14,'drg.indah','indah.gigi@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','drg. Indah Permata Sari','Dokter Gigi',NULL,NULL,'STR-31-2023-12567','2028-04-15','Aktif','SIP-DKI-8890/2023','Klinik Gigi Senyum Cerah Jakarta',80,NULL,'DKI Jakarta','Jakarta Utara','Klinik Gigi Senyum Cerah','Klinik Pratama','Dokter gigi umum dengan keahlian di estetika dental dan perawatan endodontik. 5 tahun pengalaman praktik mandiri dan klinik.',NULL,'081234567014','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(15,'drg.fajar.spbm','fajar.ortho@nakes.id','$2b$10$2.tD.OGwfgZFUOMclaH37.d/NuKL3aF9mpIm1qbboQxoVvgYlls7G','drg. Fajar Nugroho, Sp.Ort','Dokter Gigi Spesialis','Ortodonsi',NULL,'STR-31-2024-13890','2029-11-30','Aktif','SIP-DKI-9901/2024','RS Gigi dan Mulut FKG UI',150,NULL,'DKI Jakarta','Jakarta Pusat','RS Gigi dan Mulut FKG UI','RS Tipe A','Spesialis Ortodonsi dengan keahlian di perawatan maloklusi dan aligner. Dosen tetap FKG Universitas Indonesia. Peneliti aktif di bidang ortodonsi digital.',NULL,'081234567015','2026-04-03 21:53:10','2026-04-03 21:53:10','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(16,'rscm_hrd','rscm@nakes.id','$2b$10$0tzqXPq12YBLp/H/8fXOZOzZaMoHXg4j6ds2oSabH2lf/7LMQjhxy','HRD RSUPN RSCM','Pemberi Kerja',NULL,NULL,NULL,NULL,'Aktif',NULL,NULL,0,NULL,'DKI Jakarta','Jakarta Pusat',NULL,NULL,'Divisi SDM RSUPN Dr. Cipto Mangunkusumo',NULL,'021-3923456','2026-04-03 21:53:13','2026-04-03 21:53:13','employer','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Rumah Sakit Umum Pusat Nasional Dr. Cipto Mangunkusumo adalah rumah sakit rujukan nasional tipe A yang berlokasi di Jakarta Pusat. Sebagai RS pendidikan utama FK UI, RSCM menyediakan layanan kesehatan komprehensif dan menjadi pusat penelitian medis terdepan di Indonesia.','https://www.rscm.co.id','500+');
INSERT INTO users VALUES(17,'siloam_hrd','siloam@nakes.id','$2b$10$0tzqXPq12YBLp/H/8fXOZOzZaMoHXg4j6ds2oSabH2lf/7LMQjhxy','HRD Siloam Hospitals','Pemberi Kerja',NULL,NULL,NULL,NULL,'Aktif',NULL,NULL,0,NULL,'DKI Jakarta','Jakarta Selatan',NULL,NULL,'Divisi Human Capital Siloam Hospitals Group',NULL,'021-29308888','2026-04-03 21:53:13','2026-04-03 21:53:13','employer','Siloam Hospitals Group','RS Tipe A','Siloam Hospitals adalah jaringan rumah sakit swasta terbesar di Indonesia dengan 41 rumah sakit di 28 kota. Menyediakan layanan kesehatan berkualitas internasional dengan standar JCI dan teknologi terkini.','https://www.siloamhospitals.com','500+');
INSERT INTO users VALUES(18,'prodia_hrd','prodia@nakes.id','$2b$10$0tzqXPq12YBLp/H/8fXOZOzZaMoHXg4j6ds2oSabH2lf/7LMQjhxy','HRD Prodia','Pemberi Kerja',NULL,NULL,NULL,NULL,'Aktif',NULL,NULL,0,NULL,'DKI Jakarta','Jakarta Pusat',NULL,NULL,'Divisi SDM PT Prodia Widyahusada Tbk',NULL,'021-31936188','2026-04-03 21:53:13','2026-04-03 21:53:13','employer','Prodia Widyahusada','Klinik Utama','Prodia adalah laboratorium klinik terbesar di Indonesia dengan lebih dari 270 outlet di seluruh Indonesia. Menyediakan layanan pemeriksaan laboratorium lengkap dengan standar mutu internasional ISO 15189.','https://www.prodia.co.id','500+');
INSERT INTO users VALUES(19,'Nurdiansyah','iandelsyah89@gmail.com','$2b$10$6dxO4i/XX2aJR6yeUpBhKuwxbu26jI6IXm.RltPqyQLgN04g50dlm','Nurdiansyah','Ners (S1+Profesi)',NULL,NULL,NULL,'2031-04-03','Aktif',NULL,NULL,0,NULL,'DKI Jakarta',NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-04 14:30:14','2026-04-04 14:30:14','nakes',NULL,NULL,NULL,NULL,NULL);
INSERT INTO users VALUES(20,'yudi.chandra','yudi.chandra0904@gmail.com','$2b$10$j7RhfqVJ71KrYo9mRYdPceXwdpInuqRrWc7a7SFBMHRUFurezBJ1K','Yudi Chandra','Ners (S1+Profesi)',NULL,NULL,NULL,'2031-04-05','Aktif',NULL,NULL,0,NULL,'Jawa Barat',NULL,NULL,NULL,NULL,NULL,NULL,'2026-04-06 03:21:21','2026-04-06 03:21:21','nakes',NULL,NULL,NULL,NULL,NULL);
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
INSERT INTO posts VALUES(1,1,'Baru saja menyelesaikan prosedur PCI kompleks pada pasien dengan triple vessel disease. Tim katlab RSCM bekerja sangat baik! Reminder: chest pain dengan onset <12 jam adalah golden period untuk intervensi. #Kardiologi #RSCM',NULL,23,0,'2024-01-15 09:30:00');
INSERT INTO posts VALUES(2,2,'Penting untuk orang tua: jadwal imunisasi anak harus tepat waktu. Jangan tunda karena mitos yang beredar. Vaksinasi adalah cara terbaik melindungi buah hati Anda. Konsultasikan ke dokter anak terdekat. #ImunisasiAnak',NULL,45,0,'2024-01-14 14:00:00');
INSERT INTO posts VALUES(3,4,'Hari ini kunjungan posyandu lansia di wilayah kerja Puskesmas Cikutra. Deteksi dini hipertensi dan diabetes sangat penting untuk mencegah komplikasi. Mari jaga kesehatan sejak dini! #PromosiKesehatan',NULL,12,0,'2024-01-13 10:00:00');
INSERT INTO posts VALUES(4,6,'Tips untuk sesama perawat ICU: selalu monitoring hemodinamik secara ketat pada pasien post cardiac surgery. Early warning score sangat membantu dalam deteksi dini perburukan. Stay vigilant! #NursingICU',NULL,18,0,'2024-01-12 16:00:00');
INSERT INTO posts VALUES(5,9,'Edukasi kepada ibu hamil tentang tanda bahaya kehamilan sangat krusial. Jika mengalami perdarahan, sakit kepala hebat, atau pandangan kabur, segera ke faskes terdekat. #KehamilanSehat',NULL,15,0,'2024-01-11 11:00:00');
INSERT INTO posts VALUES(6,12,'Pasien post TKR (Total Knee Replacement) hari ke-3 sudah bisa jalan dengan walker. Rehabilitasi dini sangat penting untuk pemulihan optimal. Semangat untuk semua pasien ortopedi! #Fisioterapi',NULL,20,0,'2024-01-10 13:30:00');
INSERT INTO posts VALUES(7,13,'Mental health awareness: tidak ada salahnya meminta bantuan profesional. Kecemasan dan depresi bisa ditangani dengan baik melalui terapi yang tepat. Jangan ragu berkonsultasi. #KesehatanMental',NULL,35,0,'2024-01-09 15:00:00');
INSERT INTO posts VALUES(8,15,'Presentasi hasil penelitian tentang digital orthodontics di Kongres PDGI. Teknologi aligner semakin berkembang dan memberikan pilihan treatment yang lebih nyaman untuk pasien. #Ortodonsi',NULL,28,0,'2024-01-08 09:00:00');
CREATE TABLE connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requester_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  );
INSERT INTO connections VALUES(1,1,2,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(2,1,3,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(3,1,6,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(4,2,4,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(5,2,8,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(6,3,9,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(7,4,5,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(8,6,7,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(9,6,8,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(10,10,9,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(11,11,12,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(12,14,15,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(13,13,2,'accepted','2026-04-03 21:53:10');
INSERT INTO connections VALUES(14,7,8,'pending','2026-04-03 21:53:10');
INSERT INTO connections VALUES(15,11,1,'pending','2026-04-03 21:53:10');
INSERT INTO connections VALUES(16,19,8,'pending','2026-04-04 14:31:19');
INSERT INTO connections VALUES(17,19,2,'pending','2026-04-04 14:31:21');
CREATE TABLE jobs (
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
INSERT INTO jobs VALUES(1,1,'Dokter Spesialis Jantung dan Pembuluh Darah','RS Hermina Bekasi','RS Tipe B','Bekasi','Jawa Barat','Dokter Spesialis','Sp.JP','Tetap',35000000,60000000,1,'Dibutuhkan Dokter Spesialis Jantung dan Pembuluh Darah untuk bergabung dengan tim kardiologi RS Hermina Bekasi. Bertanggung jawab atas pelayanan rawat jalan dan rawat inap kardiologi, prosedur diagnostik non-invasif, serta konsultasi antar bagian.','- STR dan SIP aktif
- Pengalaman minimal 2 tahun
- Sertifikat ACLS
- Mampu melakukan ekokardiografi
- Bersedia on-call',1,'2026-04-03 21:53:10');
INSERT INTO jobs VALUES(2,5,'Dokter Umum Puskesmas','Puskesmas Kecamatan Cilincing','Puskesmas','Jakarta Utara','DKI Jakarta','Dokter Umum',NULL,'BLUD',12000000,18000000,1,'Puskesmas Kecamatan Cilincing membuka lowongan untuk Dokter Umum dengan status BLUD. Bertanggung jawab atas pelayanan kesehatan dasar, program promotif-preventif, dan pengelolaan program kesehatan wilayah.','- STR aktif
- Sertifikat ATLS/ACLS diutamakan
- Pengalaman di Puskesmas diutamakan
- Bersedia ditempatkan di Jakarta Utara
- Mampu bekerja dalam tim',1,'2026-04-03 21:53:10');
INSERT INTO jobs VALUES(3,6,'Perawat ICU','RS Mayapada Tangerang','RS Tipe B','Tangerang','Banten','Ners (S1+Profesi)',NULL,'Kontrak',8000000,12000000,1,'RS Mayapada Tangerang membutuhkan Perawat ICU untuk unit perawatan intensif dewasa. Harus mampu mengoperasikan ventilator, monitoring hemodinamik, dan memberikan asuhan keperawatan intensif.','- Ners (S1 + Profesi)
- STR aktif
- Sertifikat BTCLS dan ACLS
- Pengalaman ICU minimal 1 tahun
- Bersedia shift',1,'2026-04-03 21:53:10');
INSERT INTO jobs VALUES(4,10,'Bidan Klinik Pratama','Klinik Pratama Sehat Ibu dan Anak','Klinik Pratama','Sleman','DI Yogyakarta','Bidan Ahli (D4/S1)',NULL,'Tetap',5500000,8000000,1,'Dibutuhkan Bidan untuk pelayanan ANC, pertolongan persalinan, dan pelayanan KB di Klinik Pratama. Lingkungan kerja nyaman dengan fasilitas memadai.','- D4/S1 Kebidanan
- STR dan SIP aktif
- Pengalaman minimal 1 tahun
- Sertifikat APN
- Ramah dan komunikatif',1,'2026-04-03 21:53:10');
INSERT INTO jobs VALUES(5,11,'Apoteker Rumah Sakit','RS Islam Jakarta Cempaka Putih','RS Tipe B','Jakarta Pusat','DKI Jakarta','Apoteker',NULL,'Tetap',10000000,15000000,1,'RS Islam Jakarta membutuhkan Apoteker untuk instalasi farmasi rumah sakit. Bertanggung jawab atas dispensing, clinical pharmacy, dan medication safety.','- Profesi Apoteker
- STR dan SIPA aktif
- Pengalaman di RS minimal 1 tahun
- Memahami sistem formularium
- Terampil menggunakan SIMRS',1,'2026-04-03 21:53:10');
INSERT INTO jobs VALUES(6,16,'Dokter Spesialis Penyakit Dalam','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Jakarta Pusat','DKI Jakarta','Dokter Spesialis','Sp.PD','Tetap',40000000,70000000,1,'RSCM membuka lowongan untuk Dokter Spesialis Penyakit Dalam. Bergabung dengan tim internist terbaik di rumah sakit rujukan nasional. Kesempatan untuk terlibat dalam penelitian klinis dan pendidikan kedokteran.','- STR dan SIP aktif
- Lulusan program spesialis terakreditasi
- Pengalaman minimal 3 tahun
- Publikasi ilmiah diutamakan
- Mampu bekerja dalam tim multidisiplin',1,'2026-03-29T21:53:13.414Z');
INSERT INTO jobs VALUES(7,16,'Perawat ICU Dewasa','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Jakarta Pusat','DKI Jakarta','Ners (S1+Profesi)',NULL,'Kontrak',10000000,15000000,1,'Dibutuhkan Perawat ICU untuk unit perawatan intensif dewasa RSCM. Menangani pasien kritis dengan berbagai kasus kompleks. Kesempatan pengembangan karir dan pelatihan berkelanjutan.','- Ners (S1 + Profesi)
- STR aktif
- Sertifikat BTCLS dan ACLS wajib
- Pengalaman ICU minimal 2 tahun
- Mampu mengoperasikan ventilator dan monitoring invasif',1,'2026-03-31T21:53:13.414Z');
INSERT INTO jobs VALUES(8,16,'Apoteker Klinis','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Jakarta Pusat','DKI Jakarta','Apoteker',NULL,'Tetap',12000000,18000000,1,'RSCM membutuhkan Apoteker Klinis untuk instalasi farmasi. Bertanggung jawab atas clinical pharmacy service, medication reconciliation, dan drug information service.','- Profesi Apoteker
- STR dan SIPA aktif
- S2 Farmasi Klinis diutamakan
- Pengalaman di RS tipe A minimal 1 tahun
- Sertifikat pelatihan farmasi klinis',1,'2026-03-27T21:53:13.414Z');
INSERT INTO jobs VALUES(9,17,'Dokter Umum IGD','RS Siloam Semanggi','RS Tipe A','Jakarta Selatan','DKI Jakarta','Dokter Umum',NULL,'Kontrak',20000000,30000000,1,'Siloam Hospitals Semanggi membuka lowongan Dokter Umum untuk instalasi gawat darurat 24 jam. Sistem kerja shift dengan kompensasi kompetitif dan benefit lengkap.','- STR aktif
- Sertifikat ATLS dan ACLS wajib
- Pengalaman IGD minimal 1 tahun
- Mampu berkomunikasi dalam Bahasa Inggris
- Bersedia kerja shift',1,'2026-04-01T21:53:13.414Z');
INSERT INTO jobs VALUES(10,17,'Dokter Spesialis Anak','RS Siloam Kebon Jeruk','RS Tipe B','Jakarta Barat','DKI Jakarta','Dokter Spesialis','Sp.A','Tetap',45000000,75000000,1,'Siloam Hospitals Kebon Jeruk membutuhkan Dokter Spesialis Anak untuk memperkuat layanan pediatrik. Fasilitas lengkap termasuk NICU dan PICU.','- STR dan SIP aktif
- Board certified Sp.A
- Pengalaman minimal 3 tahun
- Subspesialis diutamakan
- Bersedia on-call',1,'2026-03-30T21:53:13.414Z');
INSERT INTO jobs VALUES(11,17,'Bidan Kamar Bersalin','RS Siloam Surabaya','RS Tipe B','Surabaya','Jawa Timur','Bidan Ahli (D4/S1)',NULL,'Tetap',7000000,10000000,1,'RS Siloam Surabaya membutuhkan Bidan untuk kamar bersalin. Menangani persalinan normal dan asistensi operasi sectio caesarea.','- D4/S1 Kebidanan
- STR dan SIP aktif
- Sertifikat APN
- Pengalaman di kamar bersalin minimal 1 tahun
- Bersedia shift',1,'2026-03-28T21:53:13.414Z');
INSERT INTO jobs VALUES(12,17,'Fisioterapis Rehabilitasi','RS Siloam Semanggi','RS Tipe A','Jakarta Selatan','DKI Jakarta','Fisioterapis',NULL,'Kontrak',8000000,12000000,1,'Unit Rehabilitasi Medik RS Siloam Semanggi membutuhkan Fisioterapis untuk layanan rehabilitasi muskuloskeletal dan neurologis.','- S1 Fisioterapi
- STR aktif
- Pengalaman minimal 1 tahun
- Sertifikasi McKenzie/Manual Therapy diutamakan',1,'2026-04-02T21:53:13.414Z');
INSERT INTO jobs VALUES(13,18,'Analis Kesehatan / Teknisi Lab','Prodia Lab Jakarta Kramat','Klinik Utama','Jakarta Pusat','DKI Jakarta','Analis Kesehatan',NULL,'Tetap',7000000,10000000,1,'Prodia Widyahusada membuka lowongan Analis Kesehatan untuk laboratorium pusat Jakarta. Menangani pemeriksaan hematologi, kimia klinik, dan immunoserologi.','- D3/S1 Analis Kesehatan/Teknologi Laboratorium Medik
- STR aktif
- Pengalaman di laboratorium klinik minimal 1 tahun
- Memahami prosedur mutu ISO 15189
- Teliti dan detail oriented',1,'2026-03-31T21:53:13.414Z');
INSERT INTO jobs VALUES(14,18,'Dokter Umum Klinik','Prodia Clinic Surabaya','Klinik Utama','Surabaya','Jawa Timur','Dokter Umum',NULL,'Paruh Waktu',8000000,12000000,1,'Prodia Clinic Surabaya membutuhkan Dokter Umum untuk pelayanan medical check-up dan konsultasi kesehatan. Jam kerja fleksibel.','- STR aktif
- Pengalaman MCU diutamakan
- Mampu interpretasi hasil laboratorium
- Komunikatif dan ramah
- Bersedia kerja weekend',1,'2026-03-26T21:53:13.414Z');
INSERT INTO jobs VALUES(15,18,'Perawat Phlebotomist','Prodia Lab Bandung','Klinik Utama','Bandung','Jawa Barat','Ners (S1+Profesi)',NULL,'Kontrak',5500000,8000000,1,'Prodia Bandung membutuhkan Perawat untuk pelayanan pengambilan sampel darah (phlebotomy) dan pelayanan pasien.','- D3 Keperawatan / Ners
- STR aktif
- Sertifikat Phlebotomy diutamakan
- Pengalaman minimal 6 bulan
- Teliti dan memiliki empati tinggi',1,'2026-03-24T21:53:13.414Z');
CREATE TABLE experiences (
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
INSERT INTO experiences VALUES(1,1,'Dokter Spesialis Jantung dan Pembuluh Darah','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Jakarta Pusat','2018-01',NULL,1,'Pelayanan kardiologi intervensi dan elektrofisiologi');
INSERT INTO experiences VALUES(2,1,'Fellow Kardiologi Intervensi','National Heart Centre Singapore',NULL,'Singapore','2016-01','2018-01',0,'Fellowship intervensi koroner perkutan');
INSERT INTO experiences VALUES(3,2,'Dokter Spesialis Anak','RS Siloam Semanggi','RS Tipe A','Jakarta Selatan','2019-06',NULL,1,'Pelayanan tumbuh kembang dan nutrisi pediatrik');
INSERT INTO experiences VALUES(4,2,'Dokter Spesialis Anak','RS Pondok Indah','RS Tipe B','Jakarta Selatan','2016-01','2019-06',0,NULL);
INSERT INTO experiences VALUES(5,3,'Konsultan Fetomaternal','RS Bunda Menteng','RS Tipe B','Jakarta Pusat','2015-03',NULL,1,'Penanganan kehamilan risiko tinggi dan USG 4D');
INSERT INTO experiences VALUES(6,4,'Dokter Puskesmas','Puskesmas Cikutra','Puskesmas','Bandung','2020-01',NULL,1,'Pelayanan kesehatan primer dan program imunisasi');
INSERT INTO experiences VALUES(7,5,'Kepala Puskesmas','Puskesmas Tanjung Perak','Puskesmas','Surabaya','2021-06',NULL,1,'Manajemen Puskesmas dan program TB-HIV');
INSERT INTO experiences VALUES(8,5,'Dokter Puskesmas','Puskesmas Wonokromo','Puskesmas','Surabaya','2017-01','2021-06',0,NULL);
INSERT INTO experiences VALUES(9,6,'Perawat ICU','RSUPN Dr. Cipto Mangunkusumo','RS Tipe A','Jakarta Pusat','2019-03',NULL,1,'Asuhan keperawatan intensif dan tim Code Blue');
INSERT INTO experiences VALUES(10,7,'Perawat IGD','RSUP Fatmawati','RS Tipe A','Jakarta Selatan','2020-07',NULL,1,'Emergency nursing dan triase');
INSERT INTO experiences VALUES(11,8,'Perawat Maternitas','RS Harapan Kita','RS Tipe A','Jakarta Barat','2018-09',NULL,1,'Perawatan ibu dan bayi pasca operasi jantung');
INSERT INTO experiences VALUES(12,9,'Bidan Pelaksana','Klinik Pratama Bunda Sehat','Klinik Pratama','Jakarta Timur','2020-04',NULL,1,'ANC terpadu dan persalinan normal');
INSERT INTO experiences VALUES(13,10,'Bidan Senior','Klinik Pratama Ibu dan Anak Yogyakarta','Klinik Pratama','Yogyakarta','2017-08',NULL,1,'Pelayanan kebidanan dan konseling laktasi');
INSERT INTO experiences VALUES(14,11,'Apoteker Rumah Sakit','RS Tipe C Kota Tangerang','RS Tipe C','Tangerang','2021-01',NULL,1,'Farmasi klinis dan manajemen formularium');
INSERT INTO experiences VALUES(15,12,'Fisioterapis','RS Ortopedi Prof. Dr. R. Soeharso Surakarta','RS Tipe A','Surakarta','2018-05',NULL,1,'Rehabilitasi ortopedi pasca operasi');
INSERT INTO experiences VALUES(16,13,'Psikolog Klinis','Klinik Jiwa Harmoni','Klinik Utama','Jakarta Selatan','2020-10',NULL,1,'Terapi CBT dan EMDR untuk gangguan kecemasan dan trauma');
INSERT INTO experiences VALUES(17,14,'Dokter Gigi','Klinik Gigi Senyum Cerah','Klinik Pratama','Jakarta Utara','2019-11',NULL,1,'Estetika dental dan endodontik');
INSERT INTO experiences VALUES(18,15,'Spesialis Ortodonsi','RS Gigi dan Mulut FKG UI','RS Tipe A','Jakarta Pusat','2017-02',NULL,1,'Perawatan maloklusi dan ortodonsi digital');
CREATE TABLE education (
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
INSERT INTO education VALUES(1,1,'Universitas Indonesia','Spesialis','Kardiologi dan Kedokteran Vaskular',2012,2016,NULL);
INSERT INTO education VALUES(2,1,'Universitas Indonesia','S1 Kedokteran','Pendidikan Dokter',2005,2011,NULL);
INSERT INTO education VALUES(3,2,'Universitas Indonesia','Spesialis','Ilmu Kesehatan Anak',2012,2016,NULL);
INSERT INTO education VALUES(4,2,'Universitas Indonesia','S1 Kedokteran','Pendidikan Dokter',2006,2012,NULL);
INSERT INTO education VALUES(5,3,'Universitas Gadjah Mada','Subspesialis','Fetomaternal',2012,2015,NULL);
INSERT INTO education VALUES(6,3,'Universitas Gadjah Mada','Spesialis','Obstetri dan Ginekologi',2007,2012,NULL);
INSERT INTO education VALUES(7,4,'Universitas Padjadjaran','S1 Kedokteran','Pendidikan Dokter',2013,2019,NULL);
INSERT INTO education VALUES(8,5,'Universitas Airlangga','S2 Kesehatan Masyarakat','Manajemen Kesehatan',2019,2021,NULL);
INSERT INTO education VALUES(9,5,'Universitas Airlangga','S1 Kedokteran','Pendidikan Dokter',2010,2016,NULL);
INSERT INTO education VALUES(10,6,'Universitas Indonesia','Profesi Ners','Keperawatan',2017,2018,NULL);
INSERT INTO education VALUES(11,6,'Universitas Indonesia','S1 Keperawatan','Ilmu Keperawatan',2013,2017,NULL);
INSERT INTO education VALUES(12,7,'Universitas Padjadjaran','Profesi Ners','Keperawatan',2018,2019,NULL);
INSERT INTO education VALUES(13,7,'Universitas Padjadjaran','S1 Keperawatan','Ilmu Keperawatan',2014,2018,NULL);
INSERT INTO education VALUES(14,8,'Universitas Gadjah Mada','Profesi Ners','Keperawatan Maternitas',2016,2017,NULL);
INSERT INTO education VALUES(15,9,'Poltekkes Kemenkes Jakarta III','D4 Kebidanan','Kebidanan',2016,2020,NULL);
INSERT INTO education VALUES(16,10,'Poltekkes Kemenkes Yogyakarta','D4 Kebidanan','Kebidanan',2013,2017,NULL);
INSERT INTO education VALUES(17,11,'Universitas Pancasila','Profesi Apoteker','Farmasi',2019,2020,NULL);
INSERT INTO education VALUES(18,11,'Universitas Pancasila','S1 Farmasi','Ilmu Farmasi',2015,2019,NULL);
INSERT INTO education VALUES(19,12,'Universitas Muhammadiyah Surakarta','S1 Fisioterapi','Fisioterapi',2013,2017,NULL);
INSERT INTO education VALUES(20,13,'Universitas Indonesia','S2 Profesi Psikolog','Psikologi Klinis',2017,2020,NULL);
INSERT INTO education VALUES(21,13,'Universitas Indonesia','S1 Psikologi','Psikologi',2013,2017,NULL);
INSERT INTO education VALUES(22,14,'Universitas Trisakti','S1 Kedokteran Gigi','Kedokteran Gigi',2013,2019,NULL);
INSERT INTO education VALUES(23,15,'Universitas Indonesia','Spesialis','Ortodonsia',2013,2017,NULL);
INSERT INTO education VALUES(24,15,'Universitas Indonesia','S1 Kedokteran Gigi','Kedokteran Gigi',2007,2013,NULL);
CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    endorsements INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
INSERT INTO skills VALUES(1,1,'Intervensi Koroner Perkutan',45);
INSERT INTO skills VALUES(2,1,'Elektrofisiologi',32);
INSERT INTO skills VALUES(3,1,'Ekokardiografi',28);
INSERT INTO skills VALUES(4,1,'ACLS',25);
INSERT INTO skills VALUES(5,2,'Tumbuh Kembang Anak',38);
INSERT INTO skills VALUES(6,2,'Nutrisi Pediatrik',30);
INSERT INTO skills VALUES(7,2,'Imunisasi',25);
INSERT INTO skills VALUES(8,2,'PALS',20);
INSERT INTO skills VALUES(9,3,'USG 4D',50);
INSERT INTO skills VALUES(10,3,'Kehamilan Risiko Tinggi',42);
INSERT INTO skills VALUES(11,3,'Fetomaternal',35);
INSERT INTO skills VALUES(12,4,'Kesehatan Masyarakat',15);
INSERT INTO skills VALUES(13,4,'Imunisasi',12);
INSERT INTO skills VALUES(14,4,'Posbindu PTM',10);
INSERT INTO skills VALUES(15,5,'Manajemen Puskesmas',20);
INSERT INTO skills VALUES(16,5,'TB-HIV',18);
INSERT INTO skills VALUES(17,5,'Kesehatan Pelayaran',12);
INSERT INTO skills VALUES(18,6,'BTCLS',22);
INSERT INTO skills VALUES(19,6,'ACLS',20);
INSERT INTO skills VALUES(20,6,'Ventilator Management',18);
INSERT INTO skills VALUES(21,6,'Hemodinamik',15);
INSERT INTO skills VALUES(22,7,'Triase',25);
INSERT INTO skills VALUES(23,7,'BTCLS',22);
INSERT INTO skills VALUES(24,7,'ACLS',18);
INSERT INTO skills VALUES(25,7,'Disaster Response',15);
INSERT INTO skills VALUES(26,8,'Asuhan Neonatal',20);
INSERT INTO skills VALUES(27,8,'Perawatan Maternitas',18);
INSERT INTO skills VALUES(28,8,'Laktasi',15);
INSERT INTO skills VALUES(29,9,'ANC Terpadu',12);
INSERT INTO skills VALUES(30,9,'Persalinan Normal',15);
INSERT INTO skills VALUES(31,9,'KB Pascasalin',10);
INSERT INTO skills VALUES(32,10,'Konseling Laktasi',25);
INSERT INTO skills VALUES(33,10,'Perawatan Neonatal',20);
INSERT INTO skills VALUES(34,10,'ANC',18);
INSERT INTO skills VALUES(35,11,'Farmasi Klinis',15);
INSERT INTO skills VALUES(36,11,'Manajemen Obat',12);
INSERT INTO skills VALUES(37,11,'Pharmacovigilance',10);
INSERT INTO skills VALUES(38,12,'Terapi Manual',22);
INSERT INTO skills VALUES(39,12,'Rehabilitasi Ortopedi',20);
INSERT INTO skills VALUES(40,12,'Cedera Olahraga',18);
INSERT INTO skills VALUES(41,13,'CBT',25);
INSERT INTO skills VALUES(42,13,'EMDR',20);
INSERT INTO skills VALUES(43,13,'Psikometri',15);
INSERT INTO skills VALUES(44,14,'Estetika Dental',18);
INSERT INTO skills VALUES(45,14,'Endodontik',15);
INSERT INTO skills VALUES(46,14,'Scaling & Root Planing',12);
INSERT INTO skills VALUES(47,15,'Ortodonsi Digital',30);
INSERT INTO skills VALUES(48,15,'Aligner',25);
INSERT INTO skills VALUES(49,15,'Bracket',28);
CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    related_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
CREATE TABLE job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  applicant_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  cover_letter TEXT,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, applicant_id)
);
INSERT INTO job_applications VALUES(1,6,1,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-23T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(2,6,2,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-03-26T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(3,7,2,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-03-30T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(4,7,3,'shortlisted','Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.','2026-03-24T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(5,7,4,'accepted',NULL,'2026-03-23T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(6,8,3,'shortlisted','Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.','2026-03-20T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(7,8,4,'accepted',NULL,'2026-03-26T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(8,8,5,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-04-01T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(9,8,6,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-27T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(10,9,4,'accepted',NULL,'2026-03-24T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(11,9,5,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-03-21T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(12,10,5,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-03-30T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(13,10,6,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-29T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(14,10,7,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-03-29T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(15,11,6,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-31T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(16,11,7,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-03-30T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(17,11,8,'shortlisted','Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.','2026-03-21T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(18,11,9,'accepted',NULL,'2026-04-01T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(19,12,7,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-04-01T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(20,12,8,'shortlisted','Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.','2026-03-31T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(21,13,8,'shortlisted','Saya telah mengikuti perkembangan fasilitas ini dan sangat antusias untuk bergabung. Pengalaman kerja saya sangat relevan dengan posisi yang ditawarkan.','2026-04-02T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(22,13,9,'accepted',NULL,'2026-04-01T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(23,13,10,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-03-30T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(24,14,9,'accepted',NULL,'2026-03-20T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(25,14,10,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-03-20T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(26,14,1,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-21T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(27,14,2,'reviewed','Dengan hormat, saya ingin melamar posisi yang ditawarkan. Saya memiliki kompetensi dan motivasi yang kuat untuk berkembang bersama institusi Anda.','2026-03-20T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(28,15,10,'rejected','Posisi ini sangat sesuai dengan latar belakang dan minat profesional saya. Saya berharap dapat berkontribusi pada pelayanan kesehatan yang lebih baik.','2026-03-29T21:53:13.414Z','2026-04-03 21:53:13');
INSERT INTO job_applications VALUES(29,15,1,'pending','Saya sangat tertarik dengan posisi ini dan yakin dapat berkontribusi secara signifikan. Dengan pengalaman saya di bidang ini, saya siap menghadapi tantangan baru.','2026-03-28T21:53:13.414Z','2026-04-03 21:53:13');
CREATE TABLE saved_candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employer_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  notes TEXT,
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employer_id, candidate_id)
);
INSERT INTO saved_candidates VALUES(1,16,1,'Kandidat kuat untuk posisi spesialis','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(2,16,6,'Perawat ICU berpengalaman','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(3,16,3,'Apoteker potensial','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(4,17,2,'Sp.A berkualitas','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(5,17,7,'Perawat IGD kompeten','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(6,17,9,'Bidan berpengalaman','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(7,17,5,'Fisioterapis terampil','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(8,18,4,'Dokter umum untuk MCU','2026-04-03 21:53:13');
INSERT INTO saved_candidates VALUES(9,18,8,'Perawat untuk phlebotomy','2026-04-03 21:53:13');
INSERT INTO sqlite_sequence VALUES('users',20);
INSERT INTO sqlite_sequence VALUES('experiences',18);
INSERT INTO sqlite_sequence VALUES('education',24);
INSERT INTO sqlite_sequence VALUES('skills',49);
INSERT INTO sqlite_sequence VALUES('posts',8);
INSERT INTO sqlite_sequence VALUES('connections',17);
INSERT INTO sqlite_sequence VALUES('jobs',15);
INSERT INTO sqlite_sequence VALUES('job_applications',29);
INSERT INTO sqlite_sequence VALUES('saved_candidates',9);
