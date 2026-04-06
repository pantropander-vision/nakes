import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password harus diisi' }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as Record<string, unknown> | undefined;

    if (!user || !comparePassword(password, user.password as string)) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const token = generateToken({
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
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
