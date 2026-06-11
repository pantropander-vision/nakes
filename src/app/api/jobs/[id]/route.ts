import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();

    const job = await db.prepare(`
      SELECT j.*,
             u.username AS poster_username,
             u.full_name AS poster_name,
             u.account_type AS poster_account_type,
             u.employer_facility_name AS poster_facility_name
      FROM jobs j
      LEFT JOIN users u ON u.id = j.posted_by
      WHERE j.id = ?
    `).bind(id).first();

    if (!job) {
      return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Get job detail error:', error);
    return NextResponse.json({ error: 'Gagal memuat detail lowongan' }, { status: 500 });
  }
}
