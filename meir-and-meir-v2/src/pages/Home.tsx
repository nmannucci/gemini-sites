import { ArrowRight, ChevronDown, Calculator, Briefcase, FileSearch, Scale, Award, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceholderForm from '../components/PlaceholderForm';

const ServiceCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
  <div className="group p-8 border border-brand-navy/5 hover:border-brand-gold/30 hover:bg-white transition-all duration-500 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-0 bg-brand-gold group-hover:h-full transition-all duration-500"></div>
    <Icon className="w-8 h-8 text-brand-navy/40 group-hover:text-brand-gold transition-colors mb-6" strokeWidth={1} />
    <h3 className="font-serif font-medium text-2xl text-brand-navy mb-4 group-hover:translate-x-2 transition-transform duration-500">{title}</h3>
    <p className="font-sans text-brand-navy text-sm leading-relaxed font-normal">{description}</p>
    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-brand-gold text-xs tracking-widest uppercase">
      Learn More <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-navy/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="font-serif font-medium text-xl text-brand-navy group-hover:text-brand-gold transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-navy/40 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="font-sans text-brand-navy font-normal leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-in-up">
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-8 ml-1">Est. 1985 • Canoga Park & Beverly Hills</p>
            <h1 className="font-serif font-medium text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8">
              Precision. Discretion. <br />
              <span className="italic text-brand-gold">Peace of Mind.</span>
            </h1>
            <p className="text-white/60 font-sans font-normal text-lg md:text-xl max-w-2xl leading-relaxed mb-12 border-l border-brand-gold/30 pl-6">
              Expert accounting, tax strategies, and forensic analysis for established businesses, non-profits, and families protecting their legacy.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link to="/contact" className="px-10 py-4 bg-brand-gold text-brand-navy text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 text-center">
                Book Consultation
              </Link>
              <Link to="/services" className="px-10 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors duration-300 text-center">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block fade-in-up delay-200">
            <div className="relative">
              <div className="aspect-[4/5] border border-white/10 p-4">
                <div className="w-full h-full bg-brand-navy/50 relative overflow-hidden flex items-center justify-center grayscale opacity-80 group hover:grayscale-0 transition-all duration-700">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                   <div className="relative z-10 border border-brand-gold/20 p-8 text-center backdrop-blur-sm">
                      <div className="font-serif font-medium text-3xl text-brand-gold mb-2">Established</div>
                      <div className="font-sans text-white/40 text-[0.6rem] tracking-[0.4em] uppercase">Trusted Advisors Since 1985</div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-brand-gold/30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-brand-gold/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-navy mb-6">Our Expertise</h2>
              <p className="font-sans text-brand-navy font-normal">Comprehensive financial solutions tailored to your specific needs, from complex audits to strategic tax planning.</p>
            </div>
            <Link to="/services" className="text-brand-navy text-xs tracking-widest uppercase border-b border-brand-navy/20 pb-1 hover:border-brand-gold hover:text-brand-gold transition-colors">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brand-navy/5">
             <ServiceCard 
              title="Audit & Assurance" 
              icon={FileSearch}
              description="Specialized audits for Employee Benefit Plans and Non-Profits, ensuring compliance and transparency." 
            />
            <Link to="/services/tax-problems" className="group p-8 border border-brand-navy/5 hover:border-brand-gold/30 hover:bg-white transition-all duration-500 relative overflow-hidden block">
               <div className="absolute top-0 left-0 w-1 h-0 bg-brand-gold group-hover:h-full transition-all duration-500"></div>
               <Calculator className="w-8 h-8 text-brand-navy/40 group-hover:text-brand-gold transition-colors mb-6" strokeWidth={1} />
               <h3 className="font-serif font-medium text-2xl text-brand-navy mb-4 group-hover:translate-x-2 transition-transform duration-500">Tax Planning & Problems</h3>
               <p className="font-sans text-brand-navy text-sm leading-relaxed font-normal">Strategic planning to minimize liability and expert resolution for IRS audits, liens, and levies.</p>
               <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-brand-gold text-xs tracking-widest uppercase">
                 Learn More <ArrowRight className="w-3 h-3" />
               </div>
            </Link>
            <ServiceCard 
              title="Business Advisory" 
              icon={Briefcase}
              description="CFO services, succession planning, and new business formation to guide your growth." 
            />
            <ServiceCard 
              title="Forensic Accounting" 
              icon={FileSearch}
              description="Investigating financial discrepancies and fraud with the utmost discretion and detail." 
            />
             <ServiceCard 
              title="Estate Planning" 
              icon={Scale}
              description="Protecting your wealth and legacy through comprehensive estate and trust planning." 
            />
            <ServiceCard 
              title="Peer Reviews" 
              icon={Award}
              description="System and engagement peer reviews for other CPA firms, led by a Team Review Captain." 
            />
          </div>
        </div>
      </section>

      {/* About / Credentials */}

      <section className="py-32 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-brand-navy/5 relative overflow-hidden">
                {/* Placeholder for Partner Image - Using a stylized pattern/color block since no image provided */}
                <div className="absolute inset-0 bg-brand-navy flex items-center justify-center p-12">
                     <div className="border border-white/20 w-full h-full flex flex-col items-center justify-center text-center p-8">
                        <span className="font-serif font-medium text-4xl text-brand-gold italic mb-4">M & M</span>
                        <span className="font-sans text-white/40 text-xs tracking-widest uppercase">Decades of Excellence</span>
                     </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-gold p-8 flex flex-col justify-center">
                 <span className="font-serif font-medium text-5xl text-brand-navy">35+</span>
                 <span className="font-sans text-brand-navy/60 text-xs tracking-widest uppercase mt-2">Years of<br/>Experience</span>
              </div>
            </div>

            <div>
              <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6">About The Firm</p>
              <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-navy mb-8 leading-tight">
                A Legacy of Trust & <br /> Professional Excellence.
              </h2>
              <p className="font-sans text-brand-navy/80 font-normal leading-relaxed mb-8">
                Since 1985, Meir and Meir, LLP has provided efficiency, affordability, and discretion to clients across California.
                With roots dating back to the late 1970s, our partners bring advanced degrees and decades of senior auditing experience
                to every engagement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-brand-gold mt-1" />
                  <div>
                    <h4 className="font-serif font-medium text-lg text-brand-navy">Certified Expertise</h4>
                    <p className="text-sm text-brand-navy font-normal mt-1">CPAs with Masters in Economics and MBA degrees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-brand-gold mt-1" />
                  <div>
                    <h4 className="font-serif font-medium text-lg text-brand-navy">Peer Review Captain</h4>
                    <p className="text-sm text-brand-navy font-normal mt-1">Qualified to review and audit other CPA firms.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center gap-2 text-brand-navy text-xs tracking-widest uppercase border-b border-brand-navy/20 pb-1 hover:border-brand-gold hover:text-brand-gold transition-colors">
                Meet The Partners <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-32 bg-brand-navy text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-serif font-medium text-4xl md:text-5xl mb-6">Your Path to Financial Clarity</h2>
            <p className="text-white/40 font-sans font-normal max-w-2xl mx-auto">We simplify the complex, allowing you to focus on what matters most—running your business and living your life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10"></div>

            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-brand-navy border border-white/20 rounded-full flex items-center justify-center mb-8 group-hover:border-brand-gold transition-colors duration-500">
                <span className="font-serif font-medium text-3xl text-brand-gold">01</span>
              </div>
              <h3 className="font-serif font-medium text-2xl mb-4">Free Consultation</h3>
              <p className="text-white/50 font-sans font-normal text-sm leading-relaxed px-8">
                We begin by understanding your unique situation, goals, and challenges in a confidential initial meeting.
              </p>
            </div>

            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-brand-navy border border-white/20 rounded-full flex items-center justify-center mb-8 group-hover:border-brand-gold transition-colors duration-500">
                <span className="font-serif font-medium text-3xl text-brand-gold">02</span>
              </div>
              <h3 className="font-serif font-medium text-2xl mb-4">Custom Roadmap</h3>
              <p className="text-white/50 font-sans font-normal text-sm leading-relaxed px-8">
                Our team develops a tailored strategy—whether for tax planning, audits, or business growth.
              </p>
            </div>

            <div className="relative z-10 text-center group">
              <div className="w-24 h-24 mx-auto bg-brand-navy border border-white/20 rounded-full flex items-center justify-center mb-8 group-hover:border-brand-gold transition-colors duration-500">
                <span className="font-serif font-medium text-3xl text-brand-gold">03</span>
              </div>
              <h3 className="font-serif font-medium text-2xl mb-4">Execute & Monitor</h3>
              <p className="text-white/50 font-sans font-normal text-sm leading-relaxed px-8">
                We implement the plan with precision, providing ongoing support and adjustments as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served (SEO) */}
      <section className="py-32 bg-brand-cream border-y border-brand-navy/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6">Our Reach</p>
              <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-navy mb-8 leading-tight">Serving Southern California's <br/>Business Community</h2>
              <p className="font-sans text-brand-navy font-normal leading-relaxed mb-12 max-w-lg">
                While we maintain primary offices in Canoga Park and Beverly Hills, our team provides expert accounting and tax services to clients throughout the greater Los Angeles area.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                   <p className="font-serif font-medium text-xl text-brand-navy mb-4">Primary Offices</p>
                    <ul className="space-y-4 font-sans text-brand-navy font-normal">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span> Canoga Park, CA (HQ)</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span> Beverly Hills, CA</li>
                    </ul>
                </div>
                <div>
                  <p className="font-serif font-medium text-xl text-brand-navy mb-4">Regional Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {['Los Angeles', 'San Fernando Valley', 'Santa Monica', 'Calabasas', 'Woodland Hills', 'Encino', 'Sherman Oaks'].map(city => (
                      <span key={city} className="px-3 py-1 border border-brand-navy/15 text-brand-navy text-xs rounded-full">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 shadow-xl">
              <div className="bg-brand-navy/5 h-[400px] flex items-center justify-center relative overflow-hidden group">
                <MapPin className="w-16 h-16 text-brand-navy/10 group-hover:text-brand-gold/40 transition-colors duration-700" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
                <span className="absolute bottom-6 left-6 text-[0.6rem] font-sans uppercase tracking-[0.3em] text-brand-navy/40">Interactive Map Integration Pending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6">Common Questions</p>
              <h2 className="font-serif font-medium text-4xl md:text-5xl text-brand-navy">Frequently Asked Questions</h2>
            </div>
            
            <div className="border-t border-brand-navy/10">
              <FaqItem 
                question="Do you handle IRS audits and back taxes?"
                answer="Yes. We specialize in tax problem resolution, including IRS audit representation, non-filed returns, liens, levies, and offers in compromise. We act as your representative to ensure your rights are protected and help put an end to the misery of tax problems."
              />
              <FaqItem 
                question="What industries do you serve?"
                answer="We serve a diverse range of clients, with particular expertise in non-profit organizations, employee benefit plans, real estate investment, and small to medium-sized service businesses."
              />
              <FaqItem 
                question="Are your services discreet for high-profile clients?"
                answer="Discretion is one of our core values. We provide extremely discreet services for high-net-worth individuals, families, and businesses who require the utmost privacy in their financial matters."
              />
              <FaqItem 
                question="Do you assist with QuickBooks setup and training?"
                answer="Absolutely. We offer comprehensive QuickBooks services, including initial installation, staff training, periodic tune-ups, and ongoing support to ensure your financial data is accurate and useful."
              />
              <FaqItem 
                question="How do I get started with Meir and Meir?"
                answer="The first step is a confidential consultation. You can call our Canoga Park or Beverly Hills office, or fill out the contact form on our website to schedule a meeting with one of our partners."
              />
               <FaqItem 
                question="What is a Peer Review for CPA firms?"
                answer="A peer review is a periodic external audit of a CPA firm's quality control system. Our partner, Maurice Meir, is a Team Review Captain qualified to perform these essential reviews for other accounting firms."
              />
               <FaqItem 
                question="Can you help with business succession planning?"
                answer="Yes. We help business owners plan for the future transition of their business, ensuring a smooth handoff while protecting the value you've built over decades."
              />
               <FaqItem 
                question="Do you provide CFO services for small businesses?"
                answer="We offer part-time CFO services, providing the strategic financial oversight of a senior executive without the cost of a full-time hire."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-cream border-t border-brand-navy/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-brand-navy p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
               <div>
                 <h2 className="font-serif font-medium text-4xl md:text-5xl text-white mb-6">Ready to secure your financial future?</h2>
                 <p className="font-sans text-white/60 font-normal text-lg mb-8 max-w-md">
                   Schedule a confidential consultation with our partners today. We are here to help you put an end to the uncertainty.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 text-white/80 font-sans font-normal text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold"><Phone className="w-4 h-4"/></div>
                        <div>
                            <span className="block text-xs uppercase opacity-50 tracking-wider">Canoga Park</span>
                            (310) 435-1759
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold"><Phone className="w-4 h-4"/></div>
                        <div>
                            <span className="block text-xs uppercase opacity-50 tracking-wider">Beverly Hills</span>
                            (310) 274-7541
                        </div>
                    </div>
                 </div>
               </div>
               
               <div className="bg-white p-8 md:p-10 shadow-2xl">
                 <h3 className="font-serif font-medium text-2xl text-brand-navy mb-6">Send us a message</h3>
                 <PlaceholderForm />
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
