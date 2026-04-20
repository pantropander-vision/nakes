import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const profession = searchParams.get('profession');
  const province = searchParams.get('province');

  let sql = `
    SELECT u.id, u.username, u.full_name, u.profession_type, u.specialization, u.province, u.kota, u.current_workplace, u.bio,
    CASE WHEN sc.id IS NOT NULL THEN 1 ELSE 0 END as is_saved
    FROM users u
    LEFT JOIN saved_candidates sc ON sc.candidate_id = u.id AND sc.employer_id = ?
    WHERE (u.account_type = 'nakes' OR u.account_type IS NULL)
  `;
  const params: (string | number)[] = [payload.userId];

  if (query) {
    sql += ` AND (u.full_name LIKE ? OR u.specialization LIKE ? OR u.current_workplace LIKE ? OR u.profession_type LIKE ?)`;
    const q = `%${query}%`;
    params.push(q, q, q, q);
  }
  if (profession) {
    sql += ' AND u.profession_type = ?';
    params.push(profession);
  }
  if (province) {
    sql += ' AND u.province = ?';
    params.push(province);
  }

  sql += ' ORDER BY u.full_name LIMIT 50';

  const candidates = (await db.prepare(sql).bind(...params).all()).results;
  return NextResponse.json({ candidates });
}
