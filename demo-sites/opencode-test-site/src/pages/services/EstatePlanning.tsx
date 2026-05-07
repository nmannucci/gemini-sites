import { Link } from 'react-router-dom'
import { Users, Shield, Building2, PiggyBank, CheckCircle2, Heart } from 'lucide-react'

export default function EstatePlanning() {
  const services = [
    {
      title: 'Estate Planning',
      description: 'Comprehensive estate planning to manage and protect your wealth for future generations.',
      icon: Shield
    },
    {
      title: 'Wealth Preservation',
      description: 'Strategies to preserve and grow your wealth while minimizing tax exposure.',
      icon: PiggyBank
    },
    {
      title: 'Asset Protection',
      description: 'Protect your assets from creditors, lawsuits, and other potential risks.',
      icon: Building2
    }
  ]

  const benefits = [
    'Protect your family\'s financial future',
    'Minimize estate and inheritance taxes',
    'Ensure your wishes are carried out',
    'Preserve wealth across generations',
    'Peace of mind for you and your loved ones'
  ]

  const considerations = [
    'Wills and trusts',
    'Power of attorney',
    'Healthcare directives',
    'Beneficiary designations',
    'Asset titling',
    'Tax planning strategies'
  ]

  return (
    <main className="pt-20">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Estate Planning</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Comprehensive estate planning services to manage, protect, and transfer your wealth according to your wishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Why Estate Planning Matters</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                Estate planning is one of most important steps you can take to ensure your family\'s financial future is secure. Without proper planning, your assets may not be distributed according to your wishes and your loved ones may face unnecessary taxes and legal complications.
              </p>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                Our team works with you to create a comprehensive estate plan that protects your wealth, minimizes tax exposure, and provides peace of mind for you and your family.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-600 mt-1 min-w-[20px]" size={20} />
                    <span className="text-neutral-600 font-geist">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-geist">Protect What Matters</h3>
                  <p className="text-white/80 text-sm font-geist">For generations to come</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed mb-6 font-geist">
                Estate planning isn't just about documents—it's about ensuring your legacy and protecting the people you care about most.
              </p>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="font-semibold mb-4 font-geist">Key Considerations</h4>
                <ul className="space-y-2">
                  {considerations.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/90 font-geist">
                      <CheckCircle2 size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Ready to Plan Your Legacy?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8 font-geist">
            Don't leave your family's future to chance. Contact us today to discuss your estate planning needs.
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
