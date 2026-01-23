
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Calculator, 
  ShieldCheck, 
  BookOpen,
  ArrowRight,
  MapPin
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
            alt="Modern financial building in Pasadena" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Expert CPA & Small Business <span className="text-gold-500">Accounting Services</span> in Pasadena
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed max-w-2xl">
              Henderson Financial Solutions empowers individuals and businesses with precision tax planning, comprehensive accounting, and strategic wealth management.
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
              <p className="text-gold-500 text-3xl font-serif font-bold mb-2">Since 2026</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Excellence in Service</p>
            </div>
            <div className="p-4 border-l-0 md:border-l border-white/10">
              <p className="text-gold-500 text-3xl font-serif font-bold mb-2">Expert Team</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Certified Professionals</p>
            </div>
            <div className="p-4 border-l-0 md:border-l border-white/10">
              <p className="text-gold-500 text-3xl font-serif font-bold mb-2">Personalized</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Client-Centric Approach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">Comprehensive Accounting & Tax Services</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Link to="/services/tax-planning" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <TrendingUp className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Financial Planning</h4>
              <p className="text-gray-600 leading-relaxed">Strategic roadmaps to help you build, manage, and preserve wealth for the long term.</p>
            </Link>

            {/* Service 2 */}
            <Link to="/services/individual-tax-preparation" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <FileText className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Tax Preparation</h4>
              <p className="text-gray-600 leading-relaxed">Accurate and efficient tax return services for both individuals and businesses.</p>
            </Link>

            {/* Service 3 */}
            <Link to="/services/payroll" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <Users className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Payroll Services</h4>
              <p className="text-gray-600 leading-relaxed">Streamlined payroll solutions to ensure your employees are paid on time and compliantly.</p>
            </Link>

            {/* Service 4 */}
            <Link to="/services/bookkeeping" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <Calculator className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Bookkeeping</h4>
              <p className="text-gray-600 leading-relaxed">Meticulous record-keeping to provide you with a clear picture of your financial health.</p>
            </Link>

            {/* Service 5 */}
            <Link to="/services/tax-planning" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Credit Consulting</h4>
              <p className="text-gray-600 leading-relaxed">Expert advice to help you understand, repair, and optimize your credit standing.</p>
            </Link>

            {/* Service 6 */}
            <Link to="/services/tax-planning" className="group p-8 bg-slate-50 hover:bg-white border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 rounded-sm">
              <div className="w-14 h-14 bg-navy-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold-500 transition-colors">
                <BookOpen className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mb-3">Tax Planning</h4>
              <p className="text-gray-600 leading-relaxed">Proactive strategies to minimize liabilities and maximize your financial efficiency.</p>
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
                 alt="Professional Accountant and Tax Strategist in Pasadena" 
                 className="relative z-10 w-full h-auto rounded-sm shadow-2xl"
               />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">Empowering Clients with Information</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Henderson Financial Solutions, we believe that informed clients make the best financial decisions. Our mission is to provide you with the tools, resources, and expert guidance needed to navigate the complexities of finance with confidence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are committed to delivering quality service at competitive prices, ensuring that professional financial management is accessible to both individuals and businesses.
              </p>
              <a href="#contact" className="inline-flex items-center text-navy-900 font-semibold hover:text-gold-600 transition-colors">
                Meet Our Team <ArrowRight className="ml-2 w-5 h-5" />
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
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">Meet Our Founder</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 md:p-12 rounded-sm border border-gray-100 shadow-sm">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src={founderImg} 
                    alt="Carl Johnson - Pasadena Tax Strategy Specialist" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 bg-gold-500 text-navy-900 p-2 rounded-full shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-2">Carl Johnson</h4>
              <p className="text-gold-600 font-medium text-lg mb-6">Principal & Senior Financial Strategist</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                With years of dedicated service in Pasadena, Carl Johnson leads the firm with a commitment to integrity, precision, and client empowerment. Specializing in complex tax strategies and business financial planning, Carl ensures that every client receives personalized guidance tailored to their unique financial landscape. His approach combines traditional accounting principles with modern financial strategies to build lasting wealth.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Tax Strategy Specialist</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Business Financial Planning</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">CPE Certified Professional</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-sm border border-gray-200">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="font-semibold text-navy-900">Wealth Management Expert</span>
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
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">Accounting & Tax FAQs</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-navy-900 mb-3">Why do I need a CPA for my small business?</h4>
              <p className="text-gray-600 leading-relaxed">
                A Certified Public Accountant (CPA) goes beyond basic bookkeeping. We provide strategic business accounting, ensure full compliance with changing tax laws, and identify tax savings opportunities that standard software often misses.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-navy-900 mb-3">What tax preparation services do you offer?</h4>
              <p className="text-gray-600 leading-relaxed">
                We offer comprehensive tax preparation for individuals, partnerships, LLCs, and corporations. This includes electronic filing, tax planning strategies to minimize liability, and representation before the IRS if needed.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-navy-900 mb-3">How can financial planning help me?</h4>
              <p className="text-gray-600 leading-relaxed">
                Proper financial planning provides a roadmap for your future. Whether it's retirement planning, wealth management, or saving for education, we help you set realistic goals and create actionable steps to achieve financial freedom.
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
               <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8">Serving Pasadena & Greater Los Angeles</h3>
               <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                 While we are based in the heart of Pasadena, our reputation for excellence extends throughout the San Gabriel Valley and Greater Los Angeles area. We are proud to be a trusted financial partner for individuals and businesses in these communities.
               </p>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
                 {[
                   'Pasadena', 'San Marino', 'Arcadia', 
                   'Glendale', 'Altadena', 'Sierra Madre',
                   'La Cañada Flintridge', 'South Pasadena', 'Downtown LA'
                 ].map((city) => (
                   <div key={city} className="flex items-center gap-2 group cursor-default">
                     <MapPin className="w-4 h-4 text-gold-500 group-hover:text-white transition-colors" />
                     <span className="text-gray-300 group-hover:text-gold-500 transition-colors font-medium">{city}</span>
                   </div>
                 ))}
               </div>
               
               <div className="mt-12 p-6 bg-navy-800 rounded-sm border-l-4 border-gold-500">
                 <p className="text-white italic">
                   "Centrally located on South Los Robles Avenue, providing easy access for all our clients."
                 </p>
               </div>
             </div>

             {/* Map Embed */}
             <div className="h-[400px] w-full bg-gray-200 rounded-sm overflow-hidden shadow-2xl border-4 border-white/10">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.2471822834676!2d-118.14448502353116!3d34.14002751307612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c366e4755555%3A0x6b80365022137683!2s260%20S%20Los%20Robles%20Ave%20%23318%2C%20Pasadena%2C%20CA%2091101!5e0!3m2!1sen!2sus!4v1705600000000!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Henderson Financial Solutions Location"
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
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Client Resources at Your Fingertips</h3>
              <p className="text-gray-300 text-lg mb-8">
                Access your documents securely, stay updated with the latest tax news, and utilize our financial calculators to plan ahead.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-navy-900 font-semibold rounded-sm hover:bg-gray-100 transition-colors">
                  Client Portal
                </button>
                <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors">
                  Tax Tips & News
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-navy-800 rounded-sm border border-white/5 hover:border-gold-500/50 transition-colors">
                <ShieldCheck className="w-10 h-10 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Secure Portal</h4>
                <p className="text-sm text-gray-400">Safely upload and access your sensitive financial documents.</p>
              </div>
              <div className="p-6 bg-navy-800 rounded-sm border border-white/5 hover:border-gold-500/50 transition-colors">
                <BookOpen className="w-10 h-10 text-gold-500 mb-4" />
                <h4 className="font-bold text-lg mb-2">Knowledge Base</h4>
                <p className="text-sm text-gray-400">Educational videos and articles to help you stay informed.</p>
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
