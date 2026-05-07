import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  const services = [
    { name: 'Cannabis Tax Services', href: '/services/cannabis-tax' },
  ];

  return (
    <>
      {/* Progressive Blur Background */}
      <div className="gradient-blur">
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <header
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-geist font-semibold text-xl text-neutral-900">
                Green Plus <span className="text-emerald-600">CPA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-4 py-3 text-neutral-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+18186442550"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-200/80 bg-white/60 backdrop-blur-sm text-neutral-600 hover:bg-white transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(818) 644-2550</span>
              </a>
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Free Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-40">
            <div className="px-6 py-8 space-y-6">
              <Link
                to="/"
                className="block text-lg font-medium text-neutral-900 py-2"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-neutral-900 py-2"
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block py-2 text-neutral-600 hover:text-emerald-600"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block text-lg font-medium text-neutral-900 py-2"
              >
                Contact
              </Link>

              <div className="pt-6 space-y-4">
                <a
                  href="tel:+18186442550"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-neutral-200 bg-white text-neutral-700 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  (818) 644-2550
                </a>
                <Link
                  to="/contact"
                  className="block text-center w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
