import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex text-white bg-neutral-900 w-10 h-10 rounded-lg items-center justify-center shadow-lg font-bold text-lg mb-4">
              M
            </div>
            <h3 className="font-bold text-lg mb-3 font-geist">Meir and Meir, LLP</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-geist">
              Expert accounting, tax, and consulting services. Specializing in employee benefit plan audits and tax problem resolution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-geist">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-neutral-400 text-sm">
                <Phone size={16} className="mt-0.5 min-w-[16px]" />
                <div>
                  <a href="tel:3104351759" className="hover:text-white transition-colors">(310) 435-1759</a>
                  <span className="block text-xs text-neutral-500">Canoga Park</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-neutral-400 text-sm">
                <Phone size={16} className="mt-0.5 min-w-[16px]" />
                <div>
                  <a href="tel:3102747541" className="hover:text-white transition-colors">(310) 274-7541</a>
                  <span className="block text-xs text-neutral-500">Beverly Hills</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-neutral-400 text-sm">
                <Mail size={16} className="mt-0.5 min-w-[16px]" />
                <a href="mailto:Info@meirandmeir.com" className="hover:text-white transition-colors">Info@meirandmeir.com</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-geist">Quick Links</h4>
            <div className="flex flex-col gap-2 text-neutral-400 text-sm">
              <Link to="/" className="hover:text-white transition-colors font-geist">Home</Link>
              <Link to="/services/audit-assurance" className="hover:text-white transition-colors font-geist">Audit & Assurance</Link>
              <Link to="/services/tax-services" className="hover:text-white transition-colors font-geist">Tax Services</Link>
              <Link to="/contact" className="hover:text-white transition-colors font-geist">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-geist">Offices</h4>
            <div className="flex flex-col gap-4 text-neutral-400 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 min-w-[16px]" />
                <div>
                  <p className="text-white font-medium">Canoga Park</p>
                  <p className="text-xs">21201 Victory Blvd<br />Suite #145, CA 91303</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 min-w-[16px]" />
                <div>
                  <p className="text-white font-medium">Beverly Hills</p>
                  <p className="text-xs">139 South Beverly Drive<br />Suite 204, CA 90212</p>
                </div>
              </div>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors text-neutral-400">
                <Linkedin size={18} />
                <span className="text-sm">Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>&copy; {currentYear} Meir and Meir, LLP. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white transition-colors font-geist">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors font-geist">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
