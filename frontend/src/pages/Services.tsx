import { useEffect, useRef, useState } from 'react';
import {
  Brain, Code2, Smartphone, Globe, Shield, Layers,
  ArrowRight, CheckCircle2
} from 'lucide-react';

interface ServicesProps {
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

const services = [
  {
    id: 'ai',
    icon: Brain,
    color: '#2563EB',
    title: 'AI Solutions & Automation',
    subtitle: 'Intelligent systems that think and act',
    desc: 'We design, build, and deploy AI-powered systems that automate complex workflows, surface actionable intelligence, and enhance every layer of your business.',
    outcomes: [
      'Reduce operational costs through intelligent automation',
      'Make faster, data-driven decisions at scale',
      'Eliminate repetitive high-volume tasks',
      'Build competitive moats with proprietary AI systems',
    ],
    capabilities: [
      { title: 'AI Agents', desc: 'Autonomous agents that execute multi-step workflows without human intervention' },
      { title: 'RAG Systems', desc: 'Retrieval-augmented generation for grounded, accurate AI over your proprietary data' },
      { title: 'AI Workflows', desc: 'End-to-end intelligent pipelines that coordinate multiple AI models and data sources' },
      { title: 'AI Assistants', desc: 'Conversational AI interfaces embedded into your applications and portals' },
      { title: 'Business Automation', desc: 'Document processing, data extraction, and process automation at enterprise scale' },
      { title: 'Custom ML Models', desc: 'Fine-tuned and purpose-built models trained on your domain data' },
    ],
  },
  {
    id: 'software',
    icon: Code2,
    color: '#06B6D4',
    title: 'Custom Software Engineering',
    subtitle: 'Production-grade software built to last',
    desc: 'Complex enterprise applications, SaaS platforms, and business portals — architected for scale, maintainability, and the specific demands of your industry.',
    outcomes: [
      'Replace fragile legacy systems with modern architectures',
      'Launch new products faster with proven engineering patterns',
      'Integrate disparate systems into unified workflows',
      'Own your software with full source code and documentation',
    ],
    capabilities: [
      { title: 'Enterprise Applications', desc: 'Large-scale business systems with complex workflows, roles, and integrations' },
      { title: 'SaaS Platforms', desc: 'Multi-tenant software products with billing, onboarding, and growth infrastructure' },
      { title: 'Business Portals', desc: 'Role-based internal tools and partner portals with granular access control' },
      { title: 'API & Integration', desc: 'RESTful APIs, GraphQL, webhooks, and third-party integration architecture' },
      { title: 'Legacy Modernization', desc: 'Migration from legacy stacks to modern, maintainable cloud architectures' },
      { title: 'Technical Architecture', desc: 'System design, ADR documentation, and technology strategy consulting' },
    ],
  },
  {
    id: 'web',
    icon: Globe,
    color: '#8B5CF6',
    title: 'Web Development',
    subtitle: 'Performant web experiences that convert',
    desc: 'From marketing sites to complex web applications and analytics dashboards — built with performance, accessibility, and conversion in mind.',
    outcomes: [
      'Convert visitors into qualified leads with premium UX',
      'Manage business operations through purpose-built web tools',
      'Deliver consistent digital experiences across all devices',
      'Launch faster with reusable design systems',
    ],
    capabilities: [
      { title: 'Corporate Websites', desc: 'Brand-aligned, SEO-optimized marketing sites that communicate credibility' },
      { title: 'Web Applications', desc: 'Feature-rich SPAs and full-stack web apps with real-time capabilities' },
      { title: 'Analytics Dashboards', desc: 'Business intelligence interfaces with live data, charts, and exportable reports' },
      { title: 'Management Systems', desc: 'Internal tools: inventory management, HR systems, ops dashboards' },
      { title: 'E-commerce', desc: 'Custom storefronts, checkout flows, and order management systems' },
      { title: 'Design Systems', desc: 'Component libraries and design tokens that scale across products' },
    ],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    color: '#10B981',
    title: 'Mobile Development',
    subtitle: 'Native and cross-platform mobile apps',
    desc: 'Android, iOS, and cross-platform applications — built with device-native performance, offline capabilities, and polished user experiences.',
    outcomes: [
      'Reach customers on the device they live on',
      'Extend business operations to field teams and remote workers',
      'Deliver app-store quality with enterprise-grade security',
      'Ship to both platforms with a single, maintained codebase',
    ],
    capabilities: [
      { title: 'Flutter Apps', desc: 'Cross-platform applications with native performance on Android and iOS' },
      { title: 'Native Android', desc: 'Kotlin-based Android apps optimized for the Android hardware ecosystem' },
      { title: 'Native iOS', desc: 'Swift-based iOS apps with Apple platform integrations and App Store compliance' },
      { title: 'Enterprise Mobile', desc: 'MDM-compatible apps for field operations, logistics, and internal teams' },
      { title: 'Offline-First Design', desc: 'Apps that work reliably with intermittent connectivity via local data sync' },
      { title: 'App Store Publishing', desc: 'End-to-end app store submission, review, and release management' },
    ],
  },
  {
    id: 'saas',
    icon: Layers,
    color: '#F59E0B',
    title: 'SaaS Product Development',
    subtitle: 'Build your next software business',
    desc: 'We partner with founders and product teams to build subscription software businesses — from MVP to market-ready platform with built-in growth infrastructure.',
    outcomes: [
      'Validate product-market fit without over-engineering',
      'Launch with monetization, onboarding, and analytics built in',
      'Scale architecture as customer count grows',
      'Build a defensible product with a strong technical foundation',
    ],
    capabilities: [
      { title: 'MVP Development', desc: 'Focused build of your core value proposition for early user validation' },
      { title: 'Multi-Tenancy', desc: 'Isolated, scalable tenant architecture with data separation and custom domains' },
      { title: 'Billing & Subscriptions', desc: 'Stripe-integrated billing with plans, trials, metering, and invoicing' },
      { title: 'User Onboarding', desc: 'Activation flows, in-app guidance, and user lifecycle automation' },
      { title: 'Usage Analytics', desc: 'Product telemetry, feature flags, cohort analysis, and retention tracking' },
      { title: 'Growth Infrastructure', desc: 'Referral systems, affiliate tracking, and expansion revenue tooling' },
    ],
  },
  {
    id: 'enterprise',
    icon: Shield,
    color: '#EF4444',
    title: 'Enterprise Platforms',
    subtitle: 'Mission-critical systems at scale',
    desc: 'Large-scale digital transformation engagements — from requirements to enterprise deployment with change management, training, and long-term support.',
    outcomes: [
      'Unify fragmented systems into cohesive digital operations',
      'Achieve enterprise-level security and compliance standards',
      'Enable data-driven decision-making across the entire organization',
      'Reduce IT sprawl with purposefully integrated platforms',
    ],
    capabilities: [
      { title: 'Platform Architecture', desc: 'Designing extensible, microservices-based platforms for complex business domains' },
      { title: 'SSO & IAM', desc: 'Enterprise authentication with SAML, OAuth, LDAP, and role-based access' },
      { title: 'Data Infrastructure', desc: 'Data warehouses, ETL pipelines, and real-time streaming for business intelligence' },
      { title: 'Cloud Migrations', desc: 'Lift-and-shift, re-platform, or full re-architecture to AWS, GCP, or Azure' },
      { title: 'Compliance Engineering', desc: 'SOC 2, HIPAA, and GDPR-compliant architectures with audit logging' },
      { title: 'Enterprise Support', desc: 'SLAs, dedicated engineering support, and ongoing platform evolution' },
    ],
  },
];

export default function Services({ onNavigate }: ServicesProps) {
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        <div
          className="absolute inset-0 hero-grid pointer-events-none opacity-50"
        />
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn>
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Services
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End-to-End{' '}
              <span className="text-gradient">Software Capability</span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: '#94A3B8' }}>
              From AI strategy to production deployment — every service you need to build, scale, and operate intelligent software.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service sections */}
      {services.map(({ id, icon: Icon, color, title, subtitle, desc, outcomes, capabilities }, idx) => (
        <section
          key={id}
          className="py-20"
          style={{ background: idx % 2 === 0 ? '#080C14' : '#0A0A0A' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              {/* Left */}
              <FadeIn delay={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={22} color={color} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>
                      {subtitle}
                    </p>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#94A3B8' }}>{desc}</p>

                <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4" style={{ color: '#64748B' }}>
                  Business Outcomes
                </h3>
                <ul className="space-y-3 mb-8">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm" style={{ color: '#CBD5E1' }}>
                      <CheckCircle2 size={15} color={color} className="mt-0.5 flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => nav('contact')}
                  className="btn-primary"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                >
                  Discuss This Service
                  <ArrowRight size={16} />
                </button>
              </FadeIn>

              {/* Right: capabilities grid */}
              <FadeIn delay={150}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {capabilities.map(({ title: capTitle, desc: capDesc }) => (
                    <div
                      key={capTitle}
                      className="p-5 rounded-xl card-hover"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: color }}
                        />
                        <h4 className="font-semibold text-white text-sm">{capTitle}</h4>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{capDesc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-5">
              Not Sure Which Service Fits?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#94A3B8' }}>
              Book a free discovery call. We'll listen to your challenges and recommend the right approach — no sales pressure.
            </p>
            <button onClick={() => nav('contact')} className="btn-primary px-8 py-4 text-base">
              Schedule a Free Discovery Call
              <ArrowRight size={18} />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
