import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const profile = await db.prepare('SELECT id, full_name, email, phone, province, kota, employer_facility_name, employer_facility_type, employer_description, employer_website, employer_size FROM users WHERE id = ?').bind(payload.userId).first();

  return NextResponse.json({ profile });
}

export async function PUT(request: NextRequest) {
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { employer_facility_name, employer_facility_type, employer_description, employer_website, employer_size, province, kota, full_name, phone } = body;

  const db = getDb();
  await db.prepare(`
    UPDATE users SET employer_facility_name=?, employer_facility_type=?, employer_description=?, employer_website=?, employer_size=?, province=?, kota=?, full_name=?, phone=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).bind(
    employer_facility_name || null, employer_facility_type || null, employer_description || null,
    employer_website || null, employer_size || null, province || null, kota || null,
    full_name || null, phone || null, payload.userId
  ).run();

  return NextResponse.json({ message: 'Profil berhasil diperbarui' });
}
