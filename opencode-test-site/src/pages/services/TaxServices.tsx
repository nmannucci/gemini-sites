import { Link } from 'react-router-dom'
import { FileText, AlertTriangle, Shield, CheckCircle2, HelpCircle, Scale } from 'lucide-react'

export default function TaxServices() {
  const services = [
    {
      title: 'Tax Preparation',
      description: 'Professional tax preparation for individuals and businesses. We ensure accuracy, maximize deductions, and file on time.',
      icon: FileText
    },
    {
      title: 'Tax Planning',
      description: 'Strategic tax planning to minimize your liability and optimize your financial position for the current and future years.',
      icon: Shield
    },
    {
      title: 'Tax Problems Resolution',
      description: 'Expert help resolving serious tax problems including IRS audits, back taxes, liens, levies, and wage garnishment.',
      icon: AlertTriangle
    }
  ]

  const taxProblems = [
    'IRS Audit Representation',
    'Non-Filed Tax Returns',
    'Back Taxes Owed',
    'Payroll Tax Problems',
    'IRS Liens, Levies, and Wage Garnishment',
    'Offer In Compromise',
    'Bankruptcy',
    'Innocent Spouse Relief'
  ]

  const benefits = [
    'Expert representation for IRS audits',
    'Resolution of back taxes and liens',
    'Strategic tax planning to minimize liability',
    'Professional tax preparation for individuals and businesses',
    'Peace of mind knowing your tax matters are handled'
  ]

  return (
    <main className="pt-20">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-6">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Tax Services</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Comprehensive tax services from preparation and planning to resolution of serious tax problems with the IRS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
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
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Tax Problems We Resolve</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                Tax problems can be overwhelming and stressful. Whether you're facing an IRS audit, back taxes, or wage garnishment, we're here to help you resolve these issues and get your life back on track.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {taxProblems.map((problem, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-orange-600 mt-1 min-w-[20px] flex-shrink-0" size={20} />
                    <span className="text-neutral-600 font-geist">{problem}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0B1120] rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-orange-600/20 flex items-center justify-center">
                  <Shield className="text-orange-400" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-geist">We're Here to Help</h3>
                  <p className="text-neutral-400 text-sm font-geist">Put an end to the misery</p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed font-geist mb-6">
                Tax problems can turn your life upside-down and create financial misery. We understand the stress and uncertainty you're facing. Our experienced team will work tirelessly to resolve your tax issues and help you move forward.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HelpCircle className="text-orange-400 mt-1 min-w-[20px]" size={20} />
                  <span className="text-neutral-300 font-geist">Expert IRS audit representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Scale className="text-orange-400 mt-1 min-w-[20px]" size={20} />
                  <span className="text-neutral-300 font-geist">Negotiate favorable settlements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-orange-400 mt-1 min-w-[20px]" size={20} />
                  <span className="text-neutral-300 font-geist">Stop liens, levies, and garnishments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Why Choose Our Tax Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 mt-1 min-w-[20px]" size={20} />
                  <span className="text-neutral-600 font-geist text-left">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-3 font-semibold transition-all duration-300 font-geist">
                Schedule Consultation
              </Link>
              <a href="tel:3104351759" className="border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-4 font-medium transition-all duration-300 font-geist">
                Call (310) 435-1759
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
