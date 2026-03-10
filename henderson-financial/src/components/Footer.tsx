
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight block mb-6">
              HENDERSON <span className="text-gold-500">FINANCIAL</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering individuals and businesses with financial tools and information. Quality service with great prices.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white">Contact Info</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span>260 S. Los Robles Suite 318<br />Pasadena, CA 91101</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <a href="tel:6267449450" className="hover:text-white transition-colors">626-744-9450</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <a href="mailto:contactus@hfsol.com" className="hover:text-white transition-colors">contactus@hfsol.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white">Quick Links</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/#home" className="hover:text-gold-500 transition-colors">Home</a></li>
              <li><a href="/#services" className="hover:text-gold-500 transition-colors">Services</a></li>
              <li><a href="/#about" className="hover:text-gold-500 transition-colors">About Us</a></li>
              <li><a href="/#contact" className="hover:text-gold-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-white">Disclaimer</h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              Information provided on this site is for general information purposes only and should not be substituted for legal or professional advice. Henderson Financial Solutions, Inc. is not responsible for any action taken as a result of this information.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2026 Henderson Financial Solutions, Inc. All rights reserved.</p>
          <div className="flex gap-6 text-gray-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
