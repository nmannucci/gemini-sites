import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Scale } from 'lucide-react';

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

  const navLinks = [
    { name: 'Services', path: '/#services' },
    { name: 'About Us', path: '/#about' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'FAQ', path: '/#faq' },
  ];

  return (
    <>
      {/* Progressive Blur Background */}
      <div className="gradient-blur">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <header
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-law-navy rounded-sm flex items-center justify-center text-law-gold shadow-lg group-hover:bg-law-gold group-hover:text-law-navy transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-law-navy uppercase tracking-widest">Mannucci</span>
              <span className="font-sans text-[10px] text-law-charcoal/60 font-medium tracking-[0.2em] uppercase">Associates</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-xs font-bold tracking-widest uppercase text-law-charcoal/80 hover:text-law-gold transition-colors font-sans"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+16265550123"
              className="flex items-center gap-2 text-law-charcoal/80 hover:text-law-gold font-bold text-xs tracking-widest uppercase transition-colors font-sans"
            >
              <Phone className="w-4 h-4" />
              <span>(626) 555-0123</span>
            </a>
            <a
              href="#contact"
              className="bg-law-navy hover:bg-law-gold text-white hover:text-law-navy font-bold text-xs tracking-widest uppercase py-3 px-6 transition-all font-sans"
            >
              Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-neutral-600"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-neutral-900/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[61] w-[300px] h-full bg-white shadow-2xl transition-transform duration-300 lg:hidden transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="font-geist font-bold text-lg">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="py-3 px-4 rounded-lg hover:bg-neutral-50 text-neutral-600 font-medium transition-colors font-inter"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-col gap-4">
            <a
              href="tel:+16265550123"
              className="w-full flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg text-neutral-600 font-medium hover:bg-neutral-50 transition-colors font-inter"
            >
              <Phone className="w-4 h-4" />
              (626) 555-0123
            </a>
            <a
              href="#contact"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-center shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors font-geist"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
