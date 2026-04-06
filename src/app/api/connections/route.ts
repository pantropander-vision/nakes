import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const connections = db.prepare(`
      SELECT u.id, u.username, u.full_name, u.avatar_url, u.profession_type, u.specialization, u.current_workplace, u.kota, c.status, c.id as connection_id
      FROM connections c
      JOIN users u ON (
        CASE WHEN c.requester_id = ? THEN u.id = c.receiver_id
             ELSE u.id = c.requester_id END
      )
      WHERE (c.requester_id = ? OR c.receiver_id = ?) AND c.status = 'accepted'
    `).all(payload.userId, payload.userId, payload.userId);

    const pending = db.prepare(`
      SELECT u.id, u.username, u.full_name, u.avatar_url, u.profession_type, u.specialization, u.current_workplace, c.id as connection_id
      FROM connections c
      JOIN users u ON u.id = c.requester_id
      WHERE c.receiver_id = ? AND c.status = 'pending'
    `).all(payload.userId);

    const suggestions = db.prepare(`
      SELECT id, username, full_name, avatar_url, profession_type, specialization, current_workplace, kota
      FROM users
      WHERE id != ?
      AND id NOT IN (
        SELECT CASE WHEN requester_id = ? THEN receiver_id ELSE requester_id END
        FROM connections WHERE requester_id = ? OR receiver_id = ?
      )
      ORDER BY RANDOM()
      LIMIT 10
    `).all(payload.userId, payload.userId, payload.userId, payload.userId);

    return NextResponse.json({ connections, pending, suggestions });
  } catch (error) {
    console.error('Get connections error:', error);
    return NextResponse.json({ error: 'Gagal memuat koneksi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiver_id, action, connection_id } = await request.json();

    const db = getDb();

    if (action === 'accept' && connection_id) {
      db.prepare('UPDATE connections SET status = ? WHERE id = ? AND receiver_id = ?').run('accepted', connection_id, payload.userId);
      return NextResponse.json({ message: 'Koneksi diterima' });
    }

    if (action === 'reject' && connection_id) {
      db.prepare('DELETE FROM connections WHERE id = ? AND receiver_id = ?').run(connection_id, payload.userId);
      return NextResponse.json({ message: 'Koneksi ditolak' });
    }

    if (receiver_id) {
      const existing = db.prepare(
        'SELECT id FROM connections WHERE (requester_id = ? AND receiver_id = ?) OR (requester_id = ? AND receiver_id = ?)'
      ).get(payload.userId, receiver_id, receiver_id, payload.userId);

      if (existing) {
        return NextResponse.json({ error: 'Permintaan koneksi sudah ada' }, { status: 409 });
      }

      db.prepare('INSERT INTO connections (requester_id, receiver_id) VALUES (?, ?)').run(payload.userId, receiver_id);
      return NextResponse.json({ message: 'Permintaan koneksi terkirim' }, { status: 201 });
    }

    return NextResponse.json({ error: 'Parameter tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ error: 'Gagal memproses koneksi' }, { status: 500 });
  }
}
