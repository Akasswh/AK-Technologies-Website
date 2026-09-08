import { Mail, Phone, Github, Linkedin, Twitter, ArrowUpRight, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const services = ['AI & Automation', 'Software Engineering', 'Web Development', 'Mobile Apps', 'SaaS Products', 'Enterprise Platforms'];
const companyLinks = [
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Products', page: 'products' },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'Contact', page: 'contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#080C14', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => handleNav('home')} className="inline-flex mb-5" aria-label="AK Solutions & Technologies Pvt Ltd. — Go to homepage">
              <img
                src="/image.png"
                alt="AK Solutions & Technologies Pvt Ltd. Logo"
                className="h-9 w-auto md:h-10"
                style={{ objectFit: 'contain' }}
              />
            </button>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#94A3B8' }}>
              An AI-First technology company building intelligent software and digital products that deliver measurable business value.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <Icon size={15} color="#94A3B8" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleNav('services')}
                    className="text-sm transition-colors duration-200 hover:text-white text-left"
                    style={{ color: '#94A3B8' }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="text-sm transition-all duration-200 hover:text-white flex items-center gap-2 group"
                    style={{
                      color: item.page === 'privacy' ? '#38BDF8' : item.page === 'terms' ? '#60A5FA' : '#94A3B8',
                      fontWeight: (item.page === 'privacy' || item.page === 'terms') ? 500 : 400,
                    }}
                  >
                    {item.page === 'privacy' && <Shield size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />}
                    {item.page === 'terms' && <FileText size={13} className="text-blue-400 group-hover:scale-110 transition-transform" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium"
                        style={{
                          background: item.page === 'privacy' ? 'rgba(6,182,212,0.15)' : 'rgba(37,99,235,0.15)',
                          color: item.page === 'privacy' ? '#22D3EE' : '#60A5FA',
                          border: item.page === 'privacy' ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(37,99,235,0.3)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@aksolutionsandtech.in"
                  className="flex items-start gap-3 text-sm transition-colors duration-200 hover:text-white group"
                  style={{ color: '#94A3B8' }}
                >
                  <Mail size={15} className="mt-0.5 flex-shrink-0 group-hover:text-blue-400 transition-colors" style={{ color: '#2563EB' }} />
                  info@aksolutionsandtech.in
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-all duration-200 hover:text-white group"
                  style={{ color: '#94A3B8' }}
                >
                  <Phone size={15} style={{ color: '#06B6D4' }} className="flex-shrink-0" />
                  WhatsApp Us
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={() => handleNav('contact')}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.15))',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(6, 182, 212, 0.25))';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.15))';
                }}
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: '#64748B' }}>
            &copy; {new Date().getFullYear()} AK Solutions & Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <Shield size={13} />
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('terms')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
            >
              <FileText size={13} />
              Terms &amp; Conditions
            </button>
          </div>
          <p className="text-xs font-mono" style={{ color: '#64748B' }}>
            AI-First Software & Product Development
          </p>
        </div>
      </div>
    </footer>
  );
}
 