import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const payload = await getUserFromRequest(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(payload.userId).first<Record<string, unknown>>();

  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
  }

  delete user.password;
  return NextResponse.json({ user });
}
