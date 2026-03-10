import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, MapPin, Star, Award, BookOpen, Clock, Phone, FileSearch, ChevronDown, ChevronUp } from 'lucide-react';
import PlaceholderForm from '../components/PlaceholderForm';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Serving Canoga Park & Beverly Hills
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-geist text-neutral-900 tracking-tight leading-[1.1] mb-6">
                Expert Accounting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  with Discretion.
                </span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg">
                Meir and Meir, LLP provides comprehensive accounting, tax, and consulting services. We handle the numbers so you can focus on running your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                  Schedule Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/services/tax" className="px-8 py-4 rounded-full border border-neutral-200 bg-white/60 backdrop-blur-sm text-neutral-700 hover:bg-white hover:border-blue-200 transition-all flex items-center justify-center">
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Hero Form / Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-3xl transform rotate-3 scale-105 blur-xl"></div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/5 p-8 rounded-2xl relative">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-geist">Get a Free Assessment</h3>
                <p className="text-neutral-500 text-sm mb-6">Fill out the form below and our team will get back to you shortly.</p>
                <PlaceholderForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-12 bg-white border-y border-neutral-100">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <Award className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-geist text-neutral-900">40+ Years</span>
                    <span className="text-sm text-neutral-500 font-medium">Combined Experience</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-geist text-neutral-900">Certified</span>
                    <span className="text-sm text-neutral-500 font-medium">Public Accountants</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <Users className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-geist text-neutral-900">Peer Review</span>
                    <span className="text-sm text-neutral-500 font-medium">Team Captains</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <Shield className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-geist text-neutral-900">Discreet</span>
                    <span className="text-sm text-neutral-500 font-medium">Problem Solvers</span>
                </div>
            </div>
        </div>
      </section>

      {/* Updated Services Section */}
      <section className="py-24 bg-stone-50 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-geist text-neutral-900 mb-4">Comprehensive Financial Solutions</h2>
            <p className="text-neutral-500 text-lg">
              We offer a full range of accounting, tax, and consulting services designed to meet the unique needs of your business and family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <Link to="/services/audit" className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileSearch className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Audit & Assurance</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">
                Specialized audits for employee benefit plans and non-profit organizations. Efficient, affordable, and compliant with all regulations.
              </p>
              <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                View Details <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

             {/* Service 2 */}
             <Link to="/services/tax" className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Tax Services</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">
                From preparation to complex problem resolution. We handle IRS audits, liens, levies, and back taxes so you don't have to.
              </p>
              <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                View Details <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

             {/* Service 3 */}
             <Link to="/services/business" className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Business Services</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">
                Strategic planning, CFO services, forensic accounting, and succession planning to ensure your business thrives.
              </p>
              <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                View Details <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

             {/* Service 4 */}
             <Link to="/services/estate-planning" className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Estate Planning</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">
                Protect your legacy. We provide comprehensive planning to manage risk and ensure the longevity of your wealth.
              </p>
              <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                View Details <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold font-geist mb-6">About Our Firm</h2>
                    <p className="text-neutral-400 mb-6 leading-relaxed">
                        Meir and Meir, LLP is led by a team of highly experienced professionals dedicated to your financial success. With advanced degrees and decades of experience, our partners bring a depth of knowledge that sets us apart.
                    </p>
                     <p className="text-neutral-400 mb-8 leading-relaxed">
                        We pride ourselves on handling business and tax matters with efficiency, affordability, and discretion. Our goal is to take care of the numbers so you can focus on what you do best.
                    </p>
                    <Link to="/contact" className="inline-block bg-white text-neutral-900 px-8 py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors">
                        Get in Touch
                    </Link>
                </div>
                <div className="space-y-6">
                    <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-colors">
                        <h3 className="text-xl font-bold mb-1 font-geist">Saul Meir, CPA</h3>
                        <p className="text-blue-400 text-sm font-medium mb-3">Partner & Senior Auditor</p>
                        <p className="text-neutral-400 text-sm">Joined in 1985. Holds an MA in Economics with Honors from Tel Aviv University.</p>
                    </div>
                    <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-colors">
                        <h3 className="text-xl font-bold mb-1 font-geist">Maurice M. Meir, CPA</h3>
                        <p className="text-blue-400 text-sm font-medium mb-3">Partner</p>
                        <p className="text-neutral-400 text-sm">Over 40 years of experience. Peer Review Team Captain for California CPA. MBA from USC.</p>
                    </div>
                    <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-colors">
                        <h3 className="text-xl font-bold mb-1 font-geist">Orit Cohen Gendelman, CPA</h3>
                        <p className="text-blue-400 text-sm font-medium mb-3">Partner (C&G Group)</p>
                        <p className="text-neutral-400 text-sm">15+ years of combined experience in audit, tax, and management.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3 Easy Steps Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">How It Works</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-geist text-neutral-900 mb-4">3 Easy Steps to Financial Peace of Mind</h2>
                <p className="text-neutral-500">We make the process simple and stress-free so you can get back to what matters most.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-neutral-100 -z-10"></div>

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                    <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:bg-blue-700 transition-all">1</div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Schedule a Consultation</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                        Contact us via phone or our online form to set up a free initial assessment of your situation.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                    <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:bg-blue-700 transition-all">2</div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Expert Analysis</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                        We review your financials, identify issues, and develop a strategic plan tailored to your goals.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                    <div className="w-24 h-24 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:bg-blue-700 transition-all">3</div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">Resolution & Growth</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                        We implement the solution, resolve any tax problems, and help you build a stable financial future.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl lg:text-4xl font-bold font-geist text-neutral-900 mb-6">Serving the Greater Los Angeles Area</h2>
                  <p className="text-neutral-600 mb-8 leading-relaxed">
                      We are proud to serve individuals and businesses across the San Fernando Valley and Los Angeles County. Our two office locations allow us to conveniently meet with clients throughout the region.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Canoga Park
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Beverly Hills
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Woodland Hills
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Calabasas
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> West Hills
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Northridge
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Santa Monica
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-default">
                          <MapPin className="w-5 h-5 text-blue-600" /> Encino
                      </div>
                  </div>
              </div>
              <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 transform hover:scale-[1.01]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.670533816694!2d-118.59544922354674!3d34.18029997310862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29e6c4b8b8b8b%3A0x1b1b1b1b1b1b1b1b!2s21201%20Victory%20Blvd%20%23145%2C%20Canoga%20Park%2C%20CA%2091303!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
           </div>
        </div>
      </section>

      {/* Reviews/Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-geist text-neutral-900 mb-4">Trusted by Our Clients</h2>
                <p className="text-neutral-500">
                    See what our clients have to say about our accounting and tax services.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Review 1 */}
                <div className="bg-stone-50 p-8 rounded-2xl border border-neutral-100 relative hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300">
                    <div className="flex text-yellow-400 mb-4">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-neutral-600 mb-6 italic">
                        "Meir and Meir helped me resolve a complicated tax issue that had been stressing me out for years. Their team was professional, reassuring, and effective. Highly recommend!"
                    </p>
                    <div className="font-bold text-neutral-900 font-geist">- Business Owner, Canoga Park</div>
                </div>

                 {/* Review 2 */}
                 <div className="bg-stone-50 p-8 rounded-2xl border border-neutral-100 relative hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300">
                    <div className="flex text-yellow-400 mb-4">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-neutral-600 mb-6 italic">
                        "I've been using them for my company's payroll and bookkeeping for over 5 years. They are efficient, accurate, and always available to answer my questions."
                    </p>
                    <div className="font-bold text-neutral-900 font-geist">- Satisfied Client, Woodland Hills</div>
                </div>

                 {/* Review 3 */}
                 <div className="bg-stone-50 p-8 rounded-2xl border border-neutral-100 relative hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300">
                    <div className="flex text-yellow-400 mb-4">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-neutral-600 mb-6 italic">
                        "Professional, knowledgeable, and discreet. They handled our estate planning with great care and attention to detail. I feel much more secure about my family's future."
                    </p>
                    <div className="font-bold text-neutral-900 font-geist">- Estate Planning Client</div>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-geist text-neutral-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-neutral-500">
                    Common questions about our services and process.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                <FAQItem 
                    question="I received a notice from the IRS. What should I do?"
                    answer="Don't panic, but don't ignore it. Contact us immediately. We can review the notice, explain what it means, and represent you before the IRS to resolve the issue."
                />
                 <FAQItem 
                    question="Do you work with QuickBooks?"
                    answer="Yes, we are QuickBooks experts. We offer setup, training, and 'tune-up' services to help you get the most out of the software for your business."
                />
                 <FAQItem 
                    question="What is a Peer Review?"
                    answer="A peer review is a periodic outside review of a CPA firm's accounting and auditing practice. Our partner, Maurice Meir, is a qualified Team Captain who conducts these reviews for other firms."
                />
                 <FAQItem 
                    question="Do you help with Estate Planning?"
                    answer="Yes. We work with you to create a comprehensive plan that manages risk, minimizes taxes, and ensures your wealth is preserved and distributed according to your wishes."
                />
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-5xl font-bold font-geist mb-6">Ready to Resolve Your Tax Problems?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg mb-10">
                Don't let tax issues turn your life upside down. We provide the expertise and discretion you need to move forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 hover:shadow-2xl">
                    Contact Us Today
                </Link>
                <a href="tel:+13104351759" className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-xl border border-blue-500 hover:scale-105 hover:shadow-2xl">
                    <Phone className="w-5 h-5" /> (310) 435-1759
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors focus:outline-none"
        >
          <span className="font-bold text-lg text-neutral-900 font-geist">{question}</span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="p-6 pt-0 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100">
            {answer}
          </div>
        </div>
      </div>
    );
  };

export default Home;
