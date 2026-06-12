# NakesID.com (repo: nakes)

Platform jaringan profesional + lowongan kerja untuk tenaga kesehatan (nakes)
Indonesia. Live di **https://nakesid.com**. Dua role: `nakes` (tenaga
kesehatan, pelamar) dan `employer` (pemberi kerja), plus flag `is_admin`.

## Stack & arsitektur

- **Next.js 15 (App Router)** di **Cloudflare Pages** via `@cloudflare/next-on-pages`.
  Semua API route memakai `export const runtime = 'edge'`.
- **Database: Cloudflare D1** (SQLite). Binding `DB`, nama `nakes-db`,
  id `46e59b02-89e0-4bf2-b0f4-efabbceac534` (lihat `wrangler.toml`).
  Akses via `getRequestContext().env.DB` (`src/lib/db.ts`).
- **Auth**: JWT (jose, HS256) di header `Authorization: Bearer`, token di
  localStorage (`nakes_token`). Password **PBKDF2-SHA256 100k iterasi via Web
  Crypto** dengan format `pbkdf2:<iter>:<saltHex>:<hashHex>` (`src/lib/auth.ts`).
  - JANGAN pakai bcryptjs sync di edge — melampaui batas CPU Workers (inilah
    penyebab login/daftar "server error" setelah migrasi ke Cloudflare, April 2026).
  - Hash bcrypt lama (`$2b$...`) masih diverifikasi sebagai fallback dan
    otomatis di-upgrade ke PBKDF2 saat login sukses.
- Frontend murni client component; fetch helper di `src/lib/api.ts`.

## Deploy & operasional

- Push ke `main` → `.github/workflows/deploy.yml`: apply migrasi D1 → build
  next-on-pages → `wrangler pages deploy` (project `nakes`).
- **`.github/workflows/d1-tools.yml`** (workflow_dispatch, tab Actions):
  - `apply-migrations` — terapkan `migrations/`
  - `restore-data` — impor `data/nakes-restore-data.sql` (INSERT OR IGNORE,
    idempotent; berisi akun & data lama dari server pra-Cloudflare)
  - `set-admin` — `is_admin=1` untuk input `email`
- Kedua workflow punya step **"Resolve Cloudflare token"**: secret
  `CLOUDFLARE_API_TOKEN` pernah tersimpan multi-baris berisi teks tambahan,
  jadi step ini menguji tiap potongan nilai secret terhadap API Cloudflare
  (akses D1 + Pages) dan memakai yang valid. Token butuh izin
  **Cloudflare Pages:Edit + D1:Edit**. Account ID di-hardcode di workflow.

## PENTING: schema drift di D1 produksi

Schema database produksi TIDAK identik dengan `migrations/0001_init_schema.sql`:
- `users` sudah punya `is_admin` sebelum migrasi 0002 (karena itu 0002 hanya
  membuat `password_resets`).
- `jobs` di produksi punya **22 kolom** (5 kolom ekstra di luar 17 kolom dump).

Konsekuensi: semua INSERT ke produksi **wajib menyebutkan kolom eksplisit**,
jangan positional. `data/nakes-restore-data.sql` sudah mengikuti aturan ini.
Kalau menambah kolom baru: buat file migrasi baru di `migrations/` (wrangler
d1 migrations, dijalankan otomatis saat deploy).

## Fitur utama & lokasi kode

- Lowongan: list `/jobs`, **detail `/jobs/[id]`** (API `api/jobs/[id]` ikut
  mengembalikan info pemasang), apply, filter.
- Profil publik `/profile/[username]` — menangani DUA tipe: profil nakes
  (STR/SIP/SKP, pengalaman, pendidikan) dan profil employer (fasilitas +
  lowongan aktif).
- Employer: `/employer/*` (gated di `src/app/employer/layout.tsx` +
  server-side 403 di API). Pasang lowongan mendukung profesi custom
  (opsi `__custom__`).
- Lupa password: `/forgot-password` — verifikasi email+username (BELUM ada
  layanan email; token reset dikembalikan langsung di respons API, 1 jam,
  sekali pakai, tabel `password_resets`). Jika nanti ada layanan email,
  kirim token via email di `api/auth/forgot-password`.
- Admin: `/admin/members` (gated `src/app/admin/layout.tsx`, API
  `api/admin/users[/[id]]`, helper `src/lib/admin.ts`) — edit, hapus
  (cascade manual semua tabel terkait), reset password, angkat/cabut admin.
  Proteksi: tidak bisa hapus/cabut-admin diri sendiri. Admin pertama:
  akun `pantropanders@gmail.com` (id 38, username `Pantropanders`).

## Riwayat penting (Juni 2026)

Delapan bug diperbaiki via PR #1–#7 (lihat commit history di `main`):
auth edge runtime (PBKDF2), lupa password, signup, detail lowongan, profil
employer publik, profesi custom, gating pasang lowongan, fitur admin —
plus perbaikan pipeline deploy yang sebelumnya tidak pernah berhasil
(secret token malformed + tanpa izin D1).

## Pengembangan lokal

```bash
npm install && npm run dev            # UI saja, port 3461 (API butuh D1)
npm run build && npx @cloudflare/next-on-pages
npx wrangler d1 migrations apply nakes-db --local
npx wrangler d1 execute nakes-db --local --file=data/nakes-restore-data.sql
npx wrangler pages dev .vercel/output/static   # full stack lokal
```

Akun seed (lama): semua memakai password `password123` (mis.
`arief.cardio@nakes.id`). Lint: `npm run lint`.
