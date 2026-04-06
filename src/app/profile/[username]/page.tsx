'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';

const PROVINCES = [
  'Aceh','Sumatera Utara','Sumatera Barat','Riau','Kepulauan Riau','Jambi',
  'Sumatera Selatan','Bangka Belitung','Bengkulu','Lampung','DKI Jakarta',
  'Jawa Barat','Banten','Jawa Tengah','DI Yogyakarta','Jawa Timur',
  'Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara',
  'Sulawesi Utara','Gorontalo','Sulawesi Tengah','Sulawesi Selatan','Sulawesi Barat','Sulawesi Tenggara',
  'Bali','Nusa Tenggara Barat','Nusa Tenggara Timur',
  'Maluku','Maluku Utara','Papua','Papua Barat','Papua Selatan','Papua Tengah','Papua Pegunungan'
];

const FACILITY_TYPES = [
  'RS Tipe A','RS Tipe B','RS Tipe C','RS Tipe D',
  'Puskesmas','Klinik Pratama','Klinik Utama','Praktik Mandiri',
  'Apotek','Laboratorium','Posyandu','Lainnya'
];

const ASSOCIATIONS = ['IDI','PPNI','IBI','IAI','IAKMI','PAFI','IFI','IOPI','IRTI','PARI','PORMIKI','PERSAGI','HAKLI'];

interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  profession_type: string;
  specialization: string | null;
  str_number: string | null;
  str_expiry: string | null;
  str_status: string | null;
  sip_number: string | null;
  sip_facility: string | null;
  skp_credits: number;
  professional_association: string | null;
  province: string | null;
  kota: string | null;
  current_workplace: string | null;
  current_workplace_type: string | null;
  bio: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
}

interface Experience {
  id: number;
  title: string;
  facility_name: string;
  facility_type: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  description: string | null;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_year: number | null;
  end_year: number | null;
}

interface Skill {
  id: number;
  name: string;
  endorsements: number;
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [connectionCount, setConnectionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Record<string, string>>({});

  useEffect(() => {
    api.getProfile(username)
      .then(data => {
        setProfile(data.user);
        setExperiences(data.experiences);
        setEducation(data.education);
        setSkills(data.skills);
        setConnectionCount(data.connectionCount);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  const openEdit = () => {
    if (!profile) return;
    setEditForm({
      full_name: profile.full_name || '',
      specialization: profile.specialization || '',
      bio: profile.bio || '',
      phone: profile.phone || '',
      current_workplace: profile.current_workplace || '',
      current_workplace_type: profile.current_workplace_type || '',
      province: profile.province || '',
      kota: profile.kota || '',
      str_number: profile.str_number || '',
      str_expiry: profile.str_expiry || '',
      str_status: profile.str_status || 'Aktif',
      sip_number: profile.sip_number || '',
      sip_facility: profile.sip_facility || '',
      skp_credits: String(profile.skp_credits || 0),
      professional_association: profile.professional_association || '',
    });
    setEditOpen(true);
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      await api.updateProfile(editForm);
      const data = await api.getProfile(username);
      setProfile(data.user);
      setEditOpen(false);
    } catch {
      alert('Gagal menyimpan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center text-gray-500">Profil tidak ditemukan</div>;

  const isOwn = authUser?.username === profile.username;
  const strActive = profile.str_status === 'Aktif';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-accent" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 -mt-12">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary text-3xl font-bold border-4 border-white shadow">
              {profile.full_name?.charAt(0)}
            </div>
            <div className="flex-1 pt-2 sm:pt-14">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                  <p className="text-primary font-medium">
                    {profile.profession_type}
                    {profile.specialization && ` - ${profile.specialization}`}
                  </p>
                  {profile.current_workplace && (
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.current_workplace}
                      {profile.current_workplace_type && ` (${profile.current_workplace_type})`}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-1">
                    {[profile.kota, profile.province].filter(Boolean).join(', ')}
                    {connectionCount > 0 && ` · ${connectionCount} koneksi`}
                  </p>
                </div>
                {isOwn ? (
                  <button
                    onClick={openEdit}
                    className="flex items-center gap-2 border border-primary text-primary text-sm px-5 py-2 rounded-lg hover:bg-primary-50 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profil
                  </button>
                ) : authUser && (
                  <button
                    onClick={() => api.sendConnection(profile.id).catch(() => {})}
                    className="bg-primary text-white text-sm px-5 py-2 rounded-lg hover:bg-primary-600 transition"
                  >
                    Hubungkan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-2">Tentang</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
        </div>
      )}

      {/* Regulatory Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Informasi Regulasi</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {profile.str_number && (
            <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${strActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">STR (Surat Tanda Registrasi)</p>
                <p className="text-sm font-medium">{profile.str_number}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${strActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {profile.str_status}
                  </span>
                  {profile.str_expiry && (
                    <span className="text-xs text-gray-400">s/d {profile.str_expiry}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {profile.sip_number && (
            <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center text-accent shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">SIP (Surat Izin Praktik)</p>
                <p className="text-sm font-medium">{profile.sip_number}</p>
                {profile.sip_facility && (
                  <p className="text-xs text-gray-400 mt-1">{profile.sip_facility}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">SKP (Satuan Kredit Profesi)</p>
              <p className="text-sm font-medium">{profile.skp_credits} SKP</p>
              <p className="text-xs text-gray-400 mt-1">Kredit terkumpul</p>
            </div>
          </div>

          {profile.professional_association && (
            <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Organisasi Profesi</p>
                <p className="text-sm font-medium">{profile.professional_association}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Pengalaman Kerja</h2>
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{exp.title}</p>
                  <p className="text-sm text-gray-600">{exp.facility_name}{exp.facility_type ? ` (${exp.facility_type})` : ''}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {exp.start_date} - {exp.is_current ? 'Sekarang' : exp.end_date}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  {exp.description && <p className="text-sm text-gray-500 mt-2">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Pendidikan</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.degree}{edu.field_of_study ? ` - ${edu.field_of_study}` : ''}</p>
                  <p className="text-xs text-gray-400 mt-1">{edu.start_year} - {edu.end_year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Keahlian</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium">
                {skill.name}
                {skill.endorsements > 0 && (
                  <span className="ml-1 text-primary-400">({skill.endorsements})</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-900">Edit Profil</h2>
              <button onClick={() => setEditOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-5">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Informasi Dasar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={editForm.full_name || ''}
                      onChange={e => setEditForm(f => ({...f, full_name: e.target.value}))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi / Subspesialisasi</label>
                    <input
                      placeholder="cth: Sp.JP, Sp.A, Ners ICU..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.specialization || ''}
                      onChange={e => setEditForm(f => ({...f, specialization: e.target.value}))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan / Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Ceritakan tentang pengalaman dan keahlian Anda..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      value={editForm.bio || ''}
                      onChange={e => setEditForm(f => ({...f, bio: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp</label>
                    <input
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.phone || ''}
                      onChange={e => setEditForm(f => ({...f, phone: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asosiasi Profesi</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.professional_association || ''}
                      onChange={e => setEditForm(f => ({...f, professional_association: e.target.value}))}
                    >
                      <option value="">Pilih asosiasi</option>
                      {ASSOCIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location & Workplace */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Lokasi & Tempat Kerja</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.province || ''}
                      onChange={e => setEditForm(f => ({...f, province: e.target.value}))}
                    >
                      <option value="">Pilih provinsi</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                    <input
                      placeholder="cth: Jakarta Pusat, Surabaya..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.kota || ''}
                      onChange={e => setEditForm(f => ({...f, kota: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas Kerja</label>
                    <input
                      placeholder="cth: RSUP Dr. Cipto Mangunkusumo"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.current_workplace || ''}
                      onChange={e => setEditForm(f => ({...f, current_workplace: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Fasilitas</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.current_workplace_type || ''}
                      onChange={e => setEditForm(f => ({...f, current_workplace_type: e.target.value}))}
                    >
                      <option value="">Pilih tipe</option>
                      {FACILITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Regulatory */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">STR, SIP & SKP</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor STR</label>
                    <input
                      placeholder="cth: 1234567890123456"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.str_number || ''}
                      onChange={e => setEditForm(f => ({...f, str_number: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Masa Berlaku STR</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.str_expiry || ''}
                      onChange={e => setEditForm(f => ({...f, str_expiry: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status STR</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.str_status || 'Aktif'}
                      onChange={e => setEditForm(f => ({...f, str_status: e.target.value}))}
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Expired">Expired</option>
                      <option value="Proses Perpanjangan">Proses Perpanjangan</option>
                      <option value="Belum Memiliki">Belum Memiliki</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKP Terkumpul</label>
                    <input
                      type="number"
                      min="0"
                      max="200"
                      placeholder="cth: 12"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.skp_credits || ''}
                      onChange={e => setEditForm(f => ({...f, skp_credits: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIP</label>
                    <input
                      placeholder="Nomor Surat Izin Praktik"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.sip_number || ''}
                      onChange={e => setEditForm(f => ({...f, sip_number: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fasilitas SIP</label>
                    <input
                      placeholder="Nama fasilitas tempat SIP diterbitkan"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={editForm.sip_facility || ''}
                      onChange={e => setEditForm(f => ({...f, sip_facility: e.target.value}))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setEditOpen(false)}
                className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
