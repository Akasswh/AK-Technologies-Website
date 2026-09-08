import { useState, useEffect, useCallback } from 'react';
import {
  LogIn, LogOut, Search, Trash2,
  RefreshCw, Eye, X, Save, AlertCircle, Loader2,
  Users, TrendingUp, Clock, CheckCircle2, XCircle,
  MessageSquare, Building2, Phone, Mail,
  StickyNote
} from 'lucide-react';
import { supabase, type ContactLead, type LeadStatus } from '../lib/supabase';

/* ─── Constants ─────────────────────────────────────────── */

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'In Discussion', 'Converted', 'Rejected'];

const STATUS_META: Record<LeadStatus, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  New:           { color: '#60A5FA', bg: 'rgba(37,99,235,0.15)',   border: 'rgba(37,99,235,0.3)',   icon: Clock },
  Contacted:     { color: '#A78BFA', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)', icon: MessageSquare },
  'In Discussion':{ color: '#FCD34D', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', icon: TrendingUp },
  Converted:     { color: '#34D399', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', icon: CheckCircle2 },
  Rejected:      { color: '#F87171', bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)',  icon: XCircle },
};

const ALL_SERVICES = [
  'AI & Automation', 'Custom Software Engineering', 'Web Development',
  'Mobile Development', 'SaaS Product Development', 'Enterprise Platform',
  'AdmissionOS (Product)', 'Other / Not Sure',
];

/* ─── Helpers ────────────────────────────────────────────── */

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const m = STATUS_META[status];
  const Icon = m.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}
    >
      <Icon size={11} />
      {status}
    </span>
  );
}

/* ─── Login view ─────────────────────────────────────────── */

function LoginView({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) { setError('Email and password are required.'); return; }
    setLoading(true);
    const { error: authErr } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authErr) {
      setError(authErr.message === 'Invalid login credentials'
        ? 'Invalid email or password.'
        : authErr.message);
      setLoading(false);
      return;
    }
    onLogin();
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0A0A0A' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/image.png" alt="AK Technologies Logo" className="h-10 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p className="text-sm" style={{ color: '#64748B' }}>Sign in to manage leads</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-8 rounded-2xl"
          style={{ background: 'rgba(16,24,40,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {error && (
            <div
              className="flex items-start gap-2 px-4 py-3 rounded-xl mb-5 text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <AlertCircle size={15} color="#EF4444" className="flex-shrink-0 mt-0.5" />
              <span style={{ color: '#FCA5A5' }}>{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle}
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-3"
            style={{ opacity: loading ? 0.8 : 1 }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Lead detail drawer ─────────────────────────────────── */

function LeadDrawer({
  lead,
  onClose,
  onUpdate,
  onDelete,
}: {
  lead: ContactLead;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<ContactLead>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await onUpdate(lead.id, { status, notes: notes.trim() || null });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    try {
      await onDelete(lead.id);
      onClose();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Delete failed');
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const m = STATUS_META[status];

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer */}
      <div
        className="w-full max-w-lg flex flex-col h-full overflow-y-auto"
        style={{ background: '#101828', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{ background: '#101828', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <h2 className="font-bold text-white">{lead.full_name}</h2>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{fmt(lead.created_at)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <X size={16} color="#94A3B8" />
          </button>
        </div>

        <div className="flex-1 px-6 py-5 space-y-6">
          {/* Contact info */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#64748B' }}>Contact Info</h3>
            {[
              { icon: Mail, label: 'Email', value: lead.email, href: `mailto:${lead.email}` },
              { icon: Phone, label: 'Phone', value: lead.phone },
              { icon: Building2, label: 'Company', value: lead.company_name },
            ].map(({ icon: Icon, label, value, href }) =>
              value ? (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={13} color="#2563EB" className="flex-shrink-0" />
                  <div>
                    <span className="text-xs" style={{ color: '#64748B' }}>{label}: </span>
                    {href ? (
                      <a href={href} className="text-sm font-medium" style={{ color: '#60A5FA' }}>{value}</a>
                    ) : (
                      <span className="text-sm font-medium text-white">{value}</span>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Project info */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#64748B' }}>Project Details</h3>
            {lead.service_required && (
              <div>
                <span className="text-xs" style={{ color: '#64748B' }}>Service: </span>
                <span className="text-sm text-white font-medium">{lead.service_required}</span>
              </div>
            )}
            {lead.budget_range && (
              <div>
                <span className="text-xs" style={{ color: '#64748B' }}>Budget: </span>
                <span className="text-sm text-white font-medium">{lead.budget_range}</span>
              </div>
            )}
            <div>
              <p className="text-xs mb-1.5" style={{ color: '#64748B' }}>Message</p>
              <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{lead.message}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>Lead Status</label>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => {
                const sm = STATUS_META[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: active ? sm.bg : 'rgba(255,255,255,0.03)',
                      color: active ? sm.color : '#64748B',
                      border: `1px solid ${active ? sm.border : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
              <span className="flex items-center gap-1.5"><StickyNote size={12} />Internal Notes</span>
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this lead..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                resize: 'none',
              }}
            />
          </div>

          {saveError && (
            <div className="flex items-center gap-2 text-sm" style={{ color: '#FCA5A5' }}>
              <AlertCircle size={14} color="#EF4444" />
              {saveError}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-6 py-4 flex items-center justify-between gap-3 sticky bottom-0"
          style={{ background: '#101828', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: confirmDelete ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)',
              color: confirmDelete ? '#F87171' : '#64748B',
              border: `1px solid ${confirmDelete ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {confirmDelete ? 'Confirm Delete' : 'Delete Spam'}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold btn-primary"
            style={{ opacity: saving ? 0.8 : 1 }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Admin component ───────────────────────────────── */

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'All'>('All');
  const [filterService, setFilterService] = useState('All');

  // Selected lead for drawer
  const [selected, setSelected] = useState<ContactLead | null>(null);

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data?.session);
    }).catch(() => {
      setAuthed(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setFetchError(error.message);
    } else {
      setLeads(data as ContactLead[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed, fetchLeads]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpdate = async (id: string, patch: Partial<ContactLead>) => {
    const { error } = await supabase.from('contact_leads').update(patch).eq('id', id);
    if (error) throw new Error(error.message);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, ...patch } : prev);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('contact_leads').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Filter logic
  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || [l.full_name, l.email, l.company_name ?? '', l.service_required ?? '']
      .some((f) => f.toLowerCase().includes(q));
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchService = filterService === 'All' || l.service_required === filterService;
    return matchSearch && matchStatus && matchService;
  });

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'New').length,
    converted: leads.filter((l) => l.status === 'Converted').length,
    inProgress: leads.filter((l) => l.status === 'Contacted' || l.status === 'In Discussion').length,
  };

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <Loader2 size={28} className="animate-spin" color="#2563EB" />
      </div>
    );
  }

  if (!authed) {
    return <LoginView onLogin={() => setAuthed(true)} />;
  }

  const selectStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    appearance: 'none' as const,
  };

  return (
    <div className="min-h-screen" style={{ background: '#080C14' }}>
      {/* Admin header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(8,12,20,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-3">
          <img src="/image.png" alt="AK Technologies Logo" className="h-8 w-auto" />
          <div
            className="hidden sm:block w-px h-5 mx-1"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />
          <span className="hidden sm:block text-sm font-semibold" style={{ color: '#94A3B8' }}>
            Admin Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            title="Refresh"
          >
            <RefreshCw size={14} color="#94A3B8" className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94A3B8',
            }}
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, color: '#2563EB', icon: Users },
            { label: 'New', value: stats.new, color: '#60A5FA', icon: Clock },
            { label: 'In Progress', value: stats.inProgress, color: '#FCD34D', icon: TrendingUp },
            { label: 'Converted', value: stats.converted, color: '#34D399', icon: CheckCircle2 },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold" style={{ color: '#64748B' }}>{label}</span>
                <Icon size={14} color={color} />
              </div>
              <div className="text-3xl font-bold" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          className="flex flex-col sm:flex-row gap-3 mb-6 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={14} color="#64748B" className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={selectStyle}
            />
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as LeadStatus | 'All')}
            className="px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ ...selectStyle, minWidth: '140px' }}
          >
            <option value="All" style={{ background: '#101828' }}>All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} style={{ background: '#101828' }}>{s}</option>
            ))}
          </select>

          {/* Service filter */}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ ...selectStyle, minWidth: '160px' }}
          >
            <option value="All" style={{ background: '#101828' }}>All Services</option>
            {ALL_SERVICES.map((s) => (
              <option key={s} value={s} style={{ background: '#101828' }}>{s}</option>
            ))}
          </select>

          {(search || filterStatus !== 'All' || filterService !== 'All') && (
            <button
              onClick={() => { setSearch(''); setFilterStatus('All'); setFilterService('All'); }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm transition-colors"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>

        {/* Error */}
        {fetchError && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <AlertCircle size={15} color="#EF4444" />
            <span style={{ color: '#FCA5A5' }}>{fetchError}</span>
          </div>
        )}

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {loading && leads.length === 0 ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 size={20} className="animate-spin" color="#2563EB" />
              <span style={{ color: '#64748B' }}>Loading leads...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Users size={36} color="#1e3a5f" className="mb-3" />
              <p className="font-medium text-white mb-1">
                {leads.length === 0 ? 'No leads yet' : 'No leads match your filters'}
              </p>
              <p className="text-sm" style={{ color: '#64748B' }}>
                {leads.length === 0
                  ? 'Submissions from the contact form will appear here.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Name', 'Email', 'Service', 'Budget', 'Status', 'Date', ''].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: '#64748B' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => (
                      <tr
                        key={lead.id}
                        className="transition-colors cursor-pointer"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                        onClick={() => setSelected(lead)}
                      >
                        <td className="px-5 py-4">
                          <div className="font-semibold text-white">{lead.full_name}</div>
                          {lead.company_name && (
                            <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{lead.company_name}</div>
                          )}
                        </td>
                        <td className="px-5 py-4" style={{ color: '#94A3B8' }}>{lead.email}</td>
                        <td className="px-5 py-4" style={{ color: '#94A3B8' }}>
                          {lead.service_required ?? <span style={{ color: '#374151' }}>—</span>}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap" style={{ color: '#94A3B8' }}>
                          {lead.budget_range ?? <span style={{ color: '#374151' }}>—</span>}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-xs" style={{ color: '#64748B' }}>
                          {fmt(lead.created_at)}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                            style={{ background: 'rgba(37,99,235,0.1)', color: '#60A5FA' }}
                            onClick={(e) => { e.stopPropagation(); setSelected(lead); }}
                          >
                            <Eye size={11} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                {filtered.map((lead) => (
                  <button
                    key={lead.id}
                    className="w-full text-left px-4 py-4 transition-colors"
                    onClick={() => setSelected(lead)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-semibold text-white text-sm">{lead.full_name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{lead.email}</div>
                      </div>
                      <StatusBadge status={lead.status} />
                    </div>
                    {lead.service_required && (
                      <div className="text-xs" style={{ color: '#94A3B8' }}>{lead.service_required}</div>
                    )}
                    <div className="text-xs mt-1" style={{ color: '#4B5563' }}>{fmt(lead.created_at)}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-xs mt-4 text-center" style={{ color: '#374151' }}>
          {filtered.length} of {leads.length} leads shown
        </p>
      </div>

      {/* Lead detail drawer */}
      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
