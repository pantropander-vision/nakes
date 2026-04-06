'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Post {
  id: number;
  content: string;
  likes: number;
  comments_count: number;
  created_at: string;
  full_name: string;
  username: string;
  avatar_url: string | null;
  profession_type: string;
  specialization: string | null;
  current_workplace: string | null;
}

interface Job {
  id: number;
  title: string;
  facility_name: string;
  location: string;
  employment_type: string;
}

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      api.getPosts().then(data => setPosts(data.posts)).catch(() => {});
      api.getJobs().then(data => setJobs(data.jobs.slice(0, 3))).catch(() => {});
    }
  }, [user]);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    try {
      const data = await api.createPost(newPost);
      setPosts(prev => [data.post, ...prev]);
      setNewPost('');
    } catch {
      // ignore
    } finally {
      setPosting(false);
    }
  };

  if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}j lalu`;
    const days = Math.floor(hours / 24);
    return `${days}h lalu`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main Feed */}
        <div className="space-y-4">
          {/* Create Post */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">
                {user.full_name?.charAt(0)}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Bagikan pemikiran atau pengalaman klinis Anda..."
                  className="w-full resize-none border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition min-h-[80px]"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCreatePost}
                    disabled={posting || !newPost.trim()}
                    className="bg-primary text-white text-sm px-5 py-2 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
                  >
                    {posting ? 'Memposting...' : 'Posting'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
              <p className="text-lg mb-2">Belum ada postingan</p>
              <p className="text-sm">Jadilah yang pertama membagikan sesuatu!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border p-5">
                <div className="flex gap-3">
                  <Link href={`/profile/${post.username}`}>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold shrink-0">
                      {post.full_name?.charAt(0)}
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/profile/${post.username}`} className="font-semibold text-gray-900 hover:text-primary transition">
                          {post.full_name}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {post.profession_type}{post.specialization ? ` - ${post.specialization}` : ''}
                          {post.current_workplace ? ` di ${post.current_workplace}` : ''}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex gap-6 mt-4 pt-3 border-t">
                      <button className="text-xs text-gray-500 hover:text-primary transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                        Suka {post.likes > 0 && `(${post.likes})`}
                      </button>
                      <button className="text-xs text-gray-500 hover:text-primary transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Komentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto">
                {user.full_name?.charAt(0)}
              </div>
              <Link href={`/profile/${user.username}`} className="font-semibold text-gray-900 hover:text-primary mt-3 block">
                {user.full_name}
              </Link>
              <p className="text-xs text-gray-500 mt-1">{user.profession_type}</p>
            </div>
          </div>

          {/* Job Suggestions */}
          {jobs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Lowongan Terbaru</h3>
              <div className="space-y-3">
                {jobs.map(job => (
                  <Link key={job.id} href="/jobs" className="block group">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.facility_name} - {job.location}</p>
                    <span className="inline-block mt-1 text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">{job.employment_type}</span>
                  </Link>
                ))}
              </div>
              <Link href="/jobs" className="text-sm text-primary font-medium mt-4 block hover:underline">
                Lihat semua lowongan →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
