import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold text-navy-900 tracking-tight">
              HENDERSON <span className="text-gold-500">FINANCIAL</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors focus:outline-none">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-sm shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                <div className="py-2">
                  <Link to="/services/small-business-accounting" className="block px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-gold-600">
                    Small Business Accounting
                  </Link>
                  <Link to="/services/individual-tax-preparation" className="block px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-gold-600">
                    Individual Tax Preparation
                  </Link>
                  <Link to="/services/payroll" className="block px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-gold-600">
                    Payroll Services
                  </Link>
                  <Link to="/services/bookkeeping" className="block px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-gold-600">
                    Bookkeeping
                  </Link>
                  <Link to="/services/tax-planning" className="block px-4 py-3 text-sm text-gray-700 hover:bg-slate-50 hover:text-gold-600">
                    Tax Planning
                  </Link>
                </div>
              </div>
            </div>

            {isHome ? (
              <>
                <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">About Us</button>
                <button onClick={() => scrollToSection('resources')} className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">Resources</button>
              </>
            ) : (
              <>
                <Link to="/#about" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">About Us</Link>
                <Link to="/#resources" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">Resources</Link>
              </>
            )}

            <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">Contact Us</Link>

            <a href="tel:6267449450" 
              className="px-5 py-2.5 text-sm font-semibold text-navy-900 border border-navy-900 hover:bg-navy-50 rounded-sm transition-colors"
            >
              Call Us
            </a>

            <Link to="/contact"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-sm transition-colors shadow-lg shadow-navy-900/20"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-navy-900 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-navy-900 hover:bg-gray-50">Home</Link>
            
            <div className="px-3 py-2">
              <button onClick={toggleServices} className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-navy-900">
                Services <ChevronDown className={`w-4 h-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="mt-2 pl-4 space-y-2 border-l-2 border-gold-500/20 ml-1">
                  <Link to="/services/small-business-accounting" onClick={toggleMenu} className="block text-sm text-gray-600 hover:text-gold-600 py-1">Small Business Accounting</Link>
                  <Link to="/services/individual-tax-preparation" onClick={toggleMenu} className="block text-sm text-gray-600 hover:text-gold-600 py-1">Individual Tax Preparation</Link>
                  <Link to="/services/payroll" onClick={toggleMenu} className="block text-sm text-gray-600 hover:text-gold-600 py-1">Payroll Services</Link>
                  <Link to="/services/bookkeeping" onClick={toggleMenu} className="block text-sm text-gray-600 hover:text-gold-600 py-1">Bookkeeping</Link>
                  <Link to="/services/tax-planning" onClick={toggleMenu} className="block text-sm text-gray-600 hover:text-gold-600 py-1">Tax Planning</Link>
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-navy-900 hover:bg-gray-50">About Us</button>
            <button onClick={() => scrollToSection('resources')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-navy-900 hover:bg-gray-50">Resources</button>
            <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-navy-900 hover:bg-gray-50">Contact Us</Link>
            <a href="tel:6267449450" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-navy-900 hover:bg-gray-50 font-semibold">Call: 626-744-9450</a>
            <Link to="/contact" onClick={toggleMenu} className="block w-full text-left px-3 py-2 text-base font-medium text-gold-600 font-semibold">Book Consultation</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
