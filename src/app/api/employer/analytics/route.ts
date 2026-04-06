import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = getUserFromRequest(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  const activeJobs = db.prepare('SELECT COUNT(*) as count FROM jobs WHERE posted_by = ? AND is_active = 1').get(payload.userId) as { count: number };
  const totalApps = db.prepare('SELECT COUNT(*) as count FROM job_applications ja JOIN jobs j ON j.id = ja.job_id WHERE j.posted_by = ?').get(payload.userId) as { count: number };

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const newThisWeek = db.prepare('SELECT COUNT(*) as count FROM job_applications ja JOIN jobs j ON j.id = ja.job_id WHERE j.posted_by = ? AND ja.applied_at >= ?').get(payload.userId, oneWeekAgo) as { count: number };

  const savedCount = db.prepare('SELECT COUNT(*) as count FROM saved_candidates WHERE employer_id = ?').get(payload.userId) as { count: number };

  // Recent applications
  const recentApps = db.prepare(`
    SELECT ja.id, ja.status, ja.applied_at, j.title as job_title, u.full_name as applicant_name, u.profession_type as applicant_profession
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    JOIN users u ON u.id = ja.applicant_id
    WHERE j.posted_by = ?
    ORDER BY ja.applied_at DESC
    LIMIT 10
  `).all(payload.userId);

  // Applications by status
  const statusRows = db.prepare(`
    SELECT ja.status, COUNT(*) as count
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE j.posted_by = ?
    GROUP BY ja.status
  `).all(payload.userId) as Array<{ status: string; count: number }>;
  const applicationsByStatus: Record<string, number> = {};
  statusRows.forEach(r => { applicationsByStatus[r.status] = r.count; });

  // Applications by month
  const monthRows = db.prepare(`
    SELECT strftime('%Y-%m', ja.applied_at) as month, COUNT(*) as count
    FROM job_applications ja
    JOIN jobs j ON j.id = ja.job_id
    WHERE j.posted_by = ?
    GROUP BY month
    ORDER BY month DESC
    LIMIT 6
  `).all(payload.userId) as Array<{ month: string; count: number }>;

  // Jobs breakdown
  const jobsRaw = db.prepare(`
    SELECT j.id, j.title, COUNT(ja.id) as application_count
    FROM jobs j
    LEFT JOIN job_applications ja ON ja.job_id = j.id
    WHERE j.posted_by = ?
    GROUP BY j.id
    ORDER BY application_count DESC
  `).all(payload.userId) as Array<{ id: number; title: string; application_count: number }>;

  const jobsBreakdown = jobsRaw.map(job => {
    const statusCounts: Record<string, number> = {};
    const counts = db.prepare('SELECT status, COUNT(*) as count FROM job_applications WHERE job_id = ? GROUP BY status').all(job.id) as Array<{ status: string; count: number }>;
    counts.forEach(c => { statusCounts[c.status] = c.count; });
    return { ...job, status_counts: statusCounts };
  });

  return NextResponse.json({
    stats: {
      active_jobs: activeJobs.count,
      total_applications: totalApps.count,
      new_this_week: newThisWeek.count,
      saved_candidates: savedCount.count,
    },
    recent_applications: recentApps,
    applications_by_status: applicationsByStatus,
    applications_by_month: monthRows.reverse(),
    jobs_breakdown: jobsBreakdown,
  });
}
