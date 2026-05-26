import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, MessageCircle, Play } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/#integrations' },
    { label: 'API', href: '/#api' }
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Documentation', href: '/#docs' },
    { label: 'Help Center', href: '/#help' }
  ],
  Company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Team', href: '/#team' },
    { label: 'Careers', href: '/#careers' },
    { label: 'Contact', href: '/contact' }
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] border-t border-white/5">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C8FF2E] flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#0D1117]" />
              </div>
              <span className="text-xl font-bold text-[#E6EDF3]">Televalley</span>
            </Link>
            <p className="text-[#8B949E] text-sm mb-6 max-w-xs">
              The mobile-first, SIM-based telecalling CRM that transforms your smartphone into a powerful sales engine.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#8B949E]">
              <a href="mailto:umesh@ukvalley.com" className="flex items-center gap-2 hover:text-[#C8FF2E]">
                <Mail className="w-4 h-4" /> umesh@ukvalley.com
              </a>
              <a href="tel:+919890437811" className="flex items-center gap-2 hover:text-[#C8FF2E]">
                <Phone className="w-4 h-4" /> +91 98904 37811
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Nashik, India
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] hover:border-[#C8FF2E]/20 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] hover:border-[#C8FF2E]/20 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] hover:border-[#C8FF2E]/20 transition-all">
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#E6EDF3] font-semibold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[#8B949E] text-sm hover:text-[#C8FF2E] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-sm">
            © {new Date().getFullYear()} Televalley. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#8B949E] text-xs">Built with 💚 in Nashik, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
