import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Leaf, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1120] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-geist font-semibold text-xl text-white">
                Green Plus <span className="text-emerald-400">CPA</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Expert cannabis tax and accounting services. Helping cannabis businesses reduce taxes,
              maintain compliance, and achieve financial success since 2022.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/sevanajaniancpa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-geist font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services/cannabis-tax" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Cannabis Tax Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-geist font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-neutral-400">280E Tax Strategy</li>
              <li className="text-neutral-400">Tax Compliance</li>
              <li className="text-neutral-400">Business Tax Returns</li>
              <li className="text-neutral-400">Bookkeeping</li>
              <li className="text-neutral-400">Financial Statements</li>
              <li className="text-neutral-400">IRS Representation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-geist font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400 text-sm">
                  301 N Lake Ave Suite 600<br />
                  Pasadena, CA 91101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+18186442550" className="text-neutral-400 hover:text-emerald-400 transition-colors text-sm">
                  (818) 644-2550
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:sevana.janian@greenpluscpa.com" className="text-neutral-400 hover:text-emerald-400 transition-colors text-sm break-all">
                  sevana.janian@greenpluscpa.com
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-neutral-400 text-sm">
                <span className="text-emerald-400 font-medium">Hours:</span><br />
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} Green Plus CPA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-neutral-600 text-xs mt-6 text-center md:text-left">
            The information on this website is for general informational purposes only and does not constitute professional tax or legal advice.
            Please consult with a qualified professional for advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
