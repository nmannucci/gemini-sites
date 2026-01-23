import { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Scale,
  Building2,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
  ChevronDown
} from 'lucide-react';
import PlaceholderForm from '../components/PlaceholderForm';
import ReviewsWidget from '../components/ReviewsWidget';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Business Law",
      description: "Comprehensive legal support for startups and established enterprises.",
      bullets: ["Entity Formation (LLC, Corp)", "Contract Review & Drafting", "Mergers & Acquisitions", "Partnership Agreements"]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Estate Planning",
      description: "Protect your legacy and ensure your family's future is secure.",
      bullets: ["Revocable Living Trusts", "Wills & Powers of Attorney", "Asset Protection Strategies", "Probate Administration"]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Commercial Litigation",
      description: "Aggressive representation to resolve complex business disputes.",
      bullets: ["Breach of Contract", "Shareholder Disputes", "Intellectual Property", "Employment Litigation"]
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Real Estate Law",
      description: "Guidance for commercial and residential property transactions.",
      bullets: ["Commercial Leases", "Purchase & Sale Agreements", "Title Review", "Land Use & Zoning"]
    }
  ];

  const steps = [
    {
      num: 1,
      icon: <Phone className="w-6 h-6" />,
      title: "Free Consultation",
      description: "Schedule a complimentary call to discuss your legal needs and goals."
    },
    {
      num: 2,
      icon: <FileText className="w-6 h-6" />,
      title: "Custom Strategy",
      description: "We develop a tailored legal roadmap addressing your specific situation."
    },
    {
      num: 3,
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Execute & Protect",
      description: "We implement your plan efficiently, keeping you informed every step."
    }
  ];

  const credentials = [
    { label: "Years Experience", value: "20+" },
    { label: "Clients Served", value: "500+" },
    { label: "Assets Protected", value: "$50M+" },
    { label: "5-Star Reviews", value: "150+" }
  ];

  const faqs = [
    {
      question: "What areas do you serve?",
      answer: "We are based in Pasadena and proudly serve clients throughout Los Angeles County, including San Marino, Arcadia, Glendale, Burbank, La Cañada Flintridge, and downtown Los Angeles."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we offer a complimentary 30-minute initial consultation for new clients to discuss their legal needs and determine if we are the right fit for your goals."
    },
    {
      question: "How do you structure your fees?",
      answer: "We believe in transparency. Depending on the matter, we offer flat-fee packages for estate planning and formation, and competitive hourly rates for litigation and ongoing counsel."
    },
    {
      question: "Why do I need a Living Trust?",
      answer: "A Living Trust allows you to avoid probate, maintain privacy, and ensure your assets are distributed exactly as you wish without court intervention. It's especially valuable in California given our state's probate costs."
    },
    {
      question: "Can you help with forming a new business?",
      answer: "Absolutely. We guide you through selecting the right entity type (LLC, S-Corp, C-Corp) to minimize liability and optimize for tax efficiency based on your specific situation."
    },
    {
      question: "How long does the estate planning process take?",
      answer: "Most straightforward estate plans can be completed within 2-3 weeks from our initial strategy session to the final signing ceremony. Complex situations may require additional time."
    },
    {
      question: "Do you handle litigation?",
      answer: "Yes, Mannucci Associates has a strong track record in commercial and civil litigation. We aim to resolve disputes efficiently but are fully prepared to go to trial if necessary."
    },
    {
      question: "Are virtual appointments available?",
      answer: "Yes, we offer secure video conferencing for all consultations and strategy sessions for your convenience. Many clients appreciate the flexibility of virtual meetings."
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4 animation-delay-2000 animate-blob"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-brand-blue-100">
                <span className="w-2 h-2 rounded-full bg-brand-blue-600 animate-pulse"></span>
                Serving Pasadena Since 2003
              </div>

              <h1 className="text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[0.95] tracking-tighter mb-6 font-geist">
                Protecting Your Business & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-indigo-600">Family Legacy</span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg font-inter">
                Mannucci Associates provides sophisticated legal counsel for business owners and families. We navigate complexity so you can build with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-neutral-200/80 bg-white/60 backdrop-blur-sm text-neutral-600 hover:bg-white hover:border-neutral-300 transition-all shadow-sm"
                >
                  View Practice Areas
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-neutral-400">
                <div className="font-geist font-semibold text-sm">Best Lawyers</div>
                <div className="w-px h-6 bg-neutral-200"></div>
                <div className="font-geist font-semibold text-sm">Super Lawyers</div>
                <div className="w-px h-6 bg-neutral-200"></div>
                <div className="font-geist font-semibold text-sm">Avvo 10.0</div>
              </div>
            </div>

            {/* Right - Glass Panel Form */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue-100 to-indigo-100 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/5 p-8 rounded-2xl">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 font-geist">Get Started Today</h3>
                  <p className="text-neutral-500 text-sm mb-6 font-inter">Request your complimentary strategy session.</p>
                  <PlaceholderForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. SERVICES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">Practice Areas</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4 font-geist tracking-tight">Comprehensive Legal Solutions</h2>
            <p className="text-neutral-500 text-lg font-inter">We maintain a focused practice to ensure the highest level of expertise for every client.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl p-6 border border-neutral-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-xl text-neutral-900 mb-3 font-geist">{service.title}</h3>
                <p className="text-sm text-neutral-500 mb-6 leading-relaxed font-inter">{service.description}</p>
                <ul className="space-y-2">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 font-inter">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. ABOUT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-neutral-200 flex items-center justify-center text-neutral-400 font-inter">
                  [Team Photo / Office Interior]
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-white p-6 rounded-xl shadow-xl">
                <p className="font-geist font-semibold text-2xl">20+ Years</p>
                <p className="text-neutral-400 text-sm font-inter">Trusted Experience</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-brand-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">About Our Firm</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900 mb-6 font-geist tracking-tight">
                Rooted in Pasadena. Committed to Excellence.
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed font-inter">
                <p>
                  Founded in 2003, Mannucci Associates was built on a simple premise: complex legal matters require clear, strategic thinking—not just legal jargon.
                </p>
                <p>
                  We have helped over 500 Pasadena families secure their legacies through thoughtful estate planning, and guided hundreds of local businesses from formation to exit. Our team combines big-firm expertise with the personal attention of a boutique practice.
                </p>
                <p>
                  When you work with us, you don't just get an attorney—you get a partner who is invested in your long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. AREAS SERVED (SEO Critical)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Content */}
            <div>
              <p className="text-brand-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">Service Area</p>
              <h2 className="text-3xl font-semibold text-neutral-900 mb-6 font-geist tracking-tight">Proudly Serving Our Community</h2>
              <p className="text-neutral-600 mb-8 font-inter leading-relaxed">
                While our office is located in the heart of Pasadena, we represent clients throughout Southern California. We understand the local legal landscape and business environment.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Pasadena', 'San Marino', 'Arcadia', 'South Pasadena', 'Glendale', 'La Cañada Flintridge', 'Altadena', 'Sierra Madre'].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-neutral-600 font-inter">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {city}
                  </div>
                ))}
              </div>

              {/* Office Card */}
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 font-geist">Office Location</h4>
                    <p className="text-neutral-600 text-sm mt-1 font-inter">123 Colorado Blvd, Suite 400<br />Pasadena, CA 91105</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <a href="tel:+16265550123" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" /> (626) 555-0123
                      </a>
                      <a href="mailto:info@mannucci.law" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                        <Mail className="w-4 h-4" /> Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] bg-neutral-200 rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105717.85694248882!2d-118.19696347854655!3d34.147784384666014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c2dc38330b51%3A0x52b41120e1e68a70!2sPasadena%2C%20CA!5e0!3m2!1sen!2sus!4v1706037000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. REVIEWS / TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="reviews" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">Testimonials</p>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-4 font-geist tracking-tight">Trusted by Clients</h2>
            <p className="text-neutral-500 font-inter">We take pride in building lasting relationships.</p>
          </div>
          <ReviewsWidget />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. CREDENTIALS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {credentials.map((cred, idx) => (
              <div key={idx}>
                <div className="text-4xl font-semibold text-brand-blue-600 font-geist">{cred.value}</div>
                <div className="text-sm text-neutral-500 mt-1 font-inter">{cred.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-16 text-neutral-400">
            <div className="text-lg font-semibold font-geist">California Bar Association</div>
            <div className="text-lg font-semibold font-geist">Pasadena Chamber</div>
            <div className="text-lg font-semibold font-geist">Martindale-Hubbell AV</div>
            <div className="text-lg font-semibold font-geist">WealthCounsel</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. THREE EASY STEPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0B1120] text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">How It Works</p>
            <h2 className="text-3xl font-semibold text-white mb-4 font-geist tracking-tight">3 Easy Steps to Get Started</h2>
            <p className="text-slate-400 font-inter">A clear path to resolving your legal needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-slate-700"></div>

            {steps.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-blue-500/30">
                  {step.icon}
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-slate-800 text-blue-400 text-xs font-semibold px-2 py-1 rounded font-geist">
                  Step {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-geist">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed font-inter">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. FAQ SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 font-geist">FAQ</p>
            <h2 className="text-3xl font-semibold text-neutral-900 mb-4 font-geist tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 font-geist pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="p-6 pt-0 bg-white text-neutral-600 leading-relaxed border-t border-neutral-100 font-inter">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold mb-6 font-geist tracking-tight">Ready to Secure Your Future?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-inter">
            Don't leave your business or family legacy to chance. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="tel:+16265550123"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-xl hover:bg-blue-50 transition-all hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              Call (626) 555-0123
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-all"
            >
              <Clock className="w-5 h-5" />
              Schedule Online
            </a>
          </div>
          <p className="mt-8 text-blue-200 text-sm font-inter">Monday – Friday, 9:00 AM – 5:00 PM</p>
        </div>
      </section>
    </div>
  );
}
