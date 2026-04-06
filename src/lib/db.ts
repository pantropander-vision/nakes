import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'nakes.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
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
}

export default getDb;
