import { Link } from 'react-router-dom';
import { Scale, MapPin, Phone, Mail, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-law-navy text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background grain for consistency */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-law-gold rounded-sm flex items-center justify-center text-law-navy">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl leading-none block">Mannucci</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60">Associates</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-sans font-light max-w-xs">
              Serving Pasadena and surrounding areas with integrity, excellence, and personalized legal strategies for your business and family legacy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/60 hover:bg-law-gold hover:text-law-navy hover:border-law-gold transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/60 hover:bg-law-gold hover:text-law-navy hover:border-law-gold transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-serif text-xl text-law-gold mb-8">Practice Areas</h4>
            <ul className="space-y-4">
              {['Business Law', 'Estate Planning', 'Commercial Litigation', 'Real Estate Law', 'Asset Protection'].map((item) => (
                <li key={item}>
                  <a href="/#services" className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors font-sans">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-serif text-xl text-law-gold mb-8">Firm</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Client Reviews', href: '/#reviews' },
                { name: 'FAQ', href: '/#faq' },
                { name: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors font-sans">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif text-xl text-law-gold mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-sm text-white/80 font-sans font-light">
                <MapPin className="w-5 h-5 text-law-gold shrink-0 mt-0.5" />
                <span>123 Colorado Blvd, Suite 400<br />Pasadena, CA 91105</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 font-sans font-light">
                <Phone className="w-5 h-5 text-law-gold shrink-0" />
                <a href="tel:+16265550123" className="hover:text-law-gold transition-colors">(626) 555-0123</a>
              </li>
              <li className="flex items-center gap-4 text-sm text-white/80 font-sans font-light">
                <Mail className="w-5 h-5 text-law-gold shrink-0" />
                <a href="mailto:info@mannucci.law" className="hover:text-law-gold transition-colors">info@mannucci.law</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-widest uppercase text-white/40 font-sans">
            © {currentYear} Mannucci Associates. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] tracking-widest uppercase text-white/40 font-sans">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
