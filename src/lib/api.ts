export type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Rejected';

export interface ContactLead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  service_required: string | null;
  budget_range: string | null;
  message: string;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
}

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:4000/api';
const TOKEN_KEY = 'ak_admin_token';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Request failed');
  return body as T;
}

export function hasAdminToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export async function login(email: string, password: string) {
  const result = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(TOKEN_KEY, result.token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function submitLead(lead: Omit<ContactLead, 'id' | 'status' | 'notes' | 'created_at'>) {
  return request<{ lead: ContactLead }>('/leads', {
    method: 'POST',
    body: JSON.stringify(lead),
  });
}

export async function getLeads() {
  const result = await request<{ leads: ContactLead[] }>('/leads');
  return result.leads;
}

export async function updateLead(id: string, patch: Partial<Pick<ContactLead, 'status' | 'notes'>>) {
  return request<{ lead: ContactLead }>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export async function deleteLead(id: string) {
  return request<void>(`/leads/${id}`, { method: 'DELETE' });
}
