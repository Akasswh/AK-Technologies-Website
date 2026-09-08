import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'Services', page: 'services' },
  { label: 'Products', page: 'products' },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Navigation({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 10, 10, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center"
            aria-label="AK Solutions & Technologies Pvt Ltd. — Go to homepage"
          >
            <div className="flex items-center gap-3">
              <img
                src="/image.png"
                alt="AK Solutions & Technologies Pvt Ltd."
                className="h-12 w-auto object-contain"
              />

              <div>
                <h2 className="text-white font-semibold text-base sm:text-lg lg:text-xl leading-none">
                  AK Solutions & Technologies <span className="text-xs sm:text-sm font-normal text-slate-300">Pvt Ltd.</span>
                </h2>
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
                style={{
                  color: currentPage === link.page ? '#ffffff' : '#94A3B8',
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {currentPage === link.page && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(37, 99, 235, 0.15)' }}
                  />
                )}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('contact')}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: mobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNav(link.page)}
              className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: currentPage === link.page ? '#ffffff' : '#94A3B8',
                background: currentPage === link.page ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="mt-3 btn-primary text-sm justify-center"
          >
            Start a Project
          </button>
        </div>
      </div>
    </header>
  );
}
