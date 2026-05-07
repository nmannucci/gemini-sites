import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10 border-t border-neutral-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-geist leading-none">Meir & Meir</span>
                <span className="text-xs text-neutral-400 font-medium tracking-wide">LLP</span>
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Providing comprehensive accounting, tax, and consulting services with efficiency, affordability, and discretion for over 40 years.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-geist mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-sm">21201 Victory Blvd Suite #145<br />Canoga Park, CA 91303</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span className="text-sm">139 South Beverly Drive Suite 204<br />Beverly Hills, CA 90212</span>
              </li>
              <li>
                <a href="tel:+13104351759" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">(310) 435-1759</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@meirandmeir.com" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">Info@meirandmeir.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-geist mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/audit" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Audit & Assurance</Link></li>
              <li><Link to="/services/tax" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Tax Services</Link></li>
              <li><Link to="/services/business" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Business Services</Link></li>
              <li><Link to="/services/estate-planning" className="text-sm text-neutral-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Estate Planning</Link></li>
            </ul>
          </div>

          {/* Newsletter/Action */}
          <div>
            <h3 className="text-lg font-bold font-geist mb-6">Get Started</h3>
            <p className="text-sm text-neutral-400 mb-6">
              Ready to take control of your finances? Schedule a consultation with our experts today.
            </p>
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20 w-full text-center">
              Book Consultation
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Meir and Meir, LLP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-neutral-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-xs text-neutral-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
