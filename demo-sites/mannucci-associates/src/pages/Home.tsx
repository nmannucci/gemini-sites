import { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Scale,
  Building2,
  ChevronDown,
  Phone,
  Clock,
  MapPin,
  Check
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      title: "Business Law",
      description: "Strategic counsel for startups and established enterprises, from formation to exit.",
      icon: <Briefcase className="w-5 h-5" />,
      bullets: ["Entity Formation", "M&A Strategy", "Contract Law"]
    },
    {
      title: "Estate Planning",
      description: "Preserving your legacy through meticulous trust and estate administration.",
      icon: <ShieldCheck className="w-5 h-5" />,
      bullets: ["Living Trusts", "Asset Protection", "Probate"]
    },
    {
      title: "Commercial Litigation",
      description: "Aggressive and calculated representation in high-stakes business disputes.",
      icon: <Scale className="w-5 h-5" />,
      bullets: ["Contract Disputes", "Partnership Conflicts", "IP Litigation"]
    },
    {
      title: "Real Estate",
      description: "Navigating complex property transactions and land use regulations.",
      icon: <Building2 className="w-5 h-5" />,
      bullets: ["Commercial Leases", "Acquisitions", "Zoning"]
    }
  ];

  const stats = [
    { label: "Years of Excellence", value: "20+" },
    { label: "Families Protected", value: "500+" },
    { label: "Assets Secured", value: "$50M+" },
  ];

  const faqs = [
    {
      q: "What regions do you serve?",
      a: "While our firm is rooted in Pasadena, we represent clients across Los Angeles County, including San Marino, Arcadia, and Glendale. We also handle federal matters for business clients nationwide."
    },
    {
      q: "Do you offer consultations?",
      a: "Yes. We believe in a preliminary strategy session to ensure our expertise aligns with your needs. This initial consultation is complimentary for qualified business and estate matters."
    },
    {
      q: "How are your fees structured?",
      a: "We prioritize transparency. For estate planning and formation, we typically operate on a flat-fee basis. For litigation and complex counsel, we provide clear hourly rates with detailed billing."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-law-cream min-h-screen">
      
      {/* 
        HERO SECTION 
        Ported from the concept preview
      */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6 md:px-12 lg:px-24">
        {/* Background Grain */}
        <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none mix-blend-multiply"></div>

        <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Typography & Content */}
            <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
                
                <div className="h-px bg-law-gold mb-8 animate-line-grow origin-left w-24 md:w-32"></div>

                <div className="overflow-hidden mb-4">
                    <p className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-law-gold animate-reveal delay-100">
                        Est. 2003 &mdash; Pasadena, California
                    </p>
                </div>

                <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] text-law-navy mb-8 -ml-1">
                    <span className="block overflow-hidden">
                        <span className="block animate-reveal delay-200">Guardians of</span>
                    </span>
                    <span className="block overflow-hidden relative">
                        <span class="block animate-reveal delay-300 italic text-law-gold pr-4">Legacy</span>
                    </span>
                    <span className="block overflow-hidden">
                        <span class="block animate-reveal delay-500">&amp; Enterprise.</span>
                    </span>
                </h1>

                <div className="lg:max-w-md ml-2 md:ml-4">
                    <p className="text-law-charcoal/80 text-lg md:text-xl font-light leading-relaxed animate-reveal delay-700 text-balance">
                        Sophisticated legal counsel for the defining moments of your life and business. We navigate complexity so you can build with confidence.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-6 animate-reveal delay-800">
                        <a href="#contact" className="group relative px-8 py-4 bg-law-navy text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <span className="relative z-10 flex items-center gap-4 font-medium tracking-widest text-xs uppercase">
                                Schedule Consultation
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-law-charcoal transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </a>
                        
                        <a href="#services" className="group flex items-center gap-3 px-6 py-4 border border-law-navy/20 hover:border-law-navy transition-all duration-300 text-law-navy">
                            <span className="font-medium tracking-widest text-xs uppercase">Our Expertise</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Imagery */}
            <div className="lg:col-span-5 relative h-[50vh] lg:h-[80vh] w-full hidden md:block">
                <div className="absolute -top-10 -right-10 w-2/3 h-2/3 bg-law-gold/10 rounded-full blur-3xl animate-reveal delay-500"></div>

                <div className="relative h-full w-full overflow-hidden">
                    <div className="absolute inset-0 bg-law-navy transition-transform duration-[1.5s] ease-out animate-image-reveal">
                         <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                              alt="Modern glass office building facade reflecting the sky" 
                              className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700 scale-105 hover:scale-100" />
                    </div>
                </div>
                
                <div className="absolute bottom-8 lg:-left-12 bg-white/90 backdrop-blur p-6 shadow-2xl max-w-[240px] border-l-4 border-law-gold animate-reveal delay-1000 z-20">
                    <p className="font-serif text-2xl text-law-navy italic mb-2">"Excellence in every detail."</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-law-charcoal/20"></div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-law-charcoal/60">Client Review</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full px-6 md:px-24 flex justify-between items-end text-law-charcoal/40 text-[10px] font-bold tracking-[0.2em] uppercase animate-reveal delay-1000">
            <div className="hidden md:block">Based in Pasadena</div>
            <div className="flex gap-8">
                <span>SCROLL</span>
                <div className="w-px h-8 bg-law-charcoal/20 mx-auto"></div>
            </div>
            <div className="hidden md:block">Serving Southern California</div>
        </div>
      </section>

      {/* 
        SERVICES SECTION 
      */}
      <section id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-white relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-law-cream/30 -z-0"></div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
               <span className="block text-law-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Practice</span>
               <h2 className="font-serif text-5xl text-law-navy mb-8 leading-tight">Focusing on what matters most.</h2>
               <p className="text-law-charcoal/70 font-light leading-relaxed mb-12">
                 We intentionally limit our practice areas to maintain the highest standard of excellence. Whether you are scaling a business or securing your family's future, we provide clarity.
               </p>
               <a href="#" className="inline-flex items-center gap-2 text-law-navy font-bold tracking-widest text-xs uppercase hover:text-law-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-gold focus-visible:ring-offset-2 rounded-sm">
                 View All Services <ArrowRight className="w-4 h-4" />
               </a>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
               {services.map((service, idx) => (
                 <button key={idx} className="group p-8 bg-law-cream hover:bg-law-navy transition-colors duration-500 cursor-pointer border border-transparent hover:border-law-gold/20 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-gold focus-visible:ring-inset">
                    <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 text-law-navy group-hover:bg-law-gold group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-serif text-2xl text-law-navy group-hover:text-white mb-4 transition-colors">{service.title}</h3>
                    <p className="text-law-charcoal/80 group-hover:text-white text-sm font-light leading-relaxed mb-6 transition-colors">
                      {service.description}
                    </p>
                    <ul className="space-y-2 border-t border-law-charcoal/10 group-hover:border-white/10 pt-4">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-law-charcoal/70 group-hover:text-law-gold transition-colors">
                          <Check className="w-3 h-3" /> {bullet}
                        </li>
                      ))}
                    </ul>
                 </button>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ABOUT / FIRM SECTION 
      */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-law-navy text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="relative">
               <div className="aspect-[4/5] md:aspect-square bg-law-charcoal relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" 
                       alt="Legal professionals discussing documents in a modern office setting" 
                       className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                  <div className="absolute inset-0 border-[1px] border-law-gold/30 m-4"></div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-law-gold flex flex-col items-center justify-center text-law-navy p-6 hidden md:flex">
                  <span className="font-serif text-6xl block">20+</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-center mt-1">Years of<br/>Experience</span>
               </div>
            </div>

            <div>
               <span className="block text-law-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">The Firm</span>
               <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.1]">Rooted in Pasadena.<br/>Committed to Excellence.</h2>
               <div className="space-y-6 text-white/70 font-light text-lg leading-relaxed">
                  <p>
                    Founded in 2003, Mannucci Associates was built on a simple premise: complex legal matters require clear, strategic thinking—not just legal jargon.
                  </p>
                  <p>
                    We represent the new guard of leadership in Southern California. From tech startups in Silicon Beach to established multi-generational estates in San Marino, our clients value discretion, precision, and foresight.
                  </p>
               </div>
               
               <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="font-serif text-3xl md:text-4xl text-white mb-2 whitespace-nowrap">{stat.value}</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 
        TESTIMONIALS (Redesigned)
      */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-law-cream">
        <div className="max-w-[1200px] mx-auto text-center">
           <span className="block text-law-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">Testimonials</span>
           <h2 className="font-serif text-4xl md:text-5xl text-law-navy mb-16">Trusted by the community.</h2>
           
           <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  text: "Mannucci Associates handled our business incorporation with incredible attention to detail. Their advice on liability protection was invaluable.",
                  author: "Robert Chen",
                  role: "CEO, Chen Tech"
                },
                {
                  text: "Professional, knowledgeable, and responsive. They made the estate planning process simple and stress-free for my family.",
                  author: "Sarah Jenkins",
                  role: "Estate Client"
                },
                {
                  text: "The best legal team in Pasadena. I've worked with them for over 5 years on various commercial contracts and they never miss a beat.",
                  author: "Michael Ross",
                  role: "Real Estate Developer"
                }
              ].map((review, i) => (
                <div key={i} className="bg-white p-10 border border-law-charcoal/5 shadow-sm hover:shadow-lg transition-shadow">
                   <div className="text-law-gold text-4xl font-serif mb-4">"</div>
                   <p className="text-law-charcoal/80 font-light leading-relaxed mb-8 min-h-[100px]">{review.text}</p>
                   <div>
                      <div className="font-serif text-lg text-law-navy">{review.author}</div>
                      <div className="text-[10px] tracking-widest uppercase text-law-charcoal/40">{review.role}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 
        FAQ SECTION
      */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
         <div className="max-w-[800px] mx-auto">
            <h2 className="font-serif text-4xl text-law-navy mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-law-charcoal/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full flex items-center justify-between py-6 text-left hover:text-law-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-gold focus-visible:ring-inset px-2 -mx-2 rounded-sm"
                  >
                    <span className="font-serif text-xl text-law-navy">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-law-charcoal/30 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-law-charcoal/70 font-light leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* 
        CONTACT / CTA
      */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-law-navy relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-grain opacity-20"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">Secure your future today.</h2>
            <p className="text-white/60 text-lg font-light mb-12 max-w-2xl mx-auto">
              Don't leave your business or family legacy to chance. Schedule a consultation with our experienced legal team.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <a href="tel:+16265550123" className="inline-flex items-center justify-center gap-3 bg-law-gold text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-law-navy transition-colors duration-300">
                  <Phone className="w-4 h-4" /> (626) 555-0123
               </a>
               <a href="#" className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-law-navy transition-colors duration-300">
                  <Clock className="w-4 h-4" /> Book Online
               </a>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-center text-white/40 text-xs tracking-wider uppercase">
               <span className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /> 123 Colorado Blvd, Pasadena, CA</span>
               <span className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> Mon-Fri 9am - 5pm</span>
            </div>
         </div>
      </section>

    </div>
  );
}