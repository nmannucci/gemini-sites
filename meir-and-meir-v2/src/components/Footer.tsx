import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-3xl tracking-wide text-white">Meir <span className="text-brand-gold">&</span> Meir</h2>
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase mt-2">Certified Public Accountants</p>
            </div>
            <p className="text-white/60 font-sans font-normal leading-relaxed max-w-sm">
              Providing expert accounting, tax, and consulting services with a focus on efficiency, discretion, and peace of mind for over 35 years.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="font-serif text-xl text-brand-gold">Menu</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors font-sans text-sm tracking-wide">Home</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-white transition-colors font-sans text-sm tracking-wide">Services</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors font-sans text-sm tracking-wide">Our Firm</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors font-sans text-sm tracking-wide">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="font-serif text-xl text-brand-gold">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <MapPin className="w-5 h-5 text-brand-gold mt-1 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-white/80 font-sans text-sm leading-relaxed">
                    21201 Victory Blvd Suite #145<br />
                    Canoga Park, CA 91303
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Phone className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
                <a href="tel:3104351759" className="text-white/80 font-sans text-sm hover:text-white transition-colors">(310) 435-1759</a>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Mail className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
                <a href="mailto:Info@meirandmeir.com" className="text-white/80 font-sans text-sm hover:text-white transition-colors">Info@meirandmeir.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-sans tracking-wider">
            © {new Date().getFullYear()} Meir and Meir, LLP. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-white/30 text-xs font-sans tracking-wider hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/30 text-xs font-sans tracking-wider hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
