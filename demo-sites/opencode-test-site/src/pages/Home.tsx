import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Target, 
  Shield, 
  Calculator, 
  FileText, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Phone,
  Clock,
  Award
} from 'lucide-react'
import { useState } from 'react'
import ReviewsWidget from '../components/ReviewsWidget'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const services = [
    {
      title: 'Audit & Assurance',
      description: 'Specialized audits for employee benefit plans and non-profits.',
      icon: Shield,
      link: '/services/audit-assurance',
      color: 'blue',
      points: ['Employee Benefit Plans', 'Non-Profit Audits', 'Peer Reviews', 'Compliance']
    },
    {
      title: 'Business Services',
      description: 'Strategic financial guidance to help your business grow.',
      icon: Target,
      link: '/services/business-services',
      color: 'purple',
      points: ['CFO Services', 'Forensic Accounting', 'Strategic Planning', 'Succession Planning']
    },
    {
      title: 'QuickBooks Services',
      description: 'Expert setup, training, and support for QuickBooks users.',
      icon: Calculator,
      link: '/services/quickbooks-services',
      color: 'emerald',
      points: ['Installation & Setup', 'Staff Training', 'File Clean-up', 'Support']
    },
    {
      title: 'Tax Services',
      description: 'Comprehensive tax planning and problem resolution.',
      icon: FileText,
      link: '/services/tax-services',
      color: 'orange',
      points: ['Tax Preparation', 'IRS Representation', 'Tax Planning', 'Back Taxes']
    },
    {
      title: 'Estate Planning',
      description: 'Protect your legacy with expert estate planning.',
      icon: Users,
      link: '/services/estate-planning',
      color: 'teal',
      points: ['Wealth Protection', 'Trust Planning', 'Asset Management', 'Inheritance Strategy']
    }
  ]

  const partners = [
    {
      name: 'Saul Meir, CPA',
      title: 'Partner | Senior Auditor',
      experience: '32+ years as Senior Auditor',
      education: 'Tel Aviv University (BA, MA Economics w/ Honors), Kellogg School of Management'
    },
    {
      name: 'Maurice M. Meir, CPA',
      title: 'Partner | Senior Auditor',
      experience: '40+ years as an accountant, 35+ years as senior auditor of pension plans',
      education: 'USC (MBA w/ Honors), CSUN (BS Accounting/Finance w/ Honors)'
    },
    {
      name: 'Orit Cohen Gendelman, CPA',
      title: 'Partner | C&G Group',
      experience: '15+ years in audit, tax, and management',
      education: 'CSUN (BS Accountancy)'
    }
  ]

  const steps = [
    {
      title: 'Free Consultation',
      description: 'Schedule a complimentary call to discuss your financial needs and goals.',
      icon: Phone
    },
    {
      title: 'Custom Strategy',
      description: 'We analyze your unique situation and create a tailored plan for success.',
      icon: Target
    },
    {
      title: 'Peace of Mind',
      description: 'We handle the complex details so you can focus on what matters most.',
      icon: CheckCircle2
    }
  ]

  const faqs = [
    {
      question: 'What types of clients do you work with?',
      answer: 'We work with small to medium-sized businesses, individuals, families, and non-profit organizations across various industries.'
    },
    {
      question: 'Do you offer remote services?',
      answer: 'Yes, while we have offices in Canoga Park and Beverly Hills, we serve clients throughout California and can work remotely.'
    },
    {
      question: 'What is an Employee Benefit Plan Audit?',
      answer: 'It is a specialized audit required for plans with over 100 eligible participants to ensure compliance with DOL and IRS regulations.'
    },
    {
      question: 'Can you help with IRS tax problems?',
      answer: 'Absolutely. We specialize in resolving tax issues including audits, back taxes, liens, levies, and wage garnishments.'
    },
    {
      question: 'How much do your services cost?',
      answer: 'Our fees vary based on the complexity of the service. We pride ourselves on offering efficient and affordable solutions.'
    },
    {
      question: 'Do you work with QuickBooks?',
      answer: 'Yes, we are QuickBooks experts offering setup, training, clean-up, and ongoing support.'
    },
    {
      question: 'Where are your offices located?',
      answer: 'We have two convenient locations: 21201 Victory Blvd in Canoga Park and 139 South Beverly Drive in Beverly Hills.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply click the "Book Consultation" button or call us to schedule your initial meeting.'
    }
  ]

  const credentials = [
    { label: 'Combined Experience', value: '40+ Years', icon: Clock },
    { label: 'Certified Professionals', value: 'CPA Licensed', icon: Award },
    { label: 'Peer Review Captain', value: 'Industry Leader', icon: Shield },
    { label: 'Satisfied Clients', value: '1000+', icon: Users }
  ]

  return (
    <main className="font-sans text-neutral-900">
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-[100px] animate-blob mix-blend-multiply"></div>
          <div className="absolute top-[30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-100/50 blur-[100px] animate-blob mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 leading-tight">
              Expert Accounting <br/> <span className="text-blue-600">& Tax Services</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Serving Canoga Park and Beverly Hills with efficiency, affordability, and discretion. We handle your business and tax matters so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                Book Consultation
              </Link>
              <Link to="/services/audit-assurance" className="border border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-white hover:text-blue-600 rounded-full px-8 py-4 font-medium transition-all duration-300 shadow-sm">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials / Trusted By Section */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((cred, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-neutral-100 text-blue-600 flex items-center justify-center mb-4">
                  <cred.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 font-serif mb-1">{cred.value}</h3>
                <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">{cred.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Our Services</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              Comprehensive accounting, tax, and consulting services tailored to meet your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-xl bg-${service.color}-50 text-${service.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">{service.description}</p>
                
                <ul className="mb-8 space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center text-sm text-neutral-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}-400 mr-2`}></div>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  View Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Easy Steps */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Getting started with us is simple. Here is our proven process for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-neutral-800 -z-10"></div>

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-neutral-800 border-4 border-neutral-900 flex items-center justify-center mb-8 relative z-10">
                  <step.icon size={32} className="text-blue-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Our Firm */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Meet The Partners</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto leading-relaxed text-lg">
              Meir and Meir, LLP is a trusted accounting firm with deep roots in the community. 
              We pride ourselves on handling business and tax matters so clients can focus on running their businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 group hover:shadow-md transition-shadow">
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-serif font-bold mb-6">
                    {partner.name.charAt(0)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">{partner.name}</h3>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{partner.title}</p>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{partner.experience}</p>
                  <p className="text-neutral-400 text-xs mt-auto italic">{partner.education}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served + Reviews */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Map / Areas */}
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">Serving Our Community</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                With offices in Canoga Park and Beverly Hills, we are perfectly positioned to serve businesses and individuals throughout Los Angeles and the San Fernando Valley.
              </p>
              
              {/* Map Placeholder */}
              <div className="bg-neutral-100 rounded-2xl h-[300px] w-full flex items-center justify-center mb-8 border border-neutral-200">
                <div className="text-center text-neutral-400">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Google Map Integration</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Canoga Park', 'Beverly Hills', 'Los Angeles', 'San Fernando Valley', 'Woodland Hills', 'Calabasas', 'Santa Monica', 'Encino'].map((area, i) => (
                  <div key={i} className="flex items-center gap-2 text-neutral-600">
                    <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
               <h2 className="font-serif text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">Trusted by Businesses</h2>
               <p className="text-neutral-600 mb-8">See what our clients have to say about our efficiency and discretion.</p>
               <ReviewsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Answers to common questions about our services and process.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-serif text-lg font-semibold text-neutral-900 pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-neutral-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 text-neutral-600 transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Contact us today to schedule a consultation with one of our experienced CPAs and take the stress out of your finances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-900 hover:bg-blue-50 rounded-full px-8 py-4 font-bold transition-all duration-300 shadow-lg">
              Schedule Consultation
            </Link>
            <a href="tel:3104351759" className="border border-blue-400/50 text-white hover:bg-blue-800/50 rounded-full px-8 py-4 font-medium transition-all duration-300 backdrop-blur-sm">
              Call (310) 435-1759
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}