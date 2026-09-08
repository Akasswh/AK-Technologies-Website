import { useEffect, useRef, useState } from 'react';
import {
  Target, Zap, Shield, Users, Globe, Brain,
  ArrowRight, CheckCircle2
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
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

const values = [
  {
    icon: Target,
    color: '#2563EB',
    title: 'Outcome Obsession',
    desc: 'Every decision is measured against the business outcome it produces. We don\'t ship features — we ship results.',
  },
  {
    icon: Shield,
    color: '#06B6D4',
    title: 'Technical Integrity',
    desc: 'We build systems that are production-grade from day one — secure, observable, maintainable, and built to last.',
  },
  {
    icon: Users,
    color: '#8B5CF6',
    title: 'Genuine Partnership',
    desc: 'We act as an extension of your team, not a vendor. Your challenges become ours, and your success is our success.',
  },
  {
    icon: Brain,
    color: '#10B981',
    title: 'AI-First Thinking',
    desc: 'Every product and process we design considers where AI can meaningfully improve speed, accuracy, or scale.',
  },
  {
    icon: Zap,
    color: '#F59E0B',
    title: 'Disciplined Execution',
    desc: 'We ship on schedule because we plan rigorously, communicate proactively, and manage risk from the first sprint.',
  },
  {
    icon: Globe,
    color: '#EF4444',
    title: 'Long-Term Vision',
    desc: 'We design systems with longevity in mind — platforms you can build on for years without rewriting from scratch.',
  },
];

const capabilities = [
  'AI agents and agentic workflow systems',
  'Enterprise SaaS platform development',
  'End-to-end mobile application engineering',
  'Retrieval-augmented generation (RAG) systems',
  'Data engineering and business intelligence',
  'Cloud infrastructure and DevOps automation',
  'Legacy system modernization and migration',
  'UI/UX design and design system creation',
];

export default function About({ onNavigate }: AboutProps) {
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-24 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="section-label mb-5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                About Us
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                An AI-First Company With a{' '}
                <span className="text-gradient">Mission-Driven Approach</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
                AK Technologies was founded on a simple conviction: most businesses don't need more software — they need the right software, built with rigor, designed for their specific context, and maintained as a strategic asset.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#64748B' }}>
                We focus on intelligent software and digital products that deliver measurable business value. Not prototype-quality demos. Not feature-heavy platforms that nobody uses. Real systems that real teams rely on.
              </p>
            </FadeIn>

            {/* Stats block */}
            <FadeIn delay={200}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '50+', label: 'Projects Delivered', color: '#2563EB' },
                  { value: '98%', label: 'Client Retention Rate', color: '#06B6D4' },
                  { value: '5+', label: 'Years of Excellence', color: '#8B5CF6' },
                  { value: '12+', label: 'Industries Served', color: '#10B981' },
                ].map(({ value, label, color }) => (
                  <div
                    key={label}
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(16,24,40,0.5)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="text-4xl font-bold mb-2" style={{ color }}>{value}</div>
                    <div className="text-sm" style={{ color: '#94A3B8' }}>{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <div
                className="p-8 rounded-2xl h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.03))',
                  border: '1px solid rgba(37,99,235,0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(37,99,235,0.2)' }}
                >
                  <Target size={22} color="#2563EB" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                  To build intelligent software that solves real business problems — creating systems that organizations depend on, grow with, and consider a genuine competitive advantage rather than a cost center.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div
                className="p-8 rounded-2xl h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(139,92,246,0.03))',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(139,92,246,0.2)' }}
                >
                  <Globe size={22} color="#8B5CF6" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                  To become the technology partner that organizations think of first when they need to solve a complex business challenge with software — trusted for our judgment as much as our engineering capability.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="section-label justify-center mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              What We Stand For
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Principles That Guide{' '}
              <span className="text-gradient-blue">Every Decision</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, color, title, desc }, i) => (
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

      {/* Capabilities */}
      <section className="py-20" style={{ background: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="section-label mb-5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                Technical Depth
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Full-Stack Capability,{' '}
                <span className="text-gradient-blue">Proven in Production</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
                We're not a generalist agency with passing familiarity across many tools. We maintain deep expertise in the specific technologies and domains we operate in — which is why our systems hold up in production.
              </p>
              <button onClick={() => nav('contact')} className="btn-primary">
                Work With Us
                <ArrowRight size={16} />
              </button>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-3">
                {capabilities.map((cap, i) => (
                  <div
                    key={cap}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    <CheckCircle2 size={14} color="#2563EB" className="flex-shrink-0" />
                    <span className="text-sm font-medium" style={{ color: '#CBD5E1' }}>{cap}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="section-label justify-center mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Ready to Work Together?
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Let's Build Something{' '}
              <span className="text-gradient">Worth Building</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: '#94A3B8' }}>
              Bring us your most complex challenge. We'll tell you honestly whether we can solve it and what a credible path forward looks like.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => nav('contact')} className="btn-primary px-8 py-4 text-base">
                Start a Project
                <ArrowRight size={18} />
              </button>
              <button onClick={() => nav('portfolio')} className="btn-secondary px-8 py-4 text-base">
                View Our Work
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
