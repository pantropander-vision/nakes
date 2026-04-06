import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const user = db.prepare('SELECT account_type FROM users WHERE id = ?').get(payload.userId) as Record<string, unknown> | undefined;
  if (!user || user.account_type !== 'employer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const jobs = db.prepare(`
    SELECT j.*, COUNT(ja.id) as application_count
    FROM jobs j
    LEFT JOIN job_applications ja ON ja.job_id = j.id
    WHERE j.posted_by = ?
    GROUP BY j.id
    ORDER BY j.created_at DESC
  `).all(payload.userId);

  return NextResponse.json({ jobs });
}

export async function POST(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const user = db.prepare('SELECT account_type FROM users WHERE id = ?').get(payload.userId) as Record<string, unknown> | undefined;
  if (!user || user.account_type !== 'employer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json();
  const { title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements } = body;

  if (!title || !facility_name || !facility_type || !location || !province || !profession_type || !employment_type || !description) {
    return NextResponse.json({ error: 'Field wajib harus diisi' }, { status: 400 });
  }

  const result = db.prepare(`
    INSERT INTO jobs (posted_by, title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(payload.userId, title, facility_name, facility_type, location, province, profession_type, specialization || null, employment_type, salary_min || null, salary_max || null, bpjs_required ?? 1, description, requirements || null);

  return NextResponse.json({ id: result.lastInsertRowid, message: 'Lowongan berhasil diposting' }, { status: 201 });
}
