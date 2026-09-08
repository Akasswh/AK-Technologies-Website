import { useState, useRef, useEffect } from 'react';
import {
  Mail, MessageSquare, Send, CheckCircle2,
  Clock, Loader2, AlertCircle
} from 'lucide-react';
import { submitLead } from '../lib/api';

interface ContactProps {
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

const initialForm: FormData = {
  name: '', email: '', phone: '', company: '',
  service: '', budget: '', message: '',
};

const services = [
  'AI & Automation',
  'Custom Software Engineering',
  'Web Development',
  'Mobile Development',
  'SaaS Product Development',
  'Enterprise Platform',
  'AdmissionOS (Product)',
  'Other / Not Sure',
];

const budgets = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $150,000',
  '$150,000+',
  "Not Sure / Let's Talk",
];

export default function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required';
    if (!form.message.trim()) errs.message = 'Please describe your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitLead({
        full_name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        company_name: form.company.trim() || null,
        service_required: form.service || null,
        budget_range: form.budget || null,
        message: form.message.trim(),
      });

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? `Submission failed: ${err.message}. Please try emailing us directly.`
          : 'Something went wrong. Please try again or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (submitError) setSubmitError(null);
    };

  const baseInputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#FFFFFF',
  };

  const errInputStyle = {
    ...baseInputStyle,
    borderColor: 'rgba(239,68,68,0.5)',
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200';

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn>
            <div className="section-label mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              Contact
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Let's Start a{' '}
              <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-xl max-w-xl leading-relaxed" style={{ color: '#94A3B8' }}>
              Tell us about your project. We'll respond within one business day with honest thoughts and a proposed next step.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 pb-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <FadeIn className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(16,24,40,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="font-semibold text-white mb-5">Reach Us Directly</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@aksolutionsandtech.in" className="flex items-center gap-3 group">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-blue-500/20"
                        style={{ background: 'rgba(37,99,235,0.15)' }}
                      >
                        <Mail size={16} color="#2563EB" />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: '#64748B' }}>Email</div>
                        <div className="text-sm font-medium text-white">info@aksolutionsandtech.in</div>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/7396760115"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-green-500/20"
                        style={{ background: 'rgba(16,185,129,0.15)' }}
                      >
                        <MessageSquare size={16} color="#10B981" />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: '#64748B' }}>WhatsApp</div>
                        <div className="text-sm font-medium text-white">Message us on WhatsApp</div>
                      </div>
                    </a>
                  </div>
                </div>

                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(16,24,40,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="font-semibold text-white mb-4">What Happens Next</h3>
                  <div className="space-y-4">
                    {[
                      'We review your inquiry within 1 business day',
                      'A discovery call to understand your challenge in depth',
                      'We propose a tailored approach with scope and budget range',
                      'You decide — no pressure, no surprise commitments',
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-xs font-mono font-bold flex-shrink-0 mt-0.5" style={{ color: '#2563EB' }}>
                          0{i + 1}
                        </span>
                        <span className="text-sm" style={{ color: '#94A3B8' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 px-5 py-4 rounded-xl"
                  style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <Clock size={16} color="#2563EB" className="flex-shrink-0" />
                  <span className="text-sm" style={{ color: '#94A3B8' }}>
                    Typical response: <span className="text-white font-medium">under 24 hours</span>
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={150} className="lg:col-span-2">
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center text-center py-24 px-8 rounded-2xl"
                  style={{ background: 'rgba(16,24,40,0.5)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(16,185,129,0.15)' }}
                  >
                    <CheckCircle2 size={30} color="#10B981" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Message Received</h2>
                  <p className="text-base mb-8" style={{ color: '#94A3B8' }}>
                    Thank you for reaching out. We'll review your inquiry and get back to you within one business day.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      className="btn-secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => onNavigate('home')}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl"
                  style={{ background: 'rgba(16,24,40,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h2 className="text-xl font-bold text-white mb-7">Project Inquiry</h2>

                  {/* Error banner */}
                  {submitError && (
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6 text-sm"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
                    >
                      <AlertCircle size={16} color="#EF4444" className="flex-shrink-0 mt-0.5" />
                      <span style={{ color: '#FCA5A5' }}>{submitError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Full Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange('name')}
                        className={inputCls}
                        style={errors.name ? errInputStyle : baseInputStyle}
                      />
                      {errors.name && <p className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Email Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange('email')}
                        className={inputCls}
                        style={errors.email ? errInputStyle : baseInputStyle}
                      />
                      {errors.email && <p className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange('phone')}
                        className={inputCls}
                        style={baseInputStyle}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Your company name"
                        value={form.company}
                        onChange={handleChange('company')}
                        className={inputCls}
                        style={baseInputStyle}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Service Interested In
                      </label>
                      <select
                        value={form.service}
                        onChange={handleChange('service')}
                        className={inputCls}
                        style={{ ...baseInputStyle, appearance: 'none' as const }}
                      >
                        <option value="" style={{ background: '#101828' }}>Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s} style={{ background: '#101828' }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                        Estimated Budget Range
                      </label>
                      <select
                        value={form.budget}
                        onChange={handleChange('budget')}
                        className={inputCls}
                        style={{ ...baseInputStyle, appearance: 'none' as const }}
                      >
                        <option value="" style={{ background: '#101828' }}>Select budget range...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b} style={{ background: '#101828' }}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#94A3B8' }}>
                      Tell Us About Your Project <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe your business challenge, what you're trying to build, and any relevant context..."
                      value={form.message}
                      onChange={handleChange('message')}
                      className={inputCls}
                      style={{ ...(errors.message ? errInputStyle : baseInputStyle), resize: 'none' }}
                    />
                    {errors.message && <p className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary justify-center py-4 text-base"
                    style={{ opacity: submitting ? 0.8 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <Send size={16} /></>
                    )}
                  </button>

                  <p className="text-xs text-center mt-4" style={{ color: '#64748B' }}>
                    By submitting this form you agree to be contacted regarding your inquiry and acknowledge our{' '}
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('privacy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-medium text-cyan-400 hover:text-cyan-300 underline transition-colors"
                    >
                      Privacy Policy
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('terms');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-medium text-cyan-400 hover:text-cyan-300 underline transition-colors"
                    >
                      Terms &amp; Conditions
                    </button>
                    . No spam, ever.
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
