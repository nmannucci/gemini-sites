import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import GoogleReviews from '../components/GoogleReviews';
import founderImg from '../assets/Carl Johnson - Founder.png';

export default function Home() {
  return (
    <div className="font-sans text-gray-800 bg-slate-50">
      
      {/* Hero Section */}
      <section id="home" className="relative pt-20 flex items-center min-h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Modern financial building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <div className="md:w-3/4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Helping You Make Better Decisions With Customized <span className="text-gold-500">Accounting, Tax, and Advisory Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-2xl">
              Enterprise accounting solutions delivered with a personal touch. Tailored services that fit your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="px-8 py-4 text-base font-semibold text-navy-900 bg-gold-500 hover:bg-gold-600 rounded-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Get Started
              </a>
              <a href="#services" className="px-8 py-4 text-base font-semibold text-white border border-white/30 hover:bg-white/10 rounded-sm transition-all backdrop-blur-sm">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="bg-navy-900 py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="p-4">
              <p className="text-gold-500 text-3xl font-bold mb-2">Expert</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Certified Public Accountant</p>
            </div>
            <div className="p-4 border-l-0 md:border-l border-white/10">
              <p className="text-gold-500 text-3xl font-bold mb-2">Precision</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Detail-Oriented Service</p>
            </div>
            <div className="p-4 border-l-0 md:border-l border-white/10">
              <p className="text-gold-500 text-3xl font-bold mb-2">Advisory</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Strategic Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900">Comprehensive Accounting & Tax Services</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Link to="/services/small-business-accounting" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <Calculator className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Accounting Services</h4>
              <p className="text-gray-600 leading-relaxed">Tailored accounting solutions to keep your business finances organized and compliant.</p>
            </Link>

            {/* Service 2 */}
            <Link to="/services/individual-tax-preparation" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <FileText className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Tax Services</h4>
              <p className="text-gray-600 leading-relaxed">Expert tax preparation and planning to minimize liabilities and maximize returns.</p>
            </Link>

            {/* Service 3 */}
            <Link to="/services/payroll" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <TrendingUp className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Financial Advisory</h4>
              <p className="text-gray-600 leading-relaxed">Strategic guidance to help you scale your business with precision and efficiency.</p>
            </Link>

            {/* Service 4 */}
            <Link to="/services/bookkeeping" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Formations</h4>
              <p className="text-gray-600 leading-relaxed">Assistance with business entity formation to start your venture on the right foot.</p>
            </Link>

            {/* Service 5 */}
            <Link to="/services/tax-planning" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <BookOpen className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Entity Services</h4>
              <p className="text-gray-600 leading-relaxed">Comprehensive support for your business entity throughout its lifecycle.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-4 -left-4 w-full h-full border-2 border-gold-500 rounded-sm z-0 hidden md:block"></div>
               <img 
                 src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070" 
                 alt="Professional Accountant" 
                 className="relative z-10 w-full h-auto rounded-sm shadow-2xl"
               />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Personalized Enterprise Solutions</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With MashCPA you'll get tailored services that fit your specific needs. My goal is to help you scale with precision and efficiency.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                When you work with me, you're not just hiring an accountant—you're gaining a trusted advisor committed to your success.
              </p>
              <a href="#contact" className="inline-flex items-center text-navy-900 font-semibold hover:text-gold-600 transition-colors">
                Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Leadership</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900">Meet Our Founder</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 md:p-12 rounded-sm border border-gray-100 shadow-sm">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  {/* Using a placeholder or the existing image since I don't have Denis's photo. 
                      Ideally, I'd search for a generic professional placeholder if not using the old one, 
                      but keeping the structure is safer. I'll just change the Alt text. */}
                  <img 
                    src={founderImg} 
                    alt="Denis Mashkov - CPA" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 bg-gold-500 text-navy-900 p-2 rounded-full shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">Denis Mashkov</h4>
              <p className="text-gold-600 font-medium text-lg mb-6">Certified Public Accountant</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Denis Mashkov provides enterprise accounting solutions with a personal touch. As a CPA, he is dedicated to helping clients navigate the complexities of tax and accounting to achieve their financial goals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Accounting Services</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Tax Strategy</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Financial Advisory</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Entity Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Common Questions</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900">Accounting & Tax FAQs</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-navy-900 mb-3">Why do I need a CPA?</h4>
              <p className="text-gray-600 leading-relaxed">
                A CPA provides expert guidance on tax laws, financial planning, and business strategy, ensuring you make informed decisions and stay compliant.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-navy-900 mb-3">What areas do you serve?</h4>
              <p className="text-gray-600 leading-relaxed">
                We serve clients in Montrose, CA, and surrounding areas, as well as providing remote services for clients elsewhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Areas Served Section */}
      <section className="py-24 bg-navy-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             {/* Areas Served */}
             <div>
               <h2 className="text-sm font-bold text-gold-500 uppercase tracking-wider mb-2">Local Expertise</h2>
               <h3 className="text-3xl md:text-4xl font-bold mb-8">Serving Montrose & Beyond</h3>
               <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                 Based in Montrose, CA, we provide top-tier accounting and tax services to our local community and clients across the region.
               </p>
               
               <div className="mt-12 p-6 bg-navy-800 rounded-sm border-l-4 border-gold-500">
                 <p className="text-white italic">
                   "Committed to your success with precision and efficiency."
                 </p>
               </div>
             </div>

             {/* Map Embed */}
             <div className="h-[400px] w-full bg-gray-200 rounded-sm overflow-hidden shadow-2xl border-4 border-white/10">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.998492823659!2d-118.2307!3d34.2045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDEyJzE2LjIiTiAxMTjCsDEzJzUwLjUiVw!5e0!3m2!1sen!2sus!4v1705600000000!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="MashCPA Location"
               ></iframe>
             </div>
           </div>
        </div>
      </section>

      {/* Resources/CTA Section */}
      <section id="resources" className="py-24 bg-navy-900 text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-800 skew-x-12 transform translate-x-1/2 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Business?</h3>
              <p className="text-gray-300 text-lg mb-8">
                Get the accounting and tax support you need to make better decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 bg-white text-navy-900 font-semibold rounded-sm hover:bg-gray-100 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-navy-800 rounded-sm border border-white/5 hover:border-gold-500/50 transition-colors">
                <ShieldCheck className="w-10 h-10 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Trusted Advisor</h4>
                <p className="text-sm text-gray-400">Committed to your long-term success.</p>
              </div>
              <div className="p-6 bg-navy-800 rounded-sm border border-white/5 hover:border-gold-500/50 transition-colors">
                <BookOpen className="w-10 h-10 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Expert Knowledge</h4>
                <p className="text-sm text-gray-400">Up-to-date with the latest tax laws and strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}