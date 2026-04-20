import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = await db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').bind(id, payload.userId).first();
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  return NextResponse.json({ job });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = await db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').bind(id, payload.userId).first();
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  const body = await request.json();

  if (body.is_active !== undefined) {
    await db.prepare('UPDATE jobs SET is_active = ? WHERE id = ?').bind(body.is_active, id).run();
    return NextResponse.json({ message: 'Status lowongan diperbarui' });
  }

  const { title, facility_name, facility_type, location, province, profession_type, specialization, employment_type, salary_min, salary_max, bpjs_required, description, requirements } = body;
  await db.prepare(`
    UPDATE jobs SET title=?, facility_name=?, facility_type=?, location=?, province=?, profession_type=?, specialization=?, employment_type=?, salary_min=?, salary_max=?, bpjs_required=?, description=?, requirements=? WHERE id=?
  `).bind(title, facility_name, facility_type, location, province, profession_type, specialization || null, employment_type, salary_min || null, salary_max || null, bpjs_required ?? 1, description, requirements || null, id).run();

  return NextResponse.json({ message: 'Lowongan berhasil diperbarui' });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const job = await db.prepare('SELECT * FROM jobs WHERE id = ? AND posted_by = ?').bind(id, payload.userId).first();
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  await db.prepare('DELETE FROM job_applications WHERE job_id = ?').bind(id).run();
  await db.prepare('DELETE FROM jobs WHERE id = ?').bind(id).run();

  return NextResponse.json({ message: 'Lowongan berhasil dihapus' });
}
