import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  // Verify the application belongs to a job owned by this employer
  const app = db.prepare(`
    SELECT ja.* FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE ja.id = ? AND j.posted_by = ?
  `).get(id, payload.userId) as Record<string, unknown> | undefined;

  if (!app) return NextResponse.json({ error: 'Lamaran tidak ditemukan' }, { status: 404 });

  const { status } = await request.json();
  const validStatuses = ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
  }

  db.prepare('UPDATE job_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);

  return NextResponse.json({ message: 'Status lamaran diperbarui' });
}
