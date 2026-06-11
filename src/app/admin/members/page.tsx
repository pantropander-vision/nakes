'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Member {
  id: number;
  username: string;
  email: string;
  full_name: string;
  profession_type: string;
  account_type: string;
  is_admin: number;
  province: string | null;
  kota: string | null;
  employer_facility_name: string | null;
  created_at: string;
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('nakes_token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Member | null>(null);
  const [editForm, setEditForm] = useState({ full_name: '', email: '', username: '', account_type: 'nakes' });
  const [resetting, setResetting] = useState<Member | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchMembers = useCallback(async (q?: string) => {
    setLoading(true);
    try {
      const qs = q ? `?q=${encodeURIComponent(q)}` : '';
      const res = await fetch(`/api/admin/users${qs}`, { headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMembers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat member');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const flash = (msg: string) => {
    setMessage(msg);
    setError('');
    setTimeout(() => setMessage(''), 4000);
  };

  const updateMember = async (id: number, body: Record<string, unknown>, successMsg: string) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT', headers: authHeaders(), body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      flash(successMsg);
      setEditing(null);
      setResetting(null);
      setNewPassword('');
      fetchMembers(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (member: Member) => {
    if (!confirm(`Hapus member "${member.full_name}" (${member.email})? Semua data terkait (lowongan, lamaran, postingan) ikut terhapus dan tidak bisa dikembalikan.`)) return;
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${member.id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      flash('Member berhasil dihapus');
      fetchMembers(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus member');
    }
  };

  const toggleAdmin = (member: Member) => {
    const makeAdmin = member.is_admin ? 0 : 1;
    const verb = makeAdmin ? 'menjadikan' : 'mencabut role admin dari';
    if (!confirm(`Yakin ${verb} "${member.full_name}"?`)) return;
    updateMember(member.id, { is_admin: makeAdmin }, makeAdmin ? 'Member dijadikan admin' : 'Role admin dicabut');
  };

  const openEdit = (member: Member) => {
    setEditForm({
      full_name: member.full_name,
      email: member.email,
      username: member.username,
      account_type: member.account_type || 'nakes',
    });
    setEditing(member);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Member</h1>
        <p className="text-gray-500 text-sm mt-1">Edit, hapus, reset password, dan atur role admin member</p>
      </div>

      {message && <div className="mb-4 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 flex gap-3">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchMembers(query)}
          placeholder="Cari nama, email, atau username..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
        <button onClick={() => fetchMembers(query)}
          className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition">
          Cari
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs text-gray-500 uppercase">
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Tipe Akun</th>
                <th className="px-4 py-3">Lokasi</th>
                <th className="px-4 py-3">Terdaftar</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/profile/${m.username}`} className="font-medium text-gray-900 hover:text-primary">
                      {m.full_name}
                    </Link>
                    {m.is_admin ? (
                      <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
                    ) : null}
                    <p className="text-xs text-gray-500">{m.email} · @{m.username}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.account_type === 'employer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {m.account_type === 'employer' ? 'Pemberi Kerja' : 'Nakes'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{m.account_type === 'employer' ? (m.employer_facility_name || '-') : m.profession_type}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{[m.kota, m.province].filter(Boolean).join(', ') || '-'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(m.created_at).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5 flex-wrap">
                      <button onClick={() => openEdit(m)}
                        className="text-xs border border-gray-300 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition">
                        Edit
                      </button>
                      <button onClick={() => setResetting(m)}
                        className="text-xs border border-yellow-300 text-yellow-700 px-2.5 py-1.5 rounded-lg hover:bg-yellow-50 transition">
                        Reset Password
                      </button>
                      <button onClick={() => toggleAdmin(m)}
                        className="text-xs border border-purple-300 text-purple-700 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 transition">
                        {m.is_admin ? 'Cabut Admin' : 'Jadikan Admin'}
                      </button>
                      <button onClick={() => deleteMember(m)}
                        className="text-xs border border-red-300 text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">Tidak ada member ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Member: {editing.full_name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input value={editForm.full_name} onChange={e => setEditForm(f => ({ ...f, full_name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input value={editForm.username} onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Akun</label>
                <select value={editForm.account_type} onChange={e => setEditForm(f => ({ ...f, account_type: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                  <option value="nakes">Nakes (Tenaga Kesehatan)</option>
                  <option value="employer">Pemberi Kerja</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button disabled={saving}
                onClick={() => updateMember(editing.id, editForm, 'Member berhasil diperbarui')}
                className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50">
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button onClick={() => setEditing(null)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Reset Password</h3>
            <p className="text-sm text-gray-500 mb-4">{resetting.full_name} ({resetting.email})</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input
                type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="Minimal 6 karakter"
              />
              <p className="text-xs text-gray-400 mt-1">Sampaikan password baru ini ke member yang bersangkutan.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button disabled={saving || newPassword.length < 6}
                onClick={() => updateMember(resetting.id, { new_password: newPassword }, `Password ${resetting.full_name} berhasil direset`)}
                className="flex-1 bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50">
                {saving ? 'Menyimpan...' : 'Reset Password'}
              </button>
              <button onClick={() => { setResetting(null); setNewPassword(''); }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
