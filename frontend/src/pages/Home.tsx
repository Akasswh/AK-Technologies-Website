import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Brain, Code2, Smartphone, Globe, Zap, Shield,
  BarChart3, Users, Layers, Database, GitBranch,
  ChevronRight, CheckCircle2, Building2, HeartPulse,
  Factory, ShoppingCart, Truck, Rocket, Briefcase
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

/* ── Hero: AI Ecosystem SVG ───────────────────────────── */
function AIEcosystemViz() {
  const nodes = [
    { x: 200, y: 150, label: 'AI Agents', color: '#2563EB', r: 28 },
    { x: 380, y: 80,  label: 'RAG Systems', color: '#06B6D4', r: 22 },
    { x: 500, y: 200, label: 'Analytics', color: '#8B5CF6', r: 26 },
    { x: 420, y: 320, label: 'Automation', color: '#2563EB', r: 24 },
    { x: 260, y: 310, label: 'Mobile', color: '#06B6D4', r: 20 },
    { x: 120, y: 260, label: 'APIs', color: '#8B5CF6', r: 18 },
    { x: 350, y: 210, label: 'Core Platform', color: '#1d4ed8', r: 38 },
  ];

  const edges = [
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
    [0, 5], [1, 2], [3, 4],
  ];

  return (
    <svg
      viewBox="0 0 620 400"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 30px rgba(37,99,235,0.2))' }}
    >
      {/* Background glow */}
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="310" cy="200" rx="200" ry="150" fill="url(#centerGlow)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(37,99,235,0.25)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Animated flow lines */}
      {edges.slice(0, 4).map(([a, b], i) => (
        <line
          key={`flow-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={nodes[a].color}
          strokeWidth="1.5"
          strokeDasharray="8 30"
          opacity="0.7"
          style={{
            animation: `dataFlow ${3 + i * 0.7}s linear infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} style={{ animation: `nodePulse ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
          <circle cx={n.x} cy={n.y} r={n.r + 8} fill={n.color} opacity="0.1" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.9" />
          <circle cx={n.x} cy={n.y} r={n.r - 6} fill="rgba(10,10,10,0.5)" />
        </g>
      ))}

      {/* Labels */}
      {nodes.map((n, i) => (
        <text
          key={`lbl-${i}`}
          x={n.x}
          y={n.y + n.r + 16}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          {n.label}
        </text>
      ))}
    </svg>
  );
}

/* ── Animated counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Intersection-triggered fade ─────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
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

/* ── Process steps ────────────────────────────────────── */
const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive into your business goals, workflows, and technical landscape to define scope and success criteria.' },
  { num: '02', title: 'Strategy', desc: 'Architecture planning, technology selection, and a detailed roadmap aligned with your business objectives.' },
  { num: '03', title: 'Design', desc: 'UX research, wireframes, and polished interface design built around real user needs and workflows.' },
  { num: '04', title: 'Development', desc: 'Agile engineering with regular milestone reviews, test-driven code, and continuous integration.' },
  { num: '05', title: 'Deployment', desc: 'Staged rollout with monitoring, performance testing, and zero-downtime production deployment.' },
  { num: '06', title: 'Optimization', desc: 'Post-launch performance analysis, user feedback cycles, and continuous improvement iterations.' },
];

/* ── Tech stack ───────────────────────────────────────── */
const techStack = [
  { name: 'Python', color: '#3B82F6' },
  { name: 'FastAPI', color: '#06B6D4' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Flutter', color: '#54C5F8' },
  { name: 'TensorFlow', color: '#FF6F00' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'LangChain', color: '#8B5CF6' },
  { name: 'LangGraph', color: '#7C3AED' },
];

/* ── Industry icons ───────────────────────────────────── */
const industries = [
  { icon: Building2, label: 'Education' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: ShoppingCart, label: 'Retail' },
  { icon: Truck, label: 'Logistics' },
  { icon: Rocket, label: 'Startups' },
  { icon: Briefcase, label: 'Professional Services' },
];

/* ── Main component ───────────────────────────────────── */
export default function Home({ onNavigate }: HomeProps) {
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden hero-grid"
        style={{ background: '#0A0A0A' }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="section-label mb-6" style={{ animationDelay: '0ms' }}>
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#06B6D4' }}
                />
                AI-First Software Development
              </div>

              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6"
                style={{ lineHeight: '1.1' }}
              >
                Building{' '}
                <span className="text-gradient">Intelligent</span>
                <br />
                Software for
                <br />
                Modern Businesses
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: '#94A3B8', lineHeight: '1.7' }}
              >
                AK Solutions & Technologies Pvt Ltd. develops AI-powered applications, enterprise software, automation systems,
                mobile solutions, and scalable digital products that help organizations operate smarter,
                move faster, and grow with confidence.
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => nav('contact')} className="btn-primary">
                  Start a Project
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => nav('services')} className="btn-secondary">
                  Explore Solutions
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Metrics */}
              <div
                className="mt-14 grid grid-cols-3 gap-6 pt-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {[
                  { value: 50, suffix: '+', label: 'Projects Delivered' },
                  { value: 98, suffix: '%', label: 'Client Satisfaction' },
                  { value: 5, suffix: '+', label: 'Years of Excellence' },
                ].map(({ value, suffix, label }) => (
                  <div key={label}>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: '#2563EB' }}
                    >
                      <Counter target={value} suffix={suffix} />
                    </div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualization */}
            <div className="relative h-[520px] lg:h-[540px]">
            {/* AK Solutions & Technologies Branding */}
<div className="flex justify-end mb-4 -mt-4">
  <div className="flex items-center gap-5">

    <img
      src="/image.png"
      alt="AK Solutions & Technologies Pvt Ltd."
      className="h-24 w-auto object-contain"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(37,99,235,0.4))'
      }}
    />

    <div
      className="h-20"
      style={{
        width: '1px',
        background:
          'linear-gradient(to bottom, transparent, rgba(37,99,235,0.8), transparent)',
      }}
    />

    <div>
      <h2
        className="text-white font-light uppercase"
        style={{
          fontSize: '1.25rem',
          letterSpacing: '0.12em',
        }}
      >
        AK Solutions & Technologies <span className="whitespace-nowrap">Pvt Ltd.</span>
      </h2>

      <p
        className="text-cyan-400 uppercase mt-2 font-medium"
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
        }}
      >
        Innovate <span style={{ color: '#00A3FF' }}>•</span> Build <span style={{ color: '#A855F7' }}>•</span> Elevate
      </p>
    </div>

  </div>
</div>
              <div
  className="absolute inset-0 top-32 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(16,24,40,0.4)',
                  border: '1px solid rgba(37,99,235,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <AIEcosystemViz />
              </div>
              {/* Floating badges */}
              {[
                { label: 'AI Agents', icon: Brain, top: '30%', right: '7%', color: '#2563EB' },
                { label: 'Real-time Data', icon: BarChart3, bottom: '12%', left: '-5%', color: '#06B6D4' },
                { label: 'Automation', icon: Zap, top: '50%', right: '-8%', color: '#8B5CF6' },
              ].map(({ label, icon: Icon, color, ...pos }) => (
                <div
                  key={label}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold animate-float"
                  style={{
                    ...pos,
                    background: 'rgba(16,24,40,0.9)',
                    border: `1px solid ${color}40`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 4px 20px ${color}20`,
                    animationDelay: Math.random() * 2 + 's',
                  }}
                >
                  <Icon size={13} color={color} />
                  <span style={{ color: '#fff' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={{ background: '#080C14', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <FadeIn className="text-center mb-14">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Our Philosophy
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Technology Built Around{' '}
              <span className="text-gradient-blue">Business Outcomes</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
              We don't sell technology for its own sake. Every system we build is tied to a
              concrete business problem — reduced costs, faster operations, better decisions, or new revenue.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Enterprise-Grade Reliability',
                desc: 'Systems architected for scale, security, and compliance. Built to handle mission-critical workloads from day one.',
                color: '#2563EB',
              },
              {
                icon: Zap,
                title: 'Outcome-Driven Development',
                desc: 'Every sprint, every feature, every decision is evaluated against the business metric it moves. No vanity engineering.',
                color: '#06B6D4',
              },
              {
                icon: GitBranch,
                title: 'Long-Term Partnership',
                desc: 'We build systems we stand behind. Post-launch support, continuous optimization, and strategic technology roadmaps.',
                color: '#8B5CF6',
              },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <FadeIn key={title} delay={i * 120}>
                <div
                  className="p-7 rounded-2xl h-full card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <h3 className="font-semibold text-white mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              What We Build
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Full-Spectrum{' '}
              <span className="text-gradient-blue">Software Services</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
              From AI strategy to production deployment — end-to-end capability under one roof.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Brain,
                title: 'AI & Automation',
                color: '#2563EB',
                items: ['AI Agents', 'AI Workflows', 'RAG Systems', 'Business Automation', 'AI Assistants'],
              },
              {
                icon: Code2,
                title: 'Software Engineering',
                color: '#06B6D4',
                items: ['Enterprise Applications', 'SaaS Platforms', 'Custom Software', 'Business Portals'],
              },
              {
                icon: Globe,
                title: 'Web Development',
                color: '#8B5CF6',
                items: ['Corporate Websites', 'Web Applications', 'Dashboards', 'Management Systems'],
              },
              {
                icon: Smartphone,
                title: 'Mobile Development',
                color: '#2563EB',
                items: ['Android Apps', 'iOS Apps', 'Cross-Platform', 'Enterprise Mobile'],
              },
            ].map(({ icon: Icon, title, color, items }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full card-hover cursor-pointer group"
                  style={{
                    background: 'rgba(16,24,40,0.5)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onClick={() => nav('services')}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={22} color={color} />
                  </div>
                  <h3 className="font-semibold text-white mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                        <CheckCircle2 size={12} color={color} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCT (AdmissionOS) ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#080C14' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 60% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn className="mb-14">
            <div className="section-label mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Featured Product
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-gradient">AdmissionOS</span>
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: '#94A3B8' }}>
              An AI-powered admission and student lifecycle management platform designed for
              consultancies, colleges, universities, and educational institutions.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Dashboard mockup */}
            <FadeIn>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#0D1117',
                  border: '1px solid rgba(37,99,235,0.2)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.1)',
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: '#161B22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                  <span className="ml-3 text-xs font-mono" style={{ color: '#94A3B8' }}>AdmissionOS Dashboard</span>
                </div>
                {/* Content */}
                <div className="p-5">
                  {/* Stat row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Total Leads', value: '2,847', change: '+12%', color: '#2563EB' },
                      { label: 'Active Students', value: '1,204', change: '+8%', color: '#06B6D4' },
                      { label: 'Conversions', value: '68%', change: '+4%', color: '#8B5CF6' },
                      { label: 'Revenue', value: '$142K', change: '+21%', color: '#10B981' },
                    ].map(({ label, value, change, color }) => (
                      <div
                        key={label}
                        className="p-3 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="text-xs mb-1" style={{ color: '#94A3B8' }}>{label}</div>
                        <div className="font-bold text-white text-sm">{value}</div>
                        <div className="text-xs mt-1 font-medium" style={{ color }}>{change}</div>
                      </div>
                    ))}
                  </div>
                  {/* Chart placeholder */}
                  <div
                    className="rounded-lg p-4 mb-4"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 60, 90, 70, 85, 75, 95, 80, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(180deg, #2563EB${Math.floor(h * 2.55).toString(16).padStart(2, '0')}, #2563EB30)`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-xs mt-2" style={{ color: '#4B5563' }}>Lead Pipeline — Last 12 months</div>
                  </div>
                  {/* Table rows */}
                  <div className="space-y-2">
                    {[
                      { name: 'Sarah Johnson', status: 'Enrolled', counselor: 'Mike T.' },
                      { name: 'Raj Patel', status: 'Application', counselor: 'Lisa M.' },
                      { name: 'Emma Wilson', status: 'Inquiry', counselor: 'Mike T.' },
                    ].map(({ name, status, counselor }) => (
                      <div
                        key={name}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      >
                        <span className="text-white font-medium">{name}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: status === 'Enrolled' ? 'rgba(16,185,129,0.15)' : status === 'Application' ? 'rgba(37,99,235,0.15)' : 'rgba(139,92,246,0.15)',
                            color: status === 'Enrolled' ? '#10B981' : status === 'Application' ? '#60A5FA' : '#A78BFA',
                          }}
                        >
                          {status}
                        </span>
                        <span style={{ color: '#94A3B8' }}>{counselor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={200}>
              <div className="space-y-5">
                {[
                  { icon: Users, title: 'Lead & Student Management', desc: 'Capture, track, and nurture every prospective student from inquiry to enrollment.' },
                  { icon: BarChart3, title: 'Counselor Performance Analytics', desc: 'Monitor counselor KPIs, conversion rates, and productivity in real time.' },
                  { icon: Brain, title: 'AI-Powered Communication', desc: 'Automated follow-ups, personalized outreach, and intelligent response suggestions.' },
                  { icon: Layers, title: 'End-to-End Lifecycle Tracking', desc: 'From first touch to graduation — complete visibility across the student journey.' },
                  { icon: Database, title: 'Reporting & Business Intelligence', desc: 'Custom dashboards, enrollment forecasts, and actionable institutional insights.' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className="flex gap-4 p-4 rounded-xl group transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(37,99,235,0.15)' }}
                    >
                      <Icon size={17} color="#2563EB" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                      <p className="text-sm" style={{ color: '#94A3B8' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => nav('products')}
                className="mt-8 btn-primary"
              >
                View AdmissionOS
                <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Industries We Serve
            </div>
            <h2 className="text-3xl font-bold">
              Domain Expertise Across{' '}
              <span className="text-gradient-blue">Key Sectors</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map(({ icon: Icon, label }, i) => (
              <FadeIn key={label} delay={i * 60}>
                <div
                  className="flex flex-col items-center gap-3 p-5 rounded-xl card-hover cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(37,99,235,0.15)' }}
                  >
                    <Icon size={18} color="#2563EB" />
                  </div>
                  <span className="text-xs font-medium text-center" style={{ color: '#94A3B8' }}>{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ background: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              How We Work
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              A Process Built for{' '}
              <span className="text-gradient-blue">Predictable Outcomes</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
              Six disciplined stages that take your idea from concept to production with no surprises.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map(({ num, title, desc }, i) => (
              <FadeIn key={num} delay={i * 80}>
                <div
                  className="p-7 rounded-2xl h-full group card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="font-mono text-4xl font-bold mb-4"
                    style={{ color: 'rgba(37,99,235,0.25)' }}
                  >
                    {num}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Technology Stack
            </div>
            <h2 className="text-3xl font-bold">
              Best-in-Class{' '}
              <span className="text-gradient-blue">Technologies</span>
            </h2>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(({ name, color }, i) => (
              <FadeIn key={name} delay={i * 40}>
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium card-hover cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#E2E8F0',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  {name}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#080C14' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grid opacity-30"
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="section-label justify-center mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Ready to Build?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Let's Build Software That Creates{' '}
              <span className="text-gradient">Real Business Value</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: '#94A3B8' }}>
              Tell us about your challenge. We'll propose a solution that makes measurable business sense.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => nav('contact')} className="btn-primary px-8 py-4 text-base">
                Schedule Consultation
                <ArrowRight size={18} />
              </button>
              <button onClick={() => nav('contact')} className="btn-secondary px-8 py-4 text-base">
                Contact Us
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
