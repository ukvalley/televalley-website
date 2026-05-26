import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Zap } from 'lucide-react';
import { analyticsApi } from '../services/api';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleCtaClick = (ctaName) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location: 'navbar' }).catch(() => {});
  };

  const isActive = (href) => {
    if (href.startsWith('/#')) return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0D1117]/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#C8FF2E] flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#0D1117]" />
            </div>
            <span className="text-xl font-bold text-[#E6EDF3] group-hover:text-[#C8FF2E] transition-colors">
              Televalley
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-[#C8FF2E]' : 'text-[#8B949E] hover:text-[#E6EDF3]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/demo"
              onClick={() => handleCtaClick('watch_demo')}
              className="btn btn-secondary text-sm py-2.5 px-4"
            >
              <Zap className="w-4 h-4" />
              Watch Demo
            </Link>
            <Link
              to="/trial"
              onClick={() => handleCtaClick('start_free_trial')}
              className="btn btn-primary text-sm py-2.5 px-4"
            >
              Start Free Trial
            </Link>
          </div>

          <button
            className="md:hidden text-[#E6EDF3] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[#161B22] border-t border-white/5 py-4 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[#8B949E] hover:text-[#E6EDF3] font-medium px-2 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-2 px-2">
                <Link to="/demo" className="btn btn-secondary w-full justify-center">
                  Watch Demo
                </Link>
                <Link to="/trial" className="btn btn-primary w-full justify-center">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
