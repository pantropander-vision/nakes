import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const connections = (await db.prepare(`
      SELECT u.id, u.username, u.full_name, u.avatar_url, u.profession_type, u.specialization, u.current_workplace, u.kota, c.status, c.id as connection_id
      FROM connections c
      JOIN users u ON (
        CASE WHEN c.requester_id = ? THEN u.id = c.receiver_id
             ELSE u.id = c.requester_id END
      )
      WHERE (c.requester_id = ? OR c.receiver_id = ?) AND c.status = 'accepted'
    `).bind(payload.userId, payload.userId, payload.userId).all()).results;

    const pending = (await db.prepare(`
      SELECT u.id, u.username, u.full_name, u.avatar_url, u.profession_type, u.specialization, u.current_workplace, c.id as connection_id
      FROM connections c
      JOIN users u ON u.id = c.requester_id
      WHERE c.receiver_id = ? AND c.status = 'pending'
    `).bind(payload.userId).all()).results;

    const suggestions = (await db.prepare(`
      SELECT id, username, full_name, avatar_url, profession_type, specialization, current_workplace, kota
      FROM users
      WHERE id != ?
      AND id NOT IN (
        SELECT CASE WHEN requester_id = ? THEN receiver_id ELSE requester_id END
        FROM connections WHERE requester_id = ? OR receiver_id = ?
      )
      ORDER BY RANDOM()
      LIMIT 10
    `).bind(payload.userId, payload.userId, payload.userId, payload.userId).all()).results;

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
      await db.prepare('UPDATE connections SET status = ? WHERE id = ? AND receiver_id = ?').bind('accepted', connection_id, payload.userId).run();
      return NextResponse.json({ message: 'Koneksi diterima' });
    }

    if (action === 'reject' && connection_id) {
      await db.prepare('DELETE FROM connections WHERE id = ? AND receiver_id = ?').bind(connection_id, payload.userId).run();
      return NextResponse.json({ message: 'Koneksi ditolak' });
    }

    if (receiver_id) {
      const existing = await db.prepare(
        'SELECT id FROM connections WHERE (requester_id = ? AND receiver_id = ?) OR (requester_id = ? AND receiver_id = ?)'
      ).bind(payload.userId, receiver_id, receiver_id, payload.userId).first();

      if (existing) {
        return NextResponse.json({ error: 'Permintaan koneksi sudah ada' }, { status: 409 });
      }

      await db.prepare('INSERT INTO connections (requester_id, receiver_id) VALUES (?, ?)').bind(payload.userId, receiver_id).run();
      return NextResponse.json({ message: 'Permintaan koneksi terkirim' }, { status: 201 });
    }

    return NextResponse.json({ error: 'Parameter tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ error: 'Gagal memproses koneksi' }, { status: 500 });
  }
}
