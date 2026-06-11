import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const admin = await requireAdmin(request, db);
    if (!admin) return NextResponse.json({ error: 'Hanya admin yang dapat mengakses' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let query = `
      SELECT id, username, email, full_name, profession_type, account_type, is_admin,
             province, kota, employer_facility_name, created_at
      FROM users
    `;
    const params: string[] = [];
    if (q) {
      query += ' WHERE full_name LIKE ? OR email LIKE ? OR username LIKE ?';
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    query += ' ORDER BY created_at DESC';

    const users = (await db.prepare(query).bind(...params).all()).results;
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin list users error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
