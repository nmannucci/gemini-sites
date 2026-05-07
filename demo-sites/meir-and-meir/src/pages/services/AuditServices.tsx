import { Link } from 'react-router-dom';
import { Shield, CheckCircle2 } from 'lucide-react';

const AuditServices = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Services</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-geist text-neutral-900 mb-6">Audit & Assurance</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              We provide efficient, affordable, and discreet audit services tailored to your specific needs, ensuring compliance and peace of mind.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-12">
            
            {/* Service Item */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-geist">Audit of Employee Benefit Plans</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We pride ourselves on being very efficient, affordable, and of course, extremely discreet. Our team has extensive experience in auditing employee benefit plans, ensuring your plan remains compliant with Department of Labor regulations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>401(k) Plan Audits</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Pension Plan Audits</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Form 5500 Filing Assistance</span>
                </li>
              </ul>
            </div>

            {/* Service Item */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-geist">Non-Profit Organizations</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We understand the unique challenges faced by non-profit organizations. Our specialized audit and accounting services help you maintain transparency, accountability, and donor trust.
              </p>
            </div>

            {/* Service Item */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-geist">Peer Review Services</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                With Maurice Meir serving as a Team Review Captain for the California CPA, our firm brings efficiency and quality to your peer review process. We offer both System and Engagement Reviews for other CPA firms.
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-16 bg-neutral-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-geist mb-4">Need an Audit?</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Contact us today to discuss your specific audit requirements and how we can assist you.
              </p>
              <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
                Schedule a Consultation
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditServices;
