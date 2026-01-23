import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4 px-6 lg:px-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex text-white bg-neutral-900 w-10 h-10 rounded-lg items-center justify-center shadow-lg font-bold text-lg">
            M
          </div>
          <div>
            <span className="font-bold text-neutral-900 font-geist">Meir and Meir, LLP</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium font-geist">Home</NavLink>

          <div className="relative group">
            <button
              className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium font-geist flex items-center gap-1"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <ChevronDown size={16} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <NavLink to="/services/audit-assurance" className="block px-4 py-2 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-geist">Audit & Assurance</NavLink>
                <NavLink to="/services/business-services" className="block px-4 py-2 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-geist">Business Services</NavLink>
                <NavLink to="/services/quickbooks-services" className="block px-4 py-2 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-geist">QuickBooks Services</NavLink>
                <NavLink to="/services/tax-services" className="block px-4 py-2 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-geist">Tax Services</NavLink>
                <NavLink to="/services/estate-planning" className="block px-4 py-2 text-sm text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-geist">Estate Planning</NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium font-geist">Contact</NavLink>

          <div className="flex items-center gap-3 ml-4">
            <a href="tel:3104351759" className="flex items-center gap-2 text-sm font-semibold text-neutral-900 border-b border-neutral-300 pb-1 hover:border-neutral-900 transition-all font-geist">
              <Phone size={16} /> (310) 435-1759
            </a>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2.5 font-semibold transition-all duration-300 shadow-blue-500/20 hover:shadow-blue-500/40 font-geist">
              Book Consultation
            </Link>
          </div>
        </div>

        <button className="md:hidden flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <NavLink to="/" className="block text-neutral-600 hover:text-neutral-900 font-medium font-geist" onClick={() => setIsOpen(false)}>Home</NavLink>

            <div>
              <button
                className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 font-medium font-geist w-full"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </button>
              {servicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <NavLink to="/services/audit-assurance" className="block text-sm text-neutral-500 hover:text-blue-600 font-geist" onClick={() => setIsOpen(false)}>Audit & Assurance</NavLink>
                  <NavLink to="/services/business-services" className="block text-sm text-neutral-500 hover:text-blue-600 font-geist" onClick={() => setIsOpen(false)}>Business Services</NavLink>
                  <NavLink to="/services/quickbooks-services" className="block text-sm text-neutral-500 hover:text-blue-600 font-geist" onClick={() => setIsOpen(false)}>QuickBooks Services</NavLink>
                  <NavLink to="/services/tax-services" className="block text-sm text-neutral-500 hover:text-blue-600 font-geist" onClick={() => setIsOpen(false)}>Tax Services</NavLink>
                  <NavLink to="/services/estate-planning" className="block text-sm text-neutral-500 hover:text-blue-600 font-geist" onClick={() => setIsOpen(false)}>Estate Planning</NavLink>
                </div>
              )}
            </div>

            <NavLink to="/contact" className="block text-neutral-600 hover:text-neutral-900 font-medium font-geist" onClick={() => setIsOpen(false)}>Contact</NavLink>

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
              <a href="tel:3104351759" className="flex items-center gap-2 text-sm font-semibold text-neutral-900 font-geist">
                <Phone size={16} /> (310) 435-1759
              </a>
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2.5 font-semibold transition-all duration-300 font-geist text-center" onClick={() => setIsOpen(false)}>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
