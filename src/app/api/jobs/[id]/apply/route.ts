import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  // Verify user is a nakes account
  const user = db.prepare('SELECT account_type FROM users WHERE id = ?').get(payload.userId) as Record<string, unknown> | undefined;
  if (user?.account_type === 'employer') {
    return NextResponse.json({ error: 'Employer tidak dapat melamar pekerjaan' }, { status: 403 });
  }

  // Verify job exists and is active
  const job = db.prepare('SELECT id FROM jobs WHERE id = ? AND is_active = 1').get(id);
  if (!job) return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const cover_letter = body.cover_letter || null;

  try {
    db.prepare('INSERT INTO job_applications (job_id, applicant_id, cover_letter) VALUES (?, ?, ?)').run(id, payload.userId, cover_letter);
    return NextResponse.json({ message: 'Lamaran berhasil dikirim' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Anda sudah melamar posisi ini' }, { status: 409 });
  }
}
