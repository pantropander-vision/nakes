import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDb();
    const posts = db.prepare(`
      SELECT p.*, u.full_name, u.username, u.avatar_url, u.profession_type, u.specialization, u.current_workplace
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `).all();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json({ error: 'Gagal memuat postingan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Konten tidak boleh kosong' }, { status: 400 });
    }

    const db = getDb();
    const result = db.prepare('INSERT INTO posts (user_id, content) VALUES (?, ?)').run(payload.userId, content.trim());

    const post = db.prepare(`
      SELECT p.*, u.full_name, u.username, u.avatar_url, u.profession_type, u.specialization, u.current_workplace
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).get(result.lastInsertRowid);

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Gagal membuat postingan' }, { status: 500 });
  }
}
