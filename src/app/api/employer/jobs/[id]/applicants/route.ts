import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = await db.prepare('SELECT id, title, facility_name FROM jobs WHERE id = ? AND posted_by = ?').bind(id, payload.userId).first<Record<string, unknown>>();
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let query = `
    SELECT ja.*, u.full_name, u.email, u.profession_type, u.specialization, u.province, u.kota, u.current_workplace, u.username
    FROM job_applications ja
    JOIN users u ON u.id = ja.applicant_id
    WHERE ja.job_id = ?
  `;
  const queryParams: (string | number)[] = [Number(id)];

  if (status) {
    query += ' AND ja.status = ?';
    queryParams.push(status);
  }

  query += ' ORDER BY ja.applied_at DESC';

  const applicants = (await db.prepare(query).bind(...queryParams).all()).results;

  return NextResponse.json({ job, applicants });
}
