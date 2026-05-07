import { Link } from 'react-router-dom'
import { Shield, CheckCircle2, Award, Users, FileCheck } from 'lucide-react'

export default function AuditAssurance() {
  const services = [
    {
      title: 'Employee Benefit Plan Audits',
      description: 'Efficient, affordable, and discreet audits for employee benefit plans. Our team has extensive experience ensuring compliance and accuracy.',
      icon: Shield
    },
    {
      title: 'Non-Profit Organization Audits',
      description: 'Specialized audit and accounting services designed to meet the unique requirements of non-profit organizations and their stakeholders.',
      icon: Users
    },
    {
      title: 'Peer Review',
      description: 'System and engagement peer reviews for CPA firms. Maurice Meir is a qualified Team Review Captain for California CPA.',
      icon: Award
    }
  ]

  const benefits = [
    'Comprehensive audit coverage with minimal disruption',
    'Deep expertise in employee benefit plan regulations',
    'Qualified Peer Review Captain for CPA firm reviews',
    'Extremely discreet and confidential service',
    'Affordable pricing without compromising quality',
    'Timely delivery of audit reports'
  ]

  return (
    <main className="pt-20">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Audit & Assurance Services</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Professional audit services with a focus on efficiency, accuracy, and discretion for employee benefit plans, non-profits, and CPA firms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Why Choose Our Audit Services?</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed font-geist">
                With decades of experience in auditing, our team delivers thorough, accurate audits that meet all regulatory requirements. We understand the importance of discretion and work efficiently to minimize disruption to your operations.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-600 mt-1 min-w-[20px]" size={20} />
                    <span className="text-neutral-600 font-geist">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0B1120] rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Award className="text-blue-400" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-geist">Peer Review Expert</h3>
                  <p className="text-neutral-400 text-sm font-geist">Maurice Meir, CPA</p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed font-geist mb-4">
                Maurice Meir is a qualified Team Review Captain for California CPA, bringing over 35 years of senior audit experience for pension plans.
              </p>
              <div className="flex items-center gap-2 text-blue-400">
                <FileCheck size={20} />
                <span className="text-sm font-semibold font-geist">Qualified to review CPA firms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Ready to Get Started?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8 font-geist">
            Contact us today to discuss your audit needs with our experienced team.
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
