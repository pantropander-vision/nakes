import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { generateResetToken } from '@/lib/auth';

export const runtime = 'edge';

// Belum ada layanan email, jadi verifikasi identitas memakai kombinasi
// email + username dan token reset dikembalikan langsung ke pemohon.
export async function POST(request: NextRequest) {
  try {
    const { email, username } = await request.json();

    if (!email || !username) {
      return NextResponse.json({ error: 'Email dan username harus diisi' }, { status: 400 });
    }

    const db = getDb();
    const user = await db.prepare('SELECT id FROM users WHERE email = ? AND username = ?')
      .bind(email, username).first<{ id: number }>();

    if (!user) {
      return NextResponse.json({ error: 'Kombinasi email dan username tidak ditemukan' }, { status: 404 });
    }

    const token = generateResetToken();

    // datetime('now', ...) agar format konsisten dengan pengecekan di reset-password
    await db.prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, datetime('now', '+1 hour'))")
      .bind(user.id, token).run();

    return NextResponse.json({ reset_token: token });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
