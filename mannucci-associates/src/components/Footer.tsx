import { Link } from 'react-router-dom';
import { Scale, MapPin, Phone, Mail, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-geist font-bold text-lg text-neutral-900">Mannucci Associates</span>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed font-inter">
              Serving Pasadena and surrounding areas with integrity, excellence, and personalized legal strategies for your business and family legacy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-geist font-semibold text-neutral-900 mb-6">Our Practice Areas</h4>
            <ul className="space-y-3">
              {['Business Law', 'Estate Planning', 'Commercial Litigation', 'Real Estate Law', 'Asset Protection'].map((item) => (
                <li key={item}>
                  <a href="/#services" className="text-neutral-500 hover:text-blue-600 text-sm transition-colors font-inter">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-geist font-semibold text-neutral-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Client Reviews', href: '/#reviews' },
                { name: 'FAQ', href: '/#faq' },
                { name: 'Contact', href: '/#contact' },
                { name: 'Privacy Policy', href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-neutral-500 hover:text-blue-600 text-sm transition-colors font-inter">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-geist font-semibold text-neutral-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-500 font-inter">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>123 Colorado Blvd, Suite 400<br />Pasadena, CA 91105</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-500 font-inter">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="tel:+16265550123" className="hover:text-blue-600 transition-colors">(626) 555-0123</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-500 font-inter">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="mailto:info@mannucci.law" className="hover:text-blue-600 transition-colors">info@mannucci.law</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400 font-inter">
            © {currentYear} Mannucci Associates. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-400 font-inter">
            <a href="#" className="hover:text-neutral-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-600 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
