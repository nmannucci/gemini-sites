import { Link } from 'react-router-dom'
import { Target, Scale, Briefcase, TrendingUp, Users, CheckCircle2 } from 'lucide-react'

export default function BusinessServices() {
  const services = [
    {
      title: 'CFO Services',
      description: 'Part-time CFO services providing financial leadership without the full-time cost. Strategic planning, financial analysis, and business insights.',
      icon: Target
    },
    {
      title: 'Forensic Accounting',
      description: 'Expert investigation of financial discrepancies, fraud detection, and financial dispute resolution with detailed reporting.',
      icon: Scale
    },
    {
      title: 'Strategic Business Planning',
      description: 'Comprehensive planning for business growth and stability, including financial projections and performance analysis.',
      icon: TrendingUp
    },
    {
      title: 'Succession Planning',
      description: 'Help business owners plan for the future transition of their business, ensuring continuity and value preservation.',
      icon: Users
    },
    {
      title: 'New Business Formation',
      description: 'Guidance on entity selection and setup for new businesses, ensuring proper structure from the start.',
      icon: Briefcase
    }
  ]

  const benefits = [
    'Part-time CFO services at a fraction of the cost',
    'Strategic insights for business growth',
    'Expert guidance on business transitions',
    'Forensic accounting for fraud detection',
    'Proper entity formation for new businesses'
  ]

  return (
    <main className="pt-20">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Business Services</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Comprehensive business consulting services to help your business grow, thrive, and prepare for the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 font-geist">{service.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm font-geist">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">How We Help Your Business</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                Whether you're a startup or an established business, our team provides the financial expertise and strategic guidance you need to succeed. We work as an extension of your team, providing insights and solutions tailored to your specific situation.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-purple-600 mt-1 min-w-[20px]" size={20} />
                    <span className="text-neutral-600 font-geist">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-geist">Part-Time CFO Services</h3>
              <p className="text-white/90 leading-relaxed mb-6 font-geist">
                Get the financial leadership your business needs without the expense of a full-time CFO. Our team provides:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-white/80 mt-1 min-w-[20px]" size={20} />
                  <span className="text-white/90 font-geist">Financial analysis and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-white/80 mt-1 min-w-[20px]" size={20} />
                  <span className="text-white/90 font-geist">Strategic planning and forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-white/80 mt-1 min-w-[20px]" size={20} />
                  <span className="text-white/90 font-geist">Cash flow management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-white/80 mt-1 min-w-[20px]" size={20} />
                  <span className="text-white/90 font-geist">Budgeting and performance analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Ready to Grow Your Business?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8 font-geist">
            Let us help you navigate financial decisions and plan for the future success of your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-3 font-semibold transition-all duration-300 font-geist">
              Schedule Consultation
            </Link>
            <a href="tel:3104351759" className="border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-4 font-medium transition-all duration-300 font-geist">
              Call (310) 435-1759
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
