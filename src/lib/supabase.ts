import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
