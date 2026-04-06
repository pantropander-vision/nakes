import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const profession = searchParams.get('profession');
    const province = searchParams.get('province');

    const db = getDb();
    let query = `
      SELECT id, username, full_name, avatar_url, profession_type, specialization,
             current_workplace, current_workplace_type, province, kota, bio
      FROM users WHERE 1=1
    `;
    const params: string[] = [];

    if (q) {
      query += ' AND (full_name LIKE ? OR specialization LIKE ? OR current_workplace LIKE ? OR username LIKE ?)';
      const search = `%${q}%`;
      params.push(search, search, search, search);
    }

    if (profession) {
      query += ' AND profession_type = ?';
      params.push(profession);
    }

    if (province) {
      query += ' AND province = ?';
      params.push(province);
    }

    query += ' ORDER BY full_name ASC LIMIT 50';

    const users = db.prepare(query).all(...params);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Gagal melakukan pencarian' }, { status: 500 });
  }
}
