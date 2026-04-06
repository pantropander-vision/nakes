import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username diperlukan' }, { status: 400 });
    }

    const db = getDb();
    const user = await db.prepare(`
      SELECT id, username, email, full_name, profession_type, specialization, nurse_level,
             str_number, str_expiry, str_status, sip_number, sip_facility, skp_credits,
             professional_association, province, kota, current_workplace, current_workplace_type,
             bio, avatar_url, phone, created_at
      FROM users WHERE username = ?
    `).bind(username).first<Record<string, unknown>>();

    if (!user) {
      return NextResponse.json({ error: 'Profil tidak ditemukan' }, { status: 404 });
    }

    const experiences = (await db.prepare('SELECT * FROM experiences WHERE user_id = ? ORDER BY is_current DESC, start_date DESC').bind(user.id).all()).results;
    const education = (await db.prepare('SELECT * FROM education WHERE user_id = ? ORDER BY end_year DESC').bind(user.id).all()).results;
    const skills = (await db.prepare('SELECT * FROM skills WHERE user_id = ? ORDER BY endorsements DESC').bind(user.id).all()).results;

    const connectionCount = await db.prepare(`
      SELECT COUNT(*) as count FROM connections
      WHERE (requester_id = ? OR receiver_id = ?) AND status = 'accepted'
    `).bind(user.id, user.id).first<{ count: number }>();

    return NextResponse.json({
      user,
      experiences,
      education,
      skills,
      connectionCount: connectionCount?.count ?? 0,
    });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json({ error: 'Gagal memuat profil' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      bio, phone, current_workplace, current_workplace_type, province, kota,
      str_number, str_expiry, str_status, sip_number, sip_facility,
      skp_credits, professional_association, full_name, specialization
    } = body;

    const db = getDb();
    await db.prepare(`
      UPDATE users SET
        bio = ?, phone = ?, current_workplace = ?, current_workplace_type = ?,
        province = ?, kota = ?, str_number = ?, str_expiry = ?, str_status = ?,
        sip_number = ?, sip_facility = ?, skp_credits = ?, professional_association = ?,
        full_name = ?, specialization = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      bio, phone, current_workplace, current_workplace_type,
      province, kota, str_number, str_expiry, str_status,
      sip_number, sip_facility, skp_credits ?? 0, professional_association,
      full_name, specialization, payload.userId
    ).run();

    return NextResponse.json({ message: 'Profil berhasil diperbarui' });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 });
  }
}
