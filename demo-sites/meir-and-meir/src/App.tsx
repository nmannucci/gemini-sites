import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AuditServices from './pages/services/AuditServices';
import TaxServices from './pages/services/TaxServices';
import BusinessServices from './pages/services/BusinessServices';
import EstatePlanning from './pages/services/EstatePlanning';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/audit" element={<AuditServices />} />
          <Route path="/services/tax" element={<TaxServices />} />
          <Route path="/services/business" element={<BusinessServices />} />
          <Route path="/services/estate-planning" element={<EstatePlanning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;