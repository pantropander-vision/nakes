'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isEmployer = user?.account_type === 'employer';

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const nakesLinks = [
    { href: '/home', label: 'Beranda' },
    { href: '/network', label: 'Jaringan' },
    { href: '/jobs', label: 'Lowongan' },
    { href: '/search', label: 'Cari' },
  ];

  const employerLinks = [
    { href: '/employer/dashboard', label: 'Dashboard' },
    { href: '/employer/post-job', label: 'Pasang Lowongan' },
    { href: '/employer/jobs', label: 'Lowongan Saya' },
    { href: '/employer/candidates', label: 'Kandidat' },
  ];

  const navLinks = isEmployer ? employerLinks : nakesLinks;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href={user ? (isEmployer ? '/employer/dashboard' : '/home') : '/'} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-primary">Nakes</span>
              {isEmployer && (
                <span className="text-xs bg-primary-100 text-primary px-2 py-0.5 rounded-full font-medium">Employer</span>
              )}
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                  <NavLink key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                    {user.full_name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm text-gray-700">{user.full_name?.split(' ')[0]}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    {isEmployer ? (
                      <>
                        <Link
                          href="/employer/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setMenuOpen(false)}
                        >
                          Profil Perusahaan
                        </Link>
                        <Link
                          href="/employer/analytics"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setMenuOpen(false)}
                        >
                          Analitik
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/profile/${user.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profil Saya
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-gray-600 hover:text-primary transition">
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-600 transition"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {user && (
          <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-600 hover:text-primary hover:bg-primary-50 px-3 py-2 rounded-lg transition whitespace-nowrap"
    >
      {label}
    </Link>
  );
}
