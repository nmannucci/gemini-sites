import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AuditAssurance from './pages/services/AuditAssurance'
import BusinessServices from './pages/services/BusinessServices'
import QuickBooksServices from './pages/services/QuickBooksServices'
import TaxServices from './pages/services/TaxServices'
import EstatePlanning from './pages/services/EstatePlanning'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/audit-assurance" element={<AuditAssurance />} />
        <Route path="/services/business-services" element={<BusinessServices />} />
        <Route path="/services/quickbooks-services" element={<QuickBooksServices />} />
        <Route path="/services/tax-services" element={<TaxServices />} />
        <Route path="/services/estate-planning" element={<EstatePlanning />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
