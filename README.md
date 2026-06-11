# NakesID.com

Platform jaringan profesional dan lowongan kerja untuk tenaga kesehatan Indonesia.
Berjalan di **Cloudflare Pages** (Next.js via `@cloudflare/next-on-pages`) dengan database **Cloudflare D1**.

## Pengembangan Lokal

```bash
npm install
npm run dev          # http://localhost:3461
```

API route berjalan di edge runtime dan butuh binding D1; untuk pengujian penuh gunakan:

```bash
npm run pages:build
npx wrangler pages dev .vercel/output/static
```

## Deploy

Push ke branch `main` otomatis men-deploy lewat GitHub Actions (`.github/workflows/deploy.yml`).
Workflow ini juga menjalankan migrasi schema D1 (`migrations/`) sebelum deploy.

## Operasional Database (D1)

Gunakan workflow **D1 Database Tools** di tab GitHub Actions (`Run workflow`):

| Aksi | Fungsi |
|---|---|
| `apply-migrations` | Terapkan migrasi schema (juga otomatis saat deploy) |
| `restore-data` | **Aktivasi kembali akun-akun lama**: impor data dari `data/nakes-restore-data.sql` (memakai `INSERT OR IGNORE`, aman dijalankan berulang, tidak menimpa data yang sudah ada) |
| `set-admin` | Jadikan akun sebagai admin — isi input `email` dengan email member |

Setelah `set-admin`, member tersebut akan melihat menu **Kelola Member** (`/admin/members`)
untuk edit, hapus, reset password, dan mengangkat admin lain.

## Catatan Teknis

- **Password hashing** memakai PBKDF2 (Web Crypto) karena bcrypt murni-JS melampaui batas CPU
  Workers di edge runtime (ini penyebab error "server error" saat daftar/login setelah migrasi
  ke Cloudflare). Hash bcrypt lama tetap diverifikasi dan otomatis di-upgrade ke PBKDF2 saat
  login berhasil. Jika login akun lama masih gagal karena batas CPU, gunakan **Lupa Password**
  atau reset lewat admin — keduanya membuat hash PBKDF2 baru.
- **Lupa password** (`/forgot-password`) belum memakai email (tidak ada layanan email);
  verifikasi memakai kombinasi email + username. Jika nanti ada layanan email (mis. Resend /
  Mailchannels), kirim `reset_token` lewat email alih-alih mengembalikannya langsung di respons
  API (`src/app/api/auth/forgot-password/route.ts`).
