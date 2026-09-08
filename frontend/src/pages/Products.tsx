import { useEffect, useRef, useState } from 'react';
import {
  Brain, BarChart3, Users, Database, Layers, MessageSquare,
  ArrowRight, Zap, Shield, Globe, Clock, ShieldCheck,
  Workflow, ScrollText, CheckCircle2, Monitor, Printer,
  Sparkles, SlidersHorizontal, Image as ImageIcon
} from 'lucide-react';

interface ProductsProps {
  onNavigate: (page: string) => void;
}

function ChurchIcon({ size = 20, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v4" />
      <path d="M10 4h4" />
      <path d="M12 6L4 12v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9L12 6z" />
      <path d="M10 22v-5a2 2 0 0 1 4 0v5" />
      <circle cx="12" cy="11" r="1.5" />
    </svg>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Mass Intention Categories ────────────────────────── */
const intentionCategories = [
  { id: 'all', name: 'All Intentions', count: 486, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  { id: 'thanksgiving', name: 'Thanksgiving', count: 142, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  { id: 'health', name: 'Good Health', count: 98, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' },
  { id: 'education', name: 'Education', count: 64, color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
  { id: 'rip', name: 'Rest In Peace (RIP)', count: 57, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  { id: 'wellbeing', name: 'Well Being', count: 43, color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
  { id: 'marriage', name: 'Marriage', count: 32, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  { id: 'promotion', name: 'Promotion', count: 21, color: '#14B8A6', bg: 'rgba(20,184,166,0.12)' },
  { id: 'children', name: 'Children', count: 18, color: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
  { id: 'others', name: 'Others', count: 11, color: '#94A3B8', bg: 'rgba(148,163,184,0.12)' },
];

/* ── Sample Mock Intentions for Interactive Table ─────── */
const mockIntentions = [
  {
    id: 'INT-8901',
    devotee: 'Joseph & Maria Fernandes',
    category: 'Thanksgiving',
    categoryId: 'thanksgiving',
    time: '08:30 AM',
    channel: 'Channel 1 (Main Altar)',
    status: 'Completed',
    statusColor: '#10B981',
    receipt: 'RCP-4821',
  },
  {
    id: 'INT-8902',
    devotee: 'Grace David & Family',
    category: 'Good Health',
    categoryId: 'health',
    time: '09:30 AM',
    channel: 'Channel 2 (Shrine Grotto)',
    status: 'Celebrated',
    statusColor: '#10B981',
    receipt: 'RCP-4822',
  },
  {
    id: 'INT-8903',
    devotee: 'Anthony Raj & Children',
    category: 'Education',
    categoryId: 'education',
    time: '11:00 AM',
    channel: 'Channel 1 (Main Altar)',
    status: 'In Progress',
    statusColor: '#06B6D4',
    receipt: 'RCP-4823',
  },
  {
    id: 'INT-8904',
    devotee: 'Late Emmanuel Kurian',
    category: 'Rest In Peace (RIP)',
    categoryId: 'rip',
    time: '12:00 PM',
    channel: 'Channel 3 (Chapel)',
    status: 'Confirmed',
    statusColor: '#8B5CF6',
    receipt: 'RCP-4824',
  },
  {
    id: 'INT-8905',
    devotee: 'Francis & Rosy Xavier',
    category: 'Well Being',
    categoryId: 'wellbeing',
    time: '05:30 PM',
    channel: 'Channel 4 (Evening Mass)',
    status: 'Scheduled',
    statusColor: '#3B82F6',
    receipt: 'RCP-4825',
  },
  {
    id: 'INT-8906',
    devotee: 'Paul & Sneha - 10th Anniv.',
    category: 'Marriage',
    categoryId: 'marriage',
    time: '06:30 PM',
    channel: 'Channel 1 (Main Altar)',
    status: 'Confirmed',
    statusColor: '#F59E0B',
    receipt: 'RCP-4826',
  },
];

/* ── 4 Core Pillars with Requested Icons ─────────────── */
const churchPillars = [
  {
    icon: ChurchIcon,
    title: 'Church Management',
    desc: 'Custom-built for Gunadala Matha Shrine to manage mass schedules, liturgical intentions, and celebrant assignments.',
    color: '#06B6D4',
  },
  {
    icon: ShieldCheck,
    title: 'Super Admin Control',
    desc: 'Centralized administration with role-based permissions, counter oversight, and multi-channel governance.',
    color: '#3B82F6',
  },
  {
    icon: Workflow,
    title: 'Channel Workflows',
    desc: 'Automated distribution to specific altars and mass slots with real-time status tracking and completion verification.',
    color: '#8B5CF6',
  },
  {
    icon: ScrollText,
    title: 'Digital Records & Print',
    desc: 'Instant receipt generation, print queues, customer confirmation screens, and audit-ready digital archives.',
    color: '#10B981',
  },
];

/* ── Mass Intention Key Features ──────────────────────── */
const churchKeyFeatures = [
  {
    title: 'Centralized Super Admin Dashboard',
    desc: 'High-level command center displaying real-time intention volumes, active altar channels, celebrant schedules, and daily metrics.',
    icon: SlidersHorizontal,
    color: '#3B82F6',
  },
  {
    title: 'Intention Creation & Management',
    desc: 'Fast-entry counter portal allowing operators to book intentions with devotee names, dates, times, and specific prayer petitions.',
    icon: ScrollText,
    color: '#06B6D4',
  },
  {
    title: 'Multiple Intention Categories',
    desc: 'Structured categorization across 9 dedicated categories: Thanksgiving, Good Health, Education, RIP, Well Being, Marriage, Promotion, Children, and Others.',
    icon: Sparkles,
    color: '#8B5CF6',
  },
  {
    title: 'Channel-Based Intention Distribution',
    desc: 'Intelligent routing distributing intentions directly to designated shrine channels, main altars, grottoes, or specialized services.',
    icon: Workflow,
    color: '#10B981',
  },
  {
    title: 'Real-Time Status Tracking',
    desc: 'Live tracking of each intention through submitted, assigned, confirmed, celebrated, and archived states.',
    icon: Clock,
    color: '#F59E0B',
  },
  {
    title: 'Completion & Rejection Workflow',
    desc: 'Structured liturgical review enabling church administrators and celebrants to confirm completed masses or flag conflicts with notes.',
    icon: CheckCircle2,
    color: '#EC4899',
  },
  {
    title: 'Customer Confirmation Display Screen',
    desc: 'Public-facing kiosk and monitor display screen enabling devotees to verify their scheduled intention in real time.',
    icon: Monitor,
    color: '#06B6D4',
  },
  {
    title: 'Receipt & Print Management',
    desc: 'Automated receipt generation with thermal print support, transaction tokens, shrine headers, and fast reprint capabilities.',
    icon: Printer,
    color: '#3B82F6',
  },
  {
    title: 'Secure Role-Based Access Control',
    desc: 'Granular permissions protecting sensitive records between counter clerks, supervisors, sacristans, and shrine leadership.',
    icon: Shield,
    color: '#8B5CF6',
  },
  {
    title: 'Church-Friendly User Interface',
    desc: 'Streamlined, high-contrast, dark-mode friendly UI crafted for ease of use by church staff during high-density festival crowds.',
    icon: ChurchIcon,
    color: '#10B981',
  },
  {
    title: 'Digital Record Maintenance',
    desc: 'Tamper-proof digital archiving that permanently replaces paper registers with instant search, filters, and historical export.',
    icon: Database,
    color: '#F59E0B',
  },
];

/* ── Business Impact ──────────────────────────────────── */
const churchBusinessImpacts = [
  {
    metric: '100%',
    title: 'Reduced Manual Paperwork',
    desc: 'Completely replaced loose paper slips and handwritten registers with an organized digital repository.',
    color: '#10B981',
  },
  {
    metric: 'Real-Time',
    title: 'Improved Intention Tracking',
    desc: 'End-to-end status visibility from front-office counter booking directly to the priest at the altar.',
    color: '#06B6D4',
  },
  {
    metric: '4x',
    title: 'Faster Request Processing',
    desc: 'Sub-second counter entries with automatic channel allocation and instant thermal receipt printing.',
    color: '#3B82F6',
  },
  {
    metric: 'Zero Latency',
    title: 'Better Department Communication',
    desc: 'Real-time synchronization between administrative desks, sacristy teams, and altar celebrants.',
    color: '#8B5CF6',
  },
  {
    metric: 'Maximized',
    title: 'Increased Operational Efficiency',
    desc: 'Eliminated duplicate bookings, prevented lost intention slips, and streamlined mass reconciliation.',
    color: '#F59E0B',
  },
  {
    metric: 'Complete',
    title: 'Digitized Church Workflow',
    desc: 'A permanent digital transformation modernizing daily church administration for Gunadala Matha Shrine.',
    color: '#EC4899',
  },
];

/* ── Screenshot & Gallery Placeholders ────────────────── */
const galleryPlaceholders = [
  {
    title: 'Super Admin Command Dashboard',
    tag: 'Admin & Oversight',
    desc: 'High-level view of daily mass schedules, altar channel queues, active counter staff, and statistical summaries.',
    accent: '#3B82F6',
  },
  {
    title: 'Intention Booking & Multi-Category Selector',
    tag: 'Counter Operations',
    desc: 'Fast desk booking UI with quick category selection, devotee contact inputs, and date/slot pickers.',
    accent: '#06B6D4',
  },
  {
    title: 'Customer Confirmation Display Screen',
    tag: 'Devotee Display Mode',
    desc: 'Public-facing screen layout displaying verified mass intentions, scheduled times, and altar channels.',
    accent: '#8B5CF6',
  },
  {
    title: 'Receipt & Print Management Center',
    tag: 'Thermal & Digital Print',
    desc: 'Integrated receipt template engine with auto-generated verification tokens, church crest, and history log.',
    accent: '#10B981',
  },
];

const admissionFeatures = [
  {
    icon: Users,
    color: '#2563EB',
    title: 'Lead Management',
    desc: 'Capture and nurture every prospective student from first inquiry through enrollment with intelligent pipeline management.',
  },
  {
    icon: Brain,
    color: '#06B6D4',
    title: 'AI-Powered Matching',
    desc: 'AI recommendations that match students to the right programs based on profile, aspirations, and historical outcomes.',
  },
  {
    icon: BarChart3,
    color: '#8B5CF6',
    title: 'Analytics & Reporting',
    desc: 'Real-time dashboards showing enrollment trends, counselor performance, conversion funnels, and revenue forecasts.',
  },
  {
    icon: MessageSquare,
    color: '#10B981',
    title: 'Communication Hub',
    desc: 'Automated follow-up sequences, bulk messaging, WhatsApp integration, and email campaigns from one place.',
  },
  {
    icon: Database,
    color: '#F59E0B',
    title: 'Document Management',
    desc: 'Secure document collection, verification workflows, and compliance tracking throughout the application process.',
  },
  {
    icon: Layers,
    color: '#EF4444',
    title: 'Multi-Branch Support',
    desc: 'Manage multiple offices, counselors, and geographies from a single platform with role-based access control.',
  },
];

const roadmapProducts = [
  {
    name: 'ClinicOS',
    status: 'In Development',
    statusColor: '#06B6D4',
    desc: 'An AI-powered clinic and patient management platform for healthcare providers and multi-specialty clinics.',
    tags: ['Healthcare', 'AI', 'EHR'],
  },
  {
    name: 'OperateHQ',
    status: 'Planned',
    statusColor: '#8B5CF6',
    desc: 'A unified business operations platform combining project management, team collaboration, and financial oversight.',
    tags: ['Operations', 'SaaS', 'Enterprise'],
  },
  {
    name: 'LogiFlow',
    status: 'Planned',
    statusColor: '#8B5CF6',
    desc: 'End-to-end logistics and supply chain management with real-time tracking and AI-driven route optimization.',
    tags: ['Logistics', 'AI', 'Mobile'],
  },
];

export default function Products({ onNavigate }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredIntentions = selectedCategory === 'all'
    ? mockIntentions
    : mockIntentions.filter(item => item.categoryId === selectedCategory);

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn>
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Products & Delivered Platforms
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Software Products Built for{' '}
              <span className="text-gradient">Specific Domains</span>
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed" style={{ color: '#94A3B8' }}>
              AK Technologies designs, builds, and deploys high-impact enterprise software products — custom-engineered for institutions and industries that demand precision, reliability, and modern workflows.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED PRODUCT: MASS INTENTION MANAGEMENT SYSTEM
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 relative" style={{ background: '#080C14', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Ambient Glows */}
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          {/* Top Featured Ribbon */}
          <FadeIn>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    color: '#34D399',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Successfully Delivered & Deployed
                </span>
                <span
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(37,99,235,0.15)',
                    border: '1px solid rgba(37,99,235,0.3)',
                    color: '#60A5FA',
                  }}
                >
                  Client: Gunadala Matha Shrine
                </span>
              </div>
              <div className="text-xs font-mono font-medium tracking-wider" style={{ color: '#06B6D4' }}>
                FEATURED ENTERPRISE SOLUTION
              </div>
            </div>

            {/* Title & Overview Grid */}
            <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#06B6D4' }}>
                  Church Management & Religious Institution Software
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  Mass Intention{' '}
                  <span className="text-gradient">Management System</span>
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#CBD5E1' }}>
                  The <strong className="text-white font-semibold">Mass Intention Management System</strong> is a custom-built digital platform developed by <strong className="text-white font-semibold">AK Technologies Pvt Ltd.</strong> for <strong className="text-white font-semibold">Gunadala Matha Shrine</strong>. The system streamlines the complete process of managing Mass Intentions, improving efficiency, accuracy, communication, and record management within the church.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
                  The platform enables church administrators to create, manage, track, and organize Mass Intentions through a centralized dashboard while providing dedicated channel-based workflows for church operations.
                </p>

                {/* 4 Core Pillars */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {churchPillars.map(({ icon: Icon, title, desc, color }) => (
                    <div
                      key={title}
                      className="p-4 rounded-xl card-hover transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}20` }}
                        >
                          <Icon size={16} color={color} />
                        </div>
                        <h4 className="font-semibold text-white text-sm">{title}</h4>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => nav('contact')} className="btn-primary">
                    Inquire About Church Solutions
                    <ArrowRight size={16} />
                  </button>
                  <button onClick={() => nav('portfolio')} className="btn-secondary">
                    View Portfolio Case Study
                  </button>
                </div>
              </div>

              {/* Interactive Mockup Preview */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: '#0D1117',
                    border: '1px solid rgba(6,182,212,0.3)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(6,182,212,0.12)',
                  }}
                >
                  {/* Title Bar */}
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ background: '#161B22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
                      <span className="ml-2 text-xs font-mono text-gray-400">Gunadala Matha Shrine Portal</span>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399' }}
                    >
                      ● Live Channels
                    </span>
                  </div>

                  {/* Mockup Dashboard Content */}
                  <div className="p-4 space-y-4">
                    {/* Live KPI Cards */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Today Intentions', val: '486', color: '#06B6D4' },
                        { label: 'Completed', val: '14 / 16', color: '#10B981' },
                        { label: 'Channels', val: '4 Active', color: '#8B5CF6' },
                        { label: 'Printed', val: '100%', color: '#F59E0B' },
                      ].map(({ label, val, color }) => (
                        <div
                          key={label}
                          className="p-2.5 rounded-lg text-center"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          <div className="text-[10px] text-gray-400 mb-0.5 leading-tight">{label}</div>
                          <div className="text-xs font-bold" style={{ color }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Filter Pills */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-gray-400">Filter By Category:</span>
                        <span className="text-[10px] text-cyan-400">Interactive Preview</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto scrollbar-hide">
                        {intentionCategories.slice(0, 6).map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                            className="px-2 py-1 rounded text-[10px] font-medium transition-all"
                            style={{
                              background: selectedCategory === cat.id ? cat.color : cat.bg,
                              color: selectedCategory === cat.id ? '#FFFFFF' : cat.color,
                              border: `1px solid ${cat.color}40`,
                            }}
                          >
                            {cat.name} ({cat.count})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Queue Table */}
                    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div
                        className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex justify-between"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <span>Intention & Devotee</span>
                        <span>Channel / Status</span>
                      </div>
                      <div className="divide-y divide-white/[0.05]">
                        {filteredIntentions.slice(0, 4).map(item => (
                          <div
                            key={item.id}
                            className="px-3 py-2 flex items-center justify-between text-xs transition-colors hover:bg-white/[0.02]"
                          >
                            <div>
                              <div className="text-white font-medium text-[11px]">{item.devotee}</div>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                <span className="font-mono">{item.id}</span>
                                <span>•</span>
                                <span style={{ color: '#06B6D4' }}>{item.category}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-gray-300">{item.time}</div>
                              <span
                                className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold"
                                style={{
                                  background: `${item.statusColor}20`,
                                  color: item.statusColor,
                                }}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hardware & Channels Status */}
                    <div
                      className="p-2.5 rounded-lg flex items-center justify-between text-[10px]"
                      style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}
                    >
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Monitor size={12} />
                        <span>Devotee Confirmation Screen: Synced</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                        <Printer size={12} />
                        <span>Thermal Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── 9 Intention Categories Full Showcase ── */}
          <FadeIn className="mb-20">
            <div
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(16,24,40,0.5)',
                border: '1px solid rgba(6,182,212,0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                    <Sparkles size={14} />
                    Intention Categorization
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Multiple Intention Categories Supported
                  </h3>
                </div>
                <p className="text-sm max-w-md text-gray-400">
                  Custom-configured for Gunadala Matha Shrine to handle liturgical prayers, thanksgiving devotions, and special intentions with dedicated workflows.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {intentionCategories.filter(c => c.id !== 'all').map(({ name, count, color, bg }) => (
                  <div
                    key={name}
                    className="p-3.5 rounded-xl card-hover transition-all duration-200"
                    style={{
                      background: bg,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full mb-2" style={{ background: color }} />
                    <div className="font-semibold text-white text-sm mb-0.5">{name}</div>
                    <div className="text-xs text-gray-400 flex items-center justify-between">
                      <span>Daily Active</span>
                      <span className="font-mono font-medium" style={{ color }}>{count}+</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Key Features Grid ── */}
          <div className="mb-20">
            <FadeIn className="text-center mb-12">
              <div className="section-label justify-center mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                Platform Capabilities
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Key Features & Operational Modules
              </h3>
              <p className="text-base max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
                Engineered to handle high devotee footfalls, multi-altar routing, live display confirmations, and official shrine receipting.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {churchKeyFeatures.map(({ title, desc, icon: Icon, color }, i) => (
                <FadeIn key={title} delay={i * 50}>
                  <div
                    className="p-6 rounded-2xl h-full card-hover"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${color}20` }}
                    >
                      <Icon size={20} color={color} />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── Business Impact Section ── */}
          <div className="mb-20">
            <FadeIn className="text-center mb-12">
              <div className="section-label justify-center mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                Real-World Outcomes
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Measurable Business & Operational Impact
              </h3>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
                Delivering tangible modernization and workflow accuracy for Gunadala Matha Shrine administration.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {churchBusinessImpacts.map(({ metric, title, desc, color }, i) => (
                <FadeIn key={title} delay={i * 60}>
                  <div
                    className="p-6 rounded-2xl h-full card-hover relative overflow-hidden"
                    style={{
                      background: 'rgba(16,24,40,0.4)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-2 font-mono"
                      style={{ color }}
                    >
                      {metric}
                    </div>
                    <h4 className="font-semibold text-white text-base mb-2">{title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── Screenshots & Gallery Placeholders ── */}
          <div>
            <FadeIn className="text-center mb-12">
              <div className="section-label justify-center mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B5CF6' }} />
                Interface Showcase
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                System Screenshots & Visual Gallery
              </h3>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
                High-definition interfaces built for clarity, operational speed, and reliable shrine management.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryPlaceholders.map(({ title, tag, desc, accent }, i) => (
                <FadeIn key={title} delay={i * 80}>
                  <div
                    className="rounded-2xl overflow-hidden card-hover h-full flex flex-col group"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Placeholder Frame Mockup */}
                    <div
                      className="relative h-44 flex flex-col items-center justify-center p-4 overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, rgba(16,24,40,0.8), rgba(10,14,20,0.95))',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

                      {/* Icon watermark */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                      >
                        <ImageIcon size={24} color={accent} />
                      </div>

                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#CBD5E1' }}
                      >
                        Screenshot Ready
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5"
                          style={{ color: accent }}
                        >
                          {tag}
                        </span>
                        <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                          {title}
                        </h4>
                        <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AdmissionOS - Main product */}
      <section className="py-20" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  color: '#60A5FA',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Live Product
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-5">
                <span className="text-gradient">AdmissionOS</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
                The complete AI-powered platform for education consultancies, colleges, and universities
                to manage the entire student admission lifecycle — from first inquiry to enrolled student.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, label: 'Enterprise Security', color: '#2563EB' },
                  { icon: Zap, label: 'Real-Time Analytics', color: '#06B6D4' },
                  { icon: Globe, label: 'Multi-Branch Ready', color: '#8B5CF6' },
                  { icon: Clock, label: 'Available 24/7', color: '#10B981' },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <Icon size={15} color={color} />
                    <span className="text-sm font-medium text-white">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => nav('contact')} className="btn-primary">
                  Request Demo
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => nav('contact')}
                  className="btn-secondary"
                >
                  Get Pricing
                </button>
              </div>
            </FadeIn>

            {/* Dashboard mockup */}
            <FadeIn delay={200}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#0D1117',
                  border: '1px solid rgba(37,99,235,0.2)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 50px rgba(37,99,235,0.08)',
                }}
              >
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ background: '#161B22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: '#4B5563' }}>admissionos.app/dashboard</span>
                  <div />
                </div>
                {/* Sidebar + content layout */}
                <div className="flex" style={{ height: '340px' }}>
                  {/* Sidebar */}
                  <div
                    className="w-12 flex flex-col items-center py-4 gap-4"
                    style={{ background: '#0A0E14', borderRight: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {['#2563EB', '#374151', '#374151', '#374151', '#374151'].map((c, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-lg"
                        style={{ background: `${c}30`, border: `1px solid ${c}50` }}
                      />
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="flex-1 p-4 overflow-hidden">
                    {/* KPI row */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { v: '2,847', l: 'Total Leads', c: '#2563EB', up: true },
                        { v: '1,204', l: 'Students', c: '#06B6D4', up: true },
                        { v: '68%', l: 'Conversion', c: '#8B5CF6', up: true },
                        { v: '$142K', l: 'Revenue', c: '#10B981', up: true },
                      ].map(({ v, l, c }) => (
                        <div key={l} className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <div className="text-xs font-bold text-white">{v}</div>
                          <div className="text-[10px]" style={{ color: '#4B5563' }}>{l}</div>
                          <div className="text-[10px]" style={{ color: c }}>+12%</div>
                        </div>
                      ))}
                    </div>
                    {/* Chart */}
                    <div className="rounded-lg p-3 mb-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-end gap-0.5 h-14">
                        {[35, 55, 45, 70, 58, 82, 65, 78, 70, 90, 75, 100].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{ height: `${h}%`, background: `linear-gradient(180deg, #2563EB, #2563EB40)` }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Student rows */}
                    <div className="space-y-1.5">
                      {[
                        { n: 'Sarah Johnson', s: 'Enrolled', p: 'MBA Finance' },
                        { n: 'Raj Patel', s: 'Application', p: 'BSc CS' },
                        { n: 'Emma Wilson', s: 'Inquiry', p: 'BBA Marketing' },
                      ].map(({ n, s, p }) => (
                        <div
                          key={n}
                          className="flex items-center justify-between px-2 py-1.5 rounded text-[10px]"
                          style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                          <span className="text-white font-medium">{n}</span>
                          <span style={{ color: '#94A3B8' }}>{p}</span>
                          <span
                            className="px-1.5 py-0.5 rounded-full"
                            style={{
                              background: s === 'Enrolled' ? 'rgba(16,185,129,0.15)' : 'rgba(37,99,235,0.15)',
                              color: s === 'Enrolled' ? '#10B981' : '#60A5FA',
                            }}
                          >
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {admissionFeatures.map(({ icon: Icon, color, title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div
                  className="p-6 rounded-2xl h-full card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div className="section-label mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Product Roadmap
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
              More Products{' '}
              <span className="text-gradient-blue">Coming Soon</span>
            </h2>
            <p className="text-lg" style={{ color: '#94A3B8' }}>
              We're building a portfolio of vertical SaaS products for industries that need intelligent software.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {roadmapProducts.map(({ name, status, statusColor, desc, tags }, i) => (
              <FadeIn key={name} delay={i * 100}>
                <div
                  className="p-7 rounded-2xl h-full relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                      style={{
                        background: `${statusColor}15`,
                        color: statusColor,
                        border: `1px solid ${statusColor}30`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: statusColor }}
                      />
                      {status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#94A3B8' }}>{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(37,99,235,0.1)',
                          color: '#60A5FA',
                          border: '1px solid rgba(37,99,235,0.2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
