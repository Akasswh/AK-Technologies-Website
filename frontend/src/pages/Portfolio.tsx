import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Brain, Code2, Smartphone, BarChart3, Layers,
  ShieldCheck, Workflow, ScrollText, CheckCircle2, Monitor,
  Printer, Sparkles, Image as ImageIcon
} from 'lucide-react';

interface PortfolioProps {
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

/* ── 4 Attractive Pillars for Top Featured Case Study ── */
const featuredPillars = [
  {
    icon: ChurchIcon,
    title: 'Church Management',
    desc: 'Custom-built for Gunadala Matha Shrine to handle liturgical mass schedules, prayer petitions, and altar channel assignments.',
    color: '#06B6D4',
  },
  {
    icon: ShieldCheck,
    title: 'Super Admin Oversight',
    desc: 'Centralized administration with role-based access control, counter clerk auditing, and departmental coordination.',
    color: '#3B82F6',
  },
  {
    icon: Workflow,
    title: 'Channel Workflows',
    desc: 'Automated distribution to specific shrine altars with real-time status tracking and completion verification.',
    color: '#8B5CF6',
  },
  {
    icon: ScrollText,
    title: 'Digital Records & Print',
    desc: 'Instant thermal receipt generation, live customer confirmation displays, and permanent searchable digital archives.',
    color: '#10B981',
  },
];

const featuredCategories = [
  'Thanksgiving', 'Good Health', 'Education', 'Rest In Peace (RIP)',
  'Well Being', 'Marriage', 'Promotion', 'Children', 'Others'
];

const portfolioGalleryPlaceholders = [
  {
    title: 'Super Admin Dashboard',
    desc: 'Channel routing, mass queues, and real-time operational oversight.',
    accent: '#3B82F6',
  },
  {
    title: 'Intention Booking Engine',
    desc: 'Speed-optimized desk counter entry with 9 intention categories.',
    accent: '#06B6D4',
  },
  {
    title: 'Customer Confirmation Display',
    desc: 'Live screen for devotees to verify intention and channel schedule.',
    accent: '#8B5CF6',
  },
  {
    title: 'Receipt & Archive System',
    desc: 'Thermal receipt printing and tamper-proof digital historical records.',
    accent: '#10B981',
  },
];

const projects = [
  {
    title: 'Mass Intention Management System',
    category: 'Church Management & Religious Institution Software',
    icon: ChurchIcon,
    accentColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(16,185,129,0.08))',
    tags: ['Web Application', 'FastAPI', 'React', 'PostgreSQL', 'Thermal Printing', 'Real-Time Channels'],
    client: 'Gunadala Matha Shrine',
    status: 'Successfully Delivered',
    challenge: 'Gunadala Matha Shrine was managing hundreds of daily mass intentions using handwritten paper registers and slips, causing manual paperwork bottlenecks, communication delays between counter clerks and altar celebrants, and risk of misplaced intentions.',
    solution: 'AK Technologies designed, developed, and deployed a modern web platform featuring 9 intention categories, dynamic channel-based distribution to shrine altars, live customer confirmation display screens, and instant receipt printing.',
    outcome: '100% paperless administration, 4x faster counter turnaround, zero misplaced intentions, synchronized departmental communication, and permanent searchable digital records.',
  },
  {
    title: 'AdmissionOS',
    category: 'SaaS Product',
    icon: Brain,
    accentColor: '#2563EB',
    gradient: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.08))',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'AI/ML', 'Supabase'],
    challenge: 'Education consultancies were managing student pipelines across disconnected spreadsheets and messaging apps, causing lost leads and poor visibility into counselor performance.',
    solution: 'Built a unified AI-powered platform with intelligent lead capture, automated follow-up sequences, counselor performance analytics, and a complete student lifecycle management system.',
    outcome: 'Clients using AdmissionOS report 40% higher lead conversion rates and 60% reduction in administrative overhead through automation.',
    image: '/images/admissionos.png',
  },
  {
    title: 'Enterprise AI Automation Platform',
    category: 'AI & Automation',
    icon: Layers,
    accentColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.08))',
    tags: ['LangChain', 'LangGraph', 'Python', 'FastAPI', 'Docker', 'AWS'],
    challenge: 'A large services firm was spending 200+ hours per month on manual document processing, data extraction, and workflow routing across 12 departments.',
    solution: 'Designed a multi-agent AI platform with specialized agents for document ingestion, data extraction, validation, and routing. LangGraph orchestrated complex multi-step workflows with full audit trails.',
    outcome: 'Automated 85% of document processing tasks, saving over 170 hours monthly and reducing processing errors from 12% to under 1%.',
  },
  {
    title: 'Business Intelligence Dashboard',
    category: 'Web Development',
    icon: BarChart3,
    accentColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(37,99,235,0.08))',
    tags: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS'],
    challenge: 'A manufacturing company had business data scattered across 8 different systems with no unified view, making monthly reporting a 3-day manual exercise.',
    solution: 'Built a real-time BI dashboard that integrates all data sources into a single PostgreSQL data warehouse with automated ETL pipelines and a custom React reporting interface.',
    outcome: 'Monthly reporting reduced from 3 days to 30 minutes. Executives now have live KPI visibility, enabling faster operational decisions.',
  },
  {
    title: 'Enterprise Web Application',
    category: 'Software Engineering',
    icon: Code2,
    accentColor: '#10B981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
    tags: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    challenge: 'A logistics company was operating on a 15-year-old legacy system that couldn\'t scale, had no mobile access, and required manual workarounds for critical workflows.',
    solution: 'Redesigned the system architecture from the ground up: a modern React frontend, FastAPI microservices backend, PostgreSQL database, and progressive migration strategy to minimize operational disruption.',
    outcome: 'System uptime improved from 94% to 99.9%. User adoption increased 3x within the first quarter after launch due to significantly improved UX.',
  },
  {
    title: 'Cross-Platform Mobile Solution',
    category: 'Mobile Development',
    icon: Smartphone,
    accentColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))',
    tags: ['Flutter', 'Dart', 'Supabase', 'Firebase', 'iOS', 'Android'],
    challenge: 'A healthcare services provider needed to equip 300 field agents with mobile tools that worked offline, synced automatically, and integrated with their existing backend.',
    solution: 'Built a Flutter application with offline-first architecture, background sync, biometric authentication, and deep integration with the client\'s existing REST API layer.',
    outcome: 'Field agent productivity increased 45%. Data collection accuracy improved from 78% to 97% by eliminating manual transcription.',
  },
];

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
        <div
          className="absolute top-1/4 left-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn>
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Portfolio
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Selected Work &{' '}
              <span className="text-gradient">Case Studies</span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: '#94A3B8' }}>
              A selection of projects that demonstrate our capability across industries, technologies, and problem complexity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── TOP FEATURED CASE STUDY: MASS INTENTION MANAGEMENT SYSTEM ── */}
      <section className="pt-4 pb-16 relative" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            {/* VIP Spotlight Card */}
            <div
              className="rounded-3xl p-8 lg:p-12 relative overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(180deg, rgba(16,24,40,0.7) 0%, rgba(10,14,22,0.95) 100%)',
                border: '1px solid rgba(6,182,212,0.35)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 60px rgba(6,182,212,0.12)',
              }}
            >
              {/* Background ambient lighting */}
              <div
                className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
              />

              {/* 1. Highlight Badges Ribbon */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    color: '#34D399',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ✓ Successfully Delivered
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.25)',
                    color: '#60A5FA',
                  }}
                >
                  ✓ Production Ready
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#A78BFA',
                  }}
                >
                  ✓ Live Client Project
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(6,182,212,0.12)',
                    border: '1px solid rgba(6,182,212,0.25)',
                    color: '#22D3EE',
                  }}
                >
                  ✓ Custom Enterprise Solution
                </span>
              </div>

              {/* 2. Header and Metadata */}
              <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
                    <Sparkles size={14} />
                    Top Featured Project & Case Study
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                    Mass Intention Management System{' '}
                    <span className="text-gradient block sm:inline">– Gunadala Matha Shrine</span>
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed max-w-4xl text-gray-300">
                    AK Technologies Pvt Ltd., successfully designed, developed, and deployed a complete Mass Intention Management System for Gunadala Matha Shrine. The solution digitizes the entire intention management process, from request creation to completion tracking, helping the shrine manage operations efficiently through a modern web-based platform.
                  </p>
                </div>
              </div>

              {/* 3. Project Metadata Bar */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl mb-10"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div>
                  <div className="text-xs text-gray-400 mb-1">Technology Type</div>
                  <div className="text-sm font-semibold text-white">Web Application</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Industry</div>
                  <div className="text-sm font-semibold text-cyan-400">Religious Institution / Church Administration</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Project Status</div>
                  <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Successfully Delivered
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Client</div>
                  <div className="text-sm font-semibold text-blue-400">Gunadala Matha Shrine</div>
                </div>
              </div>

              {/* 4. Four Attractive Pillar Cards with Requested Icons */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {featuredPillars.map(({ icon: Icon, title, desc, color }) => (
                  <div
                    key={title}
                    className="p-5 rounded-xl card-hover"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${color}20` }}
                    >
                      <Icon size={20} color={color} />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1.5">{title}</h4>
                    <p className="text-xs leading-relaxed text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>

              {/* 5. Case Study In-Depth (Challenge, Solution, Impact) */}
              <div
                className="grid md:grid-cols-3 gap-6 p-7 rounded-2xl mb-10"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    The Challenge
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Gunadala Matha Shrine handled high volumes of devotee mass intentions via loose paper receipts and handwritten registers. This manual approach created front-desk queues, risk of misplaced intentions, communication friction between clerks and altar celebrants, and no reliable digital record.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Our Solution
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    AK Technologies built a custom web platform featuring 9 intention categories, dynamic channel-based distribution to shrine altars, a dedicated live customer confirmation display screen, real-time status progression (creation to celebration), and automated thermal receipt printing.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    The Business Impact
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Achieved 100% paperless administration with zero misplaced intentions. Counter booking throughput accelerated by 4x, altar celebrants gained live liturgical queue access, devotees received instant thermal receipts, and the shrine established a permanent, searchable digital archive.
                  </p>
                </div>
              </div>

              {/* 6. Intention Categories & Key Features Checklist */}
              <div className="grid lg:grid-cols-12 gap-8 mb-10 items-center">
                <div className="lg:col-span-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                    Liturgical Classification
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    9 Dedicated Intention Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredCategories.map(cat => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(6,182,212,0.1)',
                          color: '#22D3EE',
                          border: '1px solid rgba(6,182,212,0.25)',
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                    Enterprise Capabilities
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    Built for High Footfall & Liturgical Precision
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    {[
                      'Super Admin Dashboard',
                      'Channel-Based Distribution',
                      'Live Confirmation Display',
                      'Receipt & Thermal Print',
                      'Role-Based Permissions',
                      'Tamper-Proof Audit Archive',
                    ].map(feat => (
                      <div key={feat} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7. Screenshots / Gallery Placeholders */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                      Visual Showcase
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      Screenshots & System Gallery Placeholders
                    </h4>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    High-Fidelity Wireframes
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {portfolioGalleryPlaceholders.map(({ title, desc, accent }) => (
                    <div
                      key={title}
                      className="rounded-xl overflow-hidden card-hover group"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="h-36 flex flex-col items-center justify-center relative p-4 overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, rgba(16,24,40,0.8), rgba(10,14,20,0.95))',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                        >
                          <ImageIcon size={20} color={accent} />
                        </div>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#CBD5E1' }}
                        >
                          Screenshot Ready
                        </span>
                      </div>
                      <div className="p-4">
                        <h5 className="font-semibold text-white text-xs mb-1 group-hover:text-cyan-400 transition-colors">
                          {title}
                        </h5>
                        <p className="text-[11px] leading-relaxed text-gray-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Action Footer */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06]">
                <div className="text-xs text-gray-400">
                  Developed & Deployed by <span className="text-white font-semibold">AK Technologies Pvt Ltd.</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => nav('products')} className="btn-secondary text-xs py-2.5 px-4">
                    Explore in Products
                  </button>
                  <button onClick={() => nav('contact')} className="btn-primary text-xs py-2.5 px-4">
                    Discuss a Custom Solution
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* More Selected Projects */}
      <section className="py-16" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-10">
            <div className="section-label mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3B82F6' }} />
              Client Deliveries & Systems
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              More Selected Case Studies
            </h3>
          </FadeIn>

          <div className="space-y-8">
            {projects.slice(1).map(({ title, category, icon: Icon, accentColor, gradient, tags, challenge, solution, outcome }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(16,24,40,0.4)',
                    border: expanded === i ? `1px solid ${accentColor}40` : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: expanded === i ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accentColor}15` : 'none',
                  }}
                >
                  {/* Card header */}
                  <button
                    className="w-full text-left p-7 flex items-start gap-6 group"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: gradient }}
                    >
                      <Icon size={24} color={accentColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-widest mb-1"
                            style={{ color: accentColor }}
                          >
                            {category}
                          </p>
                          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                        </div>
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                        >
                          <ArrowRight size={14} color="#94A3B8" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{
                              background: `${accentColor}12`,
                              color: accentColor,
                              border: `1px solid ${accentColor}25`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  <div
                    style={{
                      maxHeight: expanded === i ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    <div
                      className="px-7 pb-7 grid md:grid-cols-3 gap-6"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {[
                        { label: 'The Challenge', content: challenge, color: '#EF4444' },
                        { label: 'Our Solution', content: solution, color: accentColor },
                        { label: 'The Outcome', content: outcome, color: '#10B981' },
                      ].map(({ label, content, color }) => (
                        <div key={label} className="pt-6">
                          <div
                            className="text-xs font-semibold uppercase tracking-widest mb-3"
                            style={{ color }}
                          >
                            {label}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: '#080C14' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-5">
              Want to Discuss Your Project?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#94A3B8' }}>
              We'll apply the same rigorous approach to understanding your challenge and designing the right solution.
            </p>
            <button onClick={() => nav('contact')} className="btn-primary px-8 py-4 text-base">
              Start a Conversation
              <ArrowRight size={18} />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
