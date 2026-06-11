import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token dan password baru harus diisi' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 });
    }

    const db = getDb();
    const reset = await db.prepare(
      "SELECT id, user_id FROM password_resets WHERE token = ? AND used = 0 AND expires_at > datetime('now')"
    ).bind(token).first<{ id: number; user_id: number }>();

    if (!reset) {
      return NextResponse.json({ error: 'Token reset tidak valid atau sudah kedaluwarsa' }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    await db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(hashed, reset.user_id).run();
    await db.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').bind(reset.id).run();

    return NextResponse.json({ message: 'Password berhasil direset. Silakan masuk dengan password baru.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
