import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

type D1Db = ReturnType<typeof import('@/lib/db').getDb>;

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_admin: number;
}

// Mengembalikan user admin yang sedang login, atau null jika bukan admin
export async function requireAdmin(request: NextRequest, db: D1Db): Promise<AdminUser | null> {
  const payload = await getUserFromRequest(request);
  if (!payload) return null;

  const user = await db.prepare('SELECT id, username, email, is_admin FROM users WHERE id = ?')
    .bind(payload.userId).first<AdminUser>();

  if (!user || !user.is_admin) return null;
  return user;
}
