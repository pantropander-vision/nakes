import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  const user = await db.prepare('SELECT account_type FROM users WHERE id = ?').bind(payload.userId).first<Record<string, unknown>>();
  if (user?.account_type === 'employer') {
    return NextResponse.json({ error: 'Employer tidak dapat melamar pekerjaan' }, { status: 403 });
  }

  const job = await db.prepare('SELECT id FROM jobs WHERE id = ? AND is_active = 1').bind(id).first();
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const cover_letter = body.cover_letter || null;

  try {
    await db.prepare('INSERT INTO job_applications (job_id, applicant_id, cover_letter) VALUES (?, ?, ?)').bind(id, payload.userId, cover_letter).run();
    return NextResponse.json({ message: 'Lamaran berhasil dikirim' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Anda sudah melamar posisi ini' }, { status: 409 });
  }
}
