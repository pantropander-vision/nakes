import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { verifyPassword, passwordNeedsRehash, hashPassword, generateToken } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password harus diisi' }, { status: 400 });
    }

    const db = getDb();
    const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<Record<string, unknown>>();

    if (!user || !(await verifyPassword(password, user.password as string))) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    // Upgrade legacy bcrypt hashes (from the old server) to PBKDF2
    if (passwordNeedsRehash(user.password as string)) {
      try {
        const newHash = await hashPassword(password);
        await db.prepare('UPDATE users SET password = ? WHERE id = ?').bind(newHash, user.id).run();
      } catch {
        // non-fatal: user can still log in with the legacy hash
      }
    }

    const token = await generateToken({
      userId: user.id as number,
      email: user.email as string,
      username: user.username as string,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        profession_type: user.profession_type,
        specialization: user.specialization,
        account_type: user.account_type || 'nakes',
        is_admin: user.is_admin ? 1 : 0,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
