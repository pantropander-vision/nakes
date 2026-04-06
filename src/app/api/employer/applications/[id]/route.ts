import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  const app = await db.prepare(`
    SELECT ja.* FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE ja.id = ? AND j.posted_by = ?
  `).bind(id, payload.userId).first<Record<string, unknown>>();

  if (!app) return NextResponse.json({ error: 'Lamaran tidak ditemukan' }, { status: 404 });

  const { status } = await request.json();
  const validStatuses = ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
  }

  await db.prepare('UPDATE job_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, id).run();

  return NextResponse.json({ message: 'Status lamaran diperbarui' });
}
