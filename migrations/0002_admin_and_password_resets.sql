-- Tokens for the "lupa password" (forgot password) flow.
-- Catatan: kolom users.is_admin sudah ada di database produksi (dan kini juga
-- di 0001_init_schema.sql untuk database baru), jadi tidak di-ALTER di sini.
CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
