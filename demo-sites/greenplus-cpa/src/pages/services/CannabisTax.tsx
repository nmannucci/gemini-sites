import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Phone,
  FileText,
  DollarSign,
  Shield,
  TrendingUp,
  Building,
  Truck,
  Store,
  Factory,
  Sprout,
} from 'lucide-react';
import PlaceholderForm from '../../components/PlaceholderForm';

const CannabisTax = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: FileText,
      title: '280E Tax Strategy',
      description: 'Maximize your Cost of Goods Sold deductions while maintaining full IRS compliance.',
    },
    {
      icon: DollarSign,
      title: 'COGS Optimization',
      description: 'Detailed analysis of your operations to identify all legitimate deductible costs.',
    },
    {
      icon: Shield,
      title: 'Audit Defense',
      description: 'Expert representation and documentation to protect your business during IRS audits.',
    },
    {
      icon: TrendingUp,
      title: 'Entity Structuring',
      description: 'Strategic business structure to legally minimize your overall tax burden.',
    },
  ];

  const businessTypes = [
    { icon: Store, label: 'Dispensaries' },
    { icon: Sprout, label: 'Cultivators' },
    { icon: Factory, label: 'Manufacturers' },
    { icon: Truck, label: 'Distributors' },
    { icon: Building, label: 'Delivery Services' },
  ];

  const benefits = [
    'Save thousands on taxes through proper COGS allocation',
    'Stay compliant with complex federal and state regulations',
    'Reduce audit risk with meticulous documentation',
    'Make informed decisions with accurate financial data',
    'Focus on growing your business while we handle the numbers',
  ];

  const faqs = [
    {
      question: 'What is Section 280E?',
      answer: 'Section 280E is an IRS tax code provision enacted in 1982 that prevents businesses trafficking in Schedule I or II controlled substances from deducting ordinary business expenses. Since cannabis remains federally classified as Schedule I, cannabis businesses cannot deduct expenses like rent, utilities, payroll, and marketing the way other businesses can.',
    },
    {
      question: 'How can I legally reduce my tax burden under 280E?',
      answer: 'While 280E prohibits deducting ordinary business expenses, it does allow for the deduction of Cost of Goods Sold (COGS). We help you properly allocate costs like direct labor, materials, packaging, and portions of facility costs to COGS, legally reducing your taxable income while maintaining full compliance.',
    },
    {
      question: 'What costs can be included in COGS for cannabis businesses?',
      answer: 'COGS can include direct materials, direct labor involved in production, inventory costs, and certain overhead expenses directly related to production. For cultivators, this includes growing supplies, cultivation labor, and facility costs. For dispensaries, it includes product costs and portions of storage and handling.',
    },
    {
      question: 'How do I know if my current tax strategy is compliant?',
      answer: 'We offer a comprehensive tax review service where we analyze your current financials, entity structure, and tax filings. We identify any compliance risks and opportunities for optimization. This review gives you peace of mind and a clear roadmap for improvement.',
    },
    {
      question: 'What happens if I get audited by the IRS?',
      answer: 'IRS audits of cannabis businesses are common. We provide full audit representation, handling all IRS communications, preparing documentation, and negotiating on your behalf. Our proactive approach to documentation and compliance significantly improves audit outcomes.',
    },
    {
      question: 'Do you work with businesses in all cannabis sectors?',
      answer: 'Yes, we work with dispensaries, cultivators, manufacturers, distributors, delivery services, and ancillary cannabis businesses. Each sector has unique tax considerations, and we tailor our strategies accordingly.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm mb-6 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Cannabis Tax Specialists
              </span>

              <h1 className="font-geist font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[0.95] mb-6">
                Navigate 280E & Maximize Your Cannabis Tax Savings
              </h1>

              <p className="text-xl text-emerald-100/80 leading-relaxed mb-8 max-w-xl">
                Section 280E doesn't have to drain your profits. Our specialized cannabis tax strategies
                help you legally reduce your tax burden while staying fully compliant.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
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
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h3 className="font-geist font-semibold text-xl text-white mb-2">
                Request Your Free Tax Review
              </h3>
              <p className="text-emerald-100/70 text-sm mb-6">
                Discover how much you could save with proper 280E tax strategy.
              </p>
              <PlaceholderForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* 280E Warning Section */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="font-geist font-semibold text-2xl text-neutral-900 mb-3">
                The 280E Challenge: Why Cannabis Businesses Pay More in Taxes
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Under IRS Section 280E, cannabis businesses cannot deduct ordinary business expenses like rent,
                utilities, marketing, and most payroll costs. This means many cannabis businesses pay effective
                tax rates of <strong>70% or higher</strong> without proper planning.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                However, the law still allows deductions for <strong>Cost of Goods Sold (COGS)</strong>. With the right
                strategy, you can legally allocate more costs to COGS and significantly reduce your tax burden.
                That's where we come in.
              </p>
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
              Comprehensive Cannabis Tax Services
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We provide end-to-end tax strategy and compliance services specifically designed
              for cannabis businesses operating under 280E.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-xl p-6 border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-geist font-semibold text-neutral-900 mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Who We Serve
              </span>
              <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-6">
                Tax Strategies for Every Cannabis Business Type
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Different cannabis operations have different tax considerations. A cultivator's COGS
                calculation differs significantly from a dispensary's. We understand these nuances
                and tailor our strategies to your specific business model.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {businessTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-medium text-neutral-900 text-sm">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="font-geist font-semibold text-xl text-neutral-900 mb-6">
                Why Work With a Cannabis Tax Specialist?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
              Cannabis Tax Questions Answered
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Get clarity on Section 280E and cannabis tax strategy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-xl border border-neutral-200 overflow-hidden"
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
            Stop Overpaying on Cannabis Taxes
          </h2>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto mb-8">
            Schedule your free consultation and discover how proper 280E strategy
            can save your business thousands in taxes.
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

export default CannabisTax;
