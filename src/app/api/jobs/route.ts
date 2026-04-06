import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profession = searchParams.get('profession');
    const province = searchParams.get('province');
    const facility_type = searchParams.get('facility_type');

    const db = getDb();
    let query = 'SELECT * FROM jobs WHERE is_active = 1';
    const params: string[] = [];

    if (profession) {
      query += ' AND profession_type = ?';
      params.push(profession);
    }
    if (province) {
      query += ' AND province = ?';
      params.push(province);
    }
    if (facility_type) {
      query += ' AND facility_type = ?';
      params.push(facility_type);
    }

    query += ' ORDER BY created_at DESC';

    const jobs = (await db.prepare(query).bind(...params).all()).results;
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json({ error: 'Gagal memuat lowongan' }, { status: 500 });
  }
}
