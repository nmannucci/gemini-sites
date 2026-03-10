import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TaxProblems from './pages/services/TaxProblems';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-20">
    <div className="text-center">
      <h1 className="font-serif text-5xl text-brand-navy mb-4">{title}</h1>
      <p className="font-sans text-brand-navy/60 font-normal tracking-widest uppercase">Coming Soon</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/tax-problems" element={<TaxProblems />} />
        <Route path="/services" element={<PagePlaceholder title="Our Services" />} />
        <Route path="/about" element={<PagePlaceholder title="Our Firm" />} />
        <Route path="/resources" element={<PagePlaceholder title="Resources" />} />
        <Route path="/contact" element={<PagePlaceholder title="Contact Us" />} />
        <Route path="*" element={<PagePlaceholder title="404 - Not Found" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;