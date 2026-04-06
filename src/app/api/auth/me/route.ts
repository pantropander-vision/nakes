import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const user = db.prepare('SELECT id, username, email, full_name, profession_type, specialization, avatar_url, province, kota, current_workplace, bio, account_type, employer_facility_name, employer_facility_type, employer_description, employer_website, employer_size FROM users WHERE id = ?').get(payload.userId);

  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json({ user });
}
