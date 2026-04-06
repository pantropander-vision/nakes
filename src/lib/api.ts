const API_BASE = '';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('nakes_token');
}

async function fetchApi(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan');
  return data;
}

export const api = {
  login: (email: string, password: string) =>
    fetchApi('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: Record<string, string>) =>
    fetchApi('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchApi('/api/auth/me'),
  getPosts: () => fetchApi('/api/posts'),
  createPost: (content: string) =>
    fetchApi('/api/posts', { method: 'POST', body: JSON.stringify({ content }) }),
  getJobs: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi(`/api/jobs${qs}`);
  },
  getConnections: () => fetchApi('/api/connections'),
  sendConnection: (receiver_id: number) =>
    fetchApi('/api/connections', { method: 'POST', body: JSON.stringify({ receiver_id }) }),
  respondConnection: (connection_id: number, action: string) =>
    fetchApi('/api/connections', { method: 'POST', body: JSON.stringify({ connection_id, action }) }),
  getProfile: (username: string) => fetchApi(`/api/profile?username=${username}`),
  updateProfile: (data: Record<string, string>) =>
    fetchApi('/api/profile', { method: 'PUT', body: JSON.stringify(data) }),
  search: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return fetchApi(`/api/search?${qs}`);
  },
};
