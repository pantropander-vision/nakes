import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const saved = db.prepare(`
    SELECT sc.*, u.username, u.full_name, u.profession_type, u.specialization, u.province, u.kota, u.current_workplace
    FROM saved_candidates sc
    JOIN users u ON u.id = sc.candidate_id
    WHERE sc.employer_id = ?
    ORDER BY sc.saved_at DESC
  `).all(payload.userId);

  return NextResponse.json({ saved });
}

export async function POST(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { candidate_id, notes } = await request.json();
  if (!candidate_id) return NextResponse.json({ error: 'candidate_id diperlukan' }, { status: 400 });

  const db = getDb();
  try {
    db.prepare('INSERT INTO saved_candidates (employer_id, candidate_id, notes) VALUES (?, ?, ?)').run(payload.userId, candidate_id, notes || null);
    return NextResponse.json({ message: 'Kandidat berhasil disimpan' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Kandidat sudah disimpan' }, { status: 409 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { candidate_id } = await request.json();
  if (!candidate_id) return NextResponse.json({ error: 'candidate_id diperlukan' }, { status: 400 });

  const db = getDb();
  db.prepare('DELETE FROM saved_candidates WHERE employer_id = ? AND candidate_id = ?').run(payload.userId, candidate_id);

  return NextResponse.json({ message: 'Kandidat dihapus dari tersimpan' });
}
