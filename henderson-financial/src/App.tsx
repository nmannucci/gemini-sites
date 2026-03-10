import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SmallBusinessAccounting from './pages/services/SmallBusinessAccounting';
import IndividualTaxPreparation from './pages/services/IndividualTaxPreparation';
import PayrollServices from './pages/services/PayrollServices';
import Bookkeeping from './pages/services/Bookkeeping';
import TaxPlanning from './pages/services/TaxPlanning';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/small-business-accounting" element={<SmallBusinessAccounting />} />
            <Route path="/services/individual-tax-preparation" element={<IndividualTaxPreparation />} />
            <Route path="/services/payroll" element={<PayrollServices />} />
            <Route path="/services/bookkeeping" element={<Bookkeeping />} />
            <Route path="/services/tax-planning" element={<TaxPlanning />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
