import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').get(id, payload.userId);
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  return NextResponse.json({ job });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').get(id, payload.userId);
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  const body = await request.json();

  if (body.is_active !== undefined) {
    db.prepare('UPDATE jobs SET is_active = ? WHERE id = ?').run(body.is_active, id);
    return NextResponse.json({ message: 'Status lowongan diperbarui' });
  }

  const { title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements } = body;
  db.prepare(`
    UPDATE jobs SET title=?, facility_name=?, facility_type=?, location=?, province=?, profession_type=?, specialization=?, employment_type=?, salary_min=?, salary_max=?, bpjs_required=?, description=?, requirements=? WHERE id=?
  `).run(title, facility_name, facility_type, location, province, profession_type, specialization || null, employment_type, salary_min || null, salary_max || null, bpjs_required ?? 1, description, requirements || null, id);

  return NextResponse.json({ message: 'Lowongan berhasil diperbarui' });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').get(id, payload.userId);
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  db.prepare('DELETE FROM job_applications WHERE job_id = ?').run(id);
  db.prepare('DELETE FROM jobs WHERE id = ?').run(id);

  return NextResponse.json({ message: 'Lowongan berhasil dihapus' });
}
