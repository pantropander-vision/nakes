import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { requireAdmin } from '@/lib/admin';
import { hashPassword } from '@/lib/auth';

export const runtime = 'edge';

// Edit member: data profil, role admin, dan reset password
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();
    const admin = await requireAdmin(request, db);
    if (!admin) return NextResponse.json({ error: 'Hanya admin yang dapat mengakses' }, { status: 403 });

    const userId = parseInt(id, 10);
    const target = await db.prepare('SELECT id, is_admin FROM users WHERE id = ?').bind(userId).first<Record<string, unknown>>();
    if (!target) return NextResponse.json({ error: 'Member tidak ditemukan' }, { status: 404 });

    const body = await request.json();
    const updates: string[] = [];
    const values: (string | number)[] = [];

    const textFields = ['full_name', 'email', 'username', 'account_type', 'profession_type'] as const;
    for (const field of textFields) {
      if (typeof body[field] === 'string' && body[field].trim()) {
        updates.push(`${field} = ?`);
        values.push(body[field].trim());
      }
    }

    if (body.is_admin === 0 || body.is_admin === 1) {
      if (userId === admin.id && body.is_admin === 0) {
        return NextResponse.json({ error: 'Anda tidak dapat mencabut role admin Anda sendiri' }, { status: 400 });
      }
      updates.push('is_admin = ?');
      values.push(body.is_admin);
    }

    if (typeof body.new_password === 'string' && body.new_password) {
      if (body.new_password.length < 6) {
        return NextResponse.json({ error: 'Password minimal 6 karakter' }, { status: 400 });
      }
      updates.push('password = ?');
      values.push(await hashPassword(body.new_password));
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Tidak ada data yang diubah' }, { status: 400 });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    try {
      await db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    } catch {
      // kemungkinan besar pelanggaran UNIQUE pada email/username
      return NextResponse.json({ error: 'Email atau username sudah dipakai member lain' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Member berhasil diperbarui' });
  } catch (error) {
    console.error('Admin update user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();
    const admin = await requireAdmin(request, db);
    if (!admin) return NextResponse.json({ error: 'Hanya admin yang dapat mengakses' }, { status: 403 });

    const userId = parseInt(id, 10);
    if (userId === admin.id) {
      return NextResponse.json({ error: 'Anda tidak dapat menghapus akun Anda sendiri' }, { status: 400 });
    }

    const target = await db.prepare('SELECT id FROM users WHERE id = ?').bind(userId).first();
    if (!target) return NextResponse.json({ error: 'Member tidak ditemukan' }, { status: 404 });

    // Hapus semua data terkait member agar tidak ada baris yatim
    await db.batch([
      db.prepare('DELETE FROM job_applications WHERE applicant_id = ?').bind(userId),
      db.prepare('DELETE FROM job_applications WHERE job_id IN (SELECT id FROM jobs WHERE posted_by = ?)').bind(userId),
      db.prepare('DELETE FROM jobs WHERE posted_by = ?').bind(userId),
      db.prepare('DELETE FROM saved_candidates WHERE employer_id = ? OR candidate_id = ?').bind(userId, userId),
      db.prepare('DELETE FROM connections WHERE requester_id = ? OR receiver_id = ?').bind(userId, userId),
      db.prepare('DELETE FROM posts WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM experiences WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM education WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM skills WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM notifications WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM password_resets WHERE user_id = ?').bind(userId),
      db.prepare('DELETE FROM users WHERE id = ?').bind(userId),
    ]);

    return NextResponse.json({ message: 'Member berhasil dihapus' });
  } catch (error) {
    console.error('Admin delete user error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
