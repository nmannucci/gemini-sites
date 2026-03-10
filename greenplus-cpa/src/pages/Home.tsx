import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Calculator,
  FileText,
  TrendingUp,
  Shield,
  Award,
  Users,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';
import PlaceholderForm from '../components/PlaceholderForm';
import ReviewsWidget from '../components/ReviewsWidget';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Leaf,
      title: 'Cannabis Tax Services',
      description: 'Specialized 280E tax strategy and compliance for cannabis businesses.',
      bullets: ['280E Optimization', 'Cost of Goods Sold Analysis', 'State Cannabis Tax Compliance'],
      href: '/services/cannabis-tax',
    },
    {
      icon: Calculator,
      title: 'Tax Services',
      description: 'Comprehensive business and individual tax preparation and planning.',
      bullets: ['Business Tax Returns', 'Individual Tax Planning', 'Quarterly Estimated Taxes'],
      href: '/contact',
    },
    {
      icon: FileText,
      title: 'Accounting & Bookkeeping',
      description: 'Accurate financial records and statements to drive business decisions.',
      bullets: ['Monthly Bookkeeping', 'Financial Statements', 'Cash Flow Management'],
      href: '/contact',
    },
    {
      icon: Shield,
      title: 'IRS Representation',
      description: 'Expert representation during audits and IRS correspondence.',
      bullets: ['Audit Defense', 'Tax Resolution', 'Penalty Abatement'],
      href: '/contact',
    },
  ];

  const credentials = [
    { icon: Award, label: 'Licensed CPA', value: 'California' },
    { icon: Clock, label: 'Experience', value: '18+ Years' },
    { icon: Users, label: 'Member', value: 'AICPA & CalCPA' },
    { icon: TrendingUp, label: 'Specialization', value: 'Cannabis Industry' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'Schedule a call to discuss your business needs and tax situation.',
    },
    {
      number: '02',
      title: 'Custom Strategy',
      description: 'We develop a tailored tax and accounting plan for your cannabis business.',
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Execute the strategy and maintain ongoing compliance and optimization.',
    },
  ];

  const faqs = [
    {
      question: 'What is Section 280E and how does it affect cannabis businesses?',
      answer: 'Section 280E is a federal tax code provision that prohibits cannabis businesses from deducting ordinary business expenses. However, Cost of Goods Sold (COGS) can still be deducted. We help structure your operations to maximize legitimate COGS deductions while maintaining full compliance.',
    },
    {
      question: 'Do you work with all types of cannabis businesses?',
      answer: 'Yes, we work with dispensaries, cultivators, manufacturers, distributors, delivery services, and ancillary cannabis businesses throughout California. Each business type has unique tax considerations that we address.',
    },
    {
      question: 'How can you help reduce my cannabis business taxes?',
      answer: 'We use legal strategies including proper COGS allocation, entity structuring, cost segregation studies, and operational restructuring to minimize your tax burden while staying fully compliant with federal and state regulations.',
    },
    {
      question: 'What accounting software do you work with?',
      answer: 'We work with QuickBooks Online, Xero, and cannabis-specific platforms like Flowhub and METRC. We can help you select and implement the best system for your business needs.',
    },
    {
      question: 'Can you help if I am being audited by the IRS?',
      answer: 'Absolutely. We have extensive experience representing cannabis businesses during IRS audits. We handle all communication, documentation, and negotiation to achieve the best possible outcome for your case.',
    },
    {
      question: 'How often should I meet with my CPA?',
      answer: 'For cannabis businesses, we recommend monthly check-ins to ensure compliance and optimize tax strategy throughout the year. This proactive approach helps avoid surprises at tax time.',
    },
    {
      question: 'Do you offer bookkeeping services?',
      answer: 'Yes, we provide comprehensive bookkeeping services including transaction categorization, bank reconciliation, accounts payable/receivable, and monthly financial statement preparation.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'While based in Pasadena, we serve cannabis businesses throughout California and can work with clients anywhere in the state through virtual meetings and secure document sharing.',
    },
  ];

  const areasServed = [
    'Pasadena', 'Los Angeles', 'Glendale', 'Burbank', 'Arcadia', 'Monrovia',
    'Alhambra', 'South Pasadena', 'San Marino', 'La Canada', 'Hollywood',
    'Downtown LA', 'San Fernando Valley', 'Orange County', 'San Diego',
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#0B1120]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Cannabis Tax Specialists
              </span>

              <h1 className="font-geist font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[0.95] mb-6">
                Stop Overpaying Taxes on Your Cannabis Business
              </h1>

              <p className="text-xl text-emerald-100/80 leading-relaxed mb-8 max-w-xl">
                Expert CPA services designed specifically for the cannabis industry.
                Navigate 280E, maximize deductions, and protect your business with 18+ years of tax expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 font-medium rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+18186442550"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  (818) 644-2550
                </a>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="font-geist font-semibold text-3xl text-white">$500K+</p>
                  <p className="text-emerald-200/70 text-sm">Saved for Clients</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <p className="font-geist font-semibold text-3xl text-white">100+</p>
                  <p className="text-emerald-200/70 text-sm">Cannabis Clients</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <p className="font-geist font-semibold text-3xl text-white">18+</p>
                  <p className="text-emerald-200/70 text-sm">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Hero Form */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="font-geist font-semibold text-xl text-white mb-2">
                Request Your Free Consultation
              </h3>
              <p className="text-emerald-100/70 text-sm mb-6">
                Get expert advice on reducing your cannabis business taxes.
              </p>
              <PlaceholderForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
              Comprehensive Cannabis Accounting Solutions
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              From tax strategy to daily bookkeeping, we provide end-to-end financial services
              tailored specifically for cannabis businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group bg-stone-50 rounded-xl p-6 border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-geist font-semibold text-neutral-900 mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-500 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-1 text-emerald-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-6">
                Your Trusted Cannabis Industry CPA Partner
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Founded in 2022 by <strong>Sevana Janian, CPA</strong>, Green Plus CPA was built on a mission
                to provide cannabis business owners with the expert financial guidance they deserve.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                With over 18 years of experience across public accounting firms, manufacturing, import/export,
                and dealerships, Sevana brings a wealth of knowledge to every client engagement. As a member
                of AICPA and a board member of CalCPA, she stays at the forefront of tax law developments
                affecting the cannabis industry.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Our mission is to be your one-stop shop for tax and accounting solutions, helping cannabis
                business owners and CEOs achieve accurate financial statements, reduce tax burdens, and
                focus on what they do best growing their business.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                    <cred.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="font-geist font-semibold text-neutral-900 text-sm">{cred.value}</p>
                    <p className="text-xs text-neutral-500">{cred.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="font-geist font-bold text-5xl text-white">SJ</span>
                  </div>
                  <h3 className="font-geist font-semibold text-2xl text-neutral-900 mb-2">Sevana Janian</h3>
                  <p className="text-emerald-700 font-medium">CPA, Founder</p>
                  <p className="text-neutral-500 text-sm mt-2">18+ Years Experience</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-geist font-semibold text-neutral-900">CalCPA Board Member</p>
                    <p className="text-sm text-neutral-500">LA Chapter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Service Areas
              </span>
              <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
                Serving Cannabis Businesses Across California
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Based in Pasadena, we proudly serve cannabis businesses throughout Southern California
                and beyond. Virtual consultations available statewide.
              </p>

              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">301 N Lake Ave Suite 600</p>
                  <p className="text-neutral-600">Pasadena, CA 91101</p>
                </div>
              </div>

              <h4 className="font-geist font-semibold text-neutral-900 mb-4">Areas We Serve:</h4>
              <div className="flex flex-wrap gap-2">
                {areasServed.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-stone-100 text-neutral-600 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5456!2d-118.1445!3d34.1478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c35f!2s301%20N%20Lake%20Ave%20%23600%2C%20Pasadena%2C%20CA%2091101!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Green Plus CPA Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsWidget />

      {/* Credentials Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Credentials & Partnerships
            </span>
            <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
              Professional Qualifications You Can Trust
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-neutral-200">
              <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-geist font-semibold text-neutral-900 mb-1">Licensed CPA</h4>
              <p className="text-sm text-neutral-500">State of California</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-neutral-200">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-geist font-semibold text-neutral-900 mb-1">AICPA Member</h4>
              <p className="text-sm text-neutral-500">American Institute of CPAs</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-neutral-200">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-geist font-semibold text-neutral-900 mb-1">CalCPA Board</h4>
              <p className="text-sm text-neutral-500">LA Chapter Board Member</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-neutral-200">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-geist font-semibold text-neutral-900 mb-1">QuickBooks</h4>
              <p className="text-sm text-neutral-500">Certified ProAdvisor</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
              3 Easy Steps to Financial Clarity
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Getting started is simple. Here's how we help your cannabis business thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-stone-50 rounded-2xl p-8 border border-neutral-200 h-full">
                  <span className="inline-block font-geist font-bold text-5xl text-emerald-100 mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-geist font-semibold text-xl text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-emerald-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Get answers to common questions about cannabis tax and accounting services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#0B1120] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-geist font-semibold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mb-6">
            Ready to Reduce Your Tax Burden?
          </h2>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto mb-8">
            Schedule your free consultation today and discover how much you could save
            with expert cannabis tax strategy.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 font-medium rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18186442550"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (818) 644-2550
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
