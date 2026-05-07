import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="gradient-blur"></div>
      <header 
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-geist text-neutral-900 leading-none">Meir & Meir</span>
                <span className="text-xs text-neutral-500 font-medium tracking-wide">LLP</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-geist text-neutral-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2">
                  <Link to="/services/audit" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Audit & Assurance</Link>
                  <Link to="/services/tax" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Tax Services</Link>
                  <Link to="/services/business" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Business Services</Link>
                  <Link to="/services/estate-planning" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Estate Planning</Link>
                </div>
              </div>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+13104351759" className="flex items-center gap-2 text-neutral-600 hover:text-blue-600 transition-colors font-medium text-sm">
                <Phone className="w-4 h-4" />
                (310) 435-1759
              </a>
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
                Book Consultation
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-neutral-600 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className={`absolute right-0 top-0 bottom-0 h-[100dvh] w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <span className="text-lg font-bold text-neutral-900 font-geist">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-6 space-y-4 flex-grow font-geist overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-neutral-800 hover:text-blue-600">Home</Link>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Services</div>
                <Link to="/services/audit" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Audit & Assurance</Link>
                <Link to="/services/tax" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Tax Services</Link>
                <Link to="/services/business" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Business Services</Link>
                <Link to="/services/estate-planning" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Estate Planning</Link>
              </div>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-neutral-800 hover:text-blue-600">Contact</Link>
            </nav>
            <div className="p-6 border-t border-neutral-100 bg-neutral-50 shrink-0">
                <a href="tel:+13104351759" className="flex items-center justify-center gap-2 w-full bg-white border border-neutral-200 py-3 rounded-lg text-neutral-700 font-medium mb-3">
                    <Phone className="w-4 h-4" /> Call Us
                </a>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-blue-600/20">
                    Book Consultation
                </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
