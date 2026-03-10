import { Link } from 'react-router-dom'
import { Calculator, GraduationCap, Wrench, HelpCircle, ShoppingCart, CheckCircle2, Zap } from 'lucide-react'

export default function QuickBooksServices() {
  const services = [
    {
      title: 'QuickBooks Setup',
      description: 'Proper installation and initial setup of QuickBooks for your business, ensuring correct configuration from the start.',
      icon: Wrench
    },
    {
      title: 'QuickBooks Training',
      description: 'Comprehensive training for your staff on how to effectively use QuickBooks for accounting and financial management.',
      icon: GraduationCap
    },
    {
      title: 'QuickTune-up',
      description: 'Reviewing and cleaning up your existing QuickBooks files to ensure accuracy and optimal performance.',
      icon: Zap
    },
    {
      title: 'QuickAnswers',
      description: 'On-demand support for specific QuickBooks questions and troubleshooting when you need quick solutions.',
      icon: HelpCircle
    },
    {
      title: 'Buy QuickBooks and Save',
      description: 'Reselling QuickBooks software at competitive prices, helping you save on your accounting software investment.',
      icon: ShoppingCart
    }
  ]

  const benefits = [
    'Professional QuickBooks setup and configuration',
    'Expert training for your team',
    'Quick support when you need it most',
    'Competitive pricing on QuickBooks software',
    'Proven expertise in QuickBooks for businesses'
  ]

  return (
    <main className="pt-20">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <Calculator size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">QuickBooks Services</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Complete QuickBooks solutions from setup to training, ensuring your business makes the most of this powerful accounting software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Why Choose Our QuickBooks Services?</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                QuickBooks is one of the most powerful tools for business accounting, but only when properly configured and used. Our team of experts ensures you get maximum value from QuickBooks with setup, training, and ongoing support.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-600 mt-1 min-w-[20px]" size={20} />
                    <span className="text-neutral-600 font-geist">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-geist">QuickBooks Services Overview</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench size={20} />
                    <h4 className="font-semibold font-geist">Setup</h4>
                  </div>
                  <p className="text-white/90 text-sm font-geist">Custom configuration for your business needs</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap size={20} />
                    <h4 className="font-semibold font-geist">Training</h4>
                  </div>
                  <p className="text-white/90 text-sm font-geist">Hands-on instruction for your staff</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap size={20} />
                    <h4 className="font-semibold font-geist">Tune-up</h4>
                  </div>
                  <p className="text-white/90 text-sm font-geist">Optimize existing QuickBooks files</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle size={20} />
                    <h4 className="font-semibold font-geist">QuickAnswers</h4>
                  </div>
                  <p className="text-white/90 text-sm font-geist">Fast solutions to your questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Need QuickBooks Help?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8 font-geist">
            Whether you're setting up QuickBooks for the first time or need help with an existing installation, we're here to help.
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
