import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    const posts = (await db.prepare(`
      SELECT p.*, u.full_name, u.username, u.avatar_url, u.profession_type, u.specialization, u.current_workplace
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `).all()).results;

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json({ error: 'Gagal memuat postingan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Konten tidak boleh kosong' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.prepare('INSERT INTO posts (user_id, content) VALUES (?, ?)').bind(payload.userId, content.trim()).run();
    const newId = result.meta.last_row_id;

    const post = await db.prepare(`
      SELECT p.*, u.full_name, u.username, u.avatar_url, u.profession_type, u.specialization, u.current_workplace
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).bind(newId).first();

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Gagal membuat postingan' }, { status: 500 });
  }
}
