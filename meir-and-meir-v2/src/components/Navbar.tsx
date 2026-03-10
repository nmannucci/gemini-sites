import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Force solid style if scrolled OR if not on the home page
  const useSolidStyle = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: "Audit & Assurance", path: "/services" },
    { name: "Tax Planning & Problems", path: "/services/tax-problems" },
    { name: "Business Advisory", path: "/services" },
    { name: "Forensic Accounting", path: "/services" },
    { name: "Estate Planning", path: "/services" },
    { name: "Peer Reviews", path: "/services" }
  ];

  return (
    <>
      <header 
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-500 ${
          useSolidStyle 
            ? 'bg-brand-cream/95 backdrop-blur-md py-4 border-b border-brand-navy/5 shadow-sm' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-50 group">
              <div className={`font-serif text-2xl tracking-widest uppercase transition-colors duration-500 ${useSolidStyle ? 'text-brand-navy' : 'text-white'}`}>
                Meir <span className="text-brand-gold">&</span> Meir
              </div>
              <div className={`text-[0.6rem] tracking-[0.3em] font-sans uppercase transition-colors duration-500 pl-1 ${useSolidStyle ? 'text-brand-navy/60' : 'text-white/60'}`}>
                Certified Public Accountants
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-12">
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className={`flex items-center gap-1 text-sm font-sans tracking-widest transition-colors duration-500 uppercase ${useSolidStyle ? 'text-brand-navy/80 hover:text-brand-gold' : 'text-white/80 hover:text-brand-gold'}`}>
                  Services
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
                
                {/* Dropdown Content */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 min-w-[260px]">
                  <div className="bg-white shadow-xl border border-brand-navy/5 py-4 relative">
                    {/* Tiny triangle pointer */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-brand-navy/5 transform rotate-45"></div>
                    
                    {services.map((service) => (
                      <Link 
                        key={service.name}
                        to={service.path} 
                        className="block px-8 py-3 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-cream/50 transition-colors font-sans text-xs tracking-widest uppercase border-l-2 border-transparent hover:border-brand-gold"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/about" className={`text-sm font-sans tracking-widest transition-colors duration-500 uppercase ${useSolidStyle ? 'text-brand-navy/80 hover:text-brand-gold' : 'text-white/80 hover:text-brand-gold'}`}>Our Firm</Link>
              <Link to="/resources" className={`text-sm font-sans tracking-widest transition-colors duration-500 uppercase ${useSolidStyle ? 'text-brand-navy/80 hover:text-brand-gold' : 'text-white/80 hover:text-brand-gold'}`}>Resources</Link>
              
              <Link 
                to="/contact" 
                className={`px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-300 ${useSolidStyle ? 'bg-brand-navy text-white hover:bg-brand-gold' : 'bg-brand-gold text-brand-navy hover:bg-white'}`}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button 
              className={`md:hidden relative z-50 transition-colors duration-500 ${useSolidStyle ? 'text-brand-navy' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-brand-cream transition-transform duration-500 ease-in-out md:hidden flex items-center justify-center ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="flex flex-col items-center gap-8 text-center">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-brand-navy">Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-brand-navy">Services</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-brand-navy">Our Firm</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-brand-navy">Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
