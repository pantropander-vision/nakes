import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email, password, full_name, username,
      profession_type, specialization, str_number,
      str_expiry, province, kota,
      account_type, employer_facility_name, employer_facility_type,
      employer_website, employer_size,
    } = body;

    const isEmployer = account_type === 'employer';

    if (!email || !password || !full_name || !username) {
      return NextResponse.json({ error: 'Field wajib harus diisi' }, { status: 400 });
    }
    if (!isEmployer && !profession_type) {
      return NextResponse.json({ error: 'Jenis profesi harus diisi' }, { status: 400 });
    }
    if (isEmployer && !employer_facility_name) {
      return NextResponse.json({ error: 'Nama fasilitas harus diisi' }, { status: 400 });
    }

    const db = getDb();

    const existing = await db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').bind(email, username).first();
    if (existing) {
      return NextResponse.json({ error: 'Email atau username sudah terdaftar' }, { status: 409 });
    }

    const hashedPassword = hashPassword(password);
    const strExpiry = str_expiry || new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const result = await db.prepare(`
      INSERT INTO users (email, password, full_name, username, profession_type, specialization, str_number, str_expiry, province, kota, account_type, employer_facility_name, employer_facility_type, employer_website, employer_size)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      email, hashedPassword, full_name, username,
      isEmployer ? 'Pemberi Kerja' : profession_type,
      specialization || null, str_number || null, strExpiry,
      province || null, kota || null,
      isEmployer ? 'employer' : 'nakes',
      employer_facility_name || null, employer_facility_type || null,
      employer_website || null, employer_size || null
    ).run();

    const newId = result.meta.last_row_id;

    const token = generateToken({
      userId: newId,
      email,
      username,
    });

    return NextResponse.json({
      token,
      user: {
        id: newId, email, username, full_name,
        account_type: isEmployer ? 'employer' : 'nakes',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
