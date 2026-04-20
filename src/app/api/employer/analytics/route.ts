import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const payload = await getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  const activeJobs = await db.prepare('SELECT COUNT(*) as count FROM jobs WHERE posted_by = ? AND is_active = 1').bind(payload.userId).first<{ count: number }>();
  const totalApps = await db.prepare('SELECT COUNT(*) as count FROM job_applications ja JOIN jobs j ON j.id = ja.job_id WHERE j.posted_by = ?').bind(payload.userId).first<{ count: number }>();

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const newThisWeek = await db.prepare('SELECT COUNT(*) as count FROM job_applications ja JOIN jobs j ON j.id = ja.job_id WHERE j.posted_by = ? AND ja.applied_at >= ?').bind(payload.userId, oneWeekAgo).first<{ count: number }>();

  const savedCount = await db.prepare('SELECT COUNT(*) as count FROM saved_candidates WHERE employer_id = ?').bind(payload.userId).first<{ count: number }>();

  const recentApps = (await db.prepare(`
    SELECT ja.id, ja.status, ja.applied_at, j.title as job_title, u.full_name as applicant_name, u.profession_type as applicant_profession
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    JOIN users u ON u.id = ja.applicant_id
    WHERE j.posted_by = ?
    ORDER BY ja.applied_at DESC
    LIMIT 10
  `).bind(payload.userId).all()).results;

  const statusRows = (await db.prepare(`
    SELECT ja.status, COUNT(*) as count
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE j.posted_by = ?
    GROUP BY ja.status
  `).bind(payload.userId).all()).results as Array<{ status: string; count: number }>;
  const applicationsByStatus: Record<string, number> = {};
  statusRows.forEach(r => { applicationsByStatus[r.status] = r.count; });

  const monthRows = (await db.prepare(`
    SELECT strftime('%Y-%m', ja.applied_at) as month, COUNT(*) as count
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE j.posted_by = ?
    GROUP BY month
    ORDER BY month DESC
    LIMIT 6
  `).bind(payload.userId).all()).results as Array<{ month: string; count: number }>;

  const jobsRaw = (await db.prepare(`
    SELECT j.id, j.title, COUNT(ja.id) as application_count
    FROM jobs j
    LEFT JOIN job_applications ja ON ja.job_id = j.id
    WHERE j.posted_by = ?
    GROUP BY j.id
    ORDER BY application_count DESC
  `).bind(payload.userId).all()).results as Array<{ id: number; title: string; application_count: number }>;

  const jobsBreakdown = await Promise.all(jobsRaw.map(async (job) => {
    const counts = (await db.prepare('SELECT status, COUNT(*) as count FROM job_applications WHERE job_id = ? GROUP BY status').bind(job.id).all()).results as Array<{ status: string; count: number }>;
    const statusCounts: Record<string, number> = {};
    counts.forEach(c => { statusCounts[c.status] = c.count; });
    return { ...job, status_counts: statusCounts };
  }));

  return NextResponse.json({
    stats: {
      active_jobs: activeJobs?.count ?? 0,
      total_applications: totalApps?.count ?? 0,
      new_this_week: newThisWeek?.count ?? 0,
      saved_candidates: savedCount?.count ?? 0,
    },
    recent_applications: recentApps,
    applications_by_status: applicationsByStatus,
    applications_by_month: monthRows.reverse(),
    jobs_breakdown: jobsBreakdown,
  });
}
