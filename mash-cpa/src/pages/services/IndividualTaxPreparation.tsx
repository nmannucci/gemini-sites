import { CheckCircle, FileText, ShieldCheck, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndividualTaxPreparation() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tax Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Expert tax preparation and planning to minimize liabilities and maximize returns for individuals and businesses.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Accurate & Efficient Tax Solutions</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Navigating the complex landscape of tax regulations can be daunting. Our team ensures that your tax returns are prepared accurately and filed on time, giving you peace of mind.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We work proactively to identify tax-saving opportunities that others might miss. Whether you are an individual with complex investments or a business owner, we have the expertise to handle your unique situation.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Individual Tax Preparation (1040)",
                  "Business Tax Return Preparation",
                  "Electronic Filing",
                  "IRS Audit Representation",
                  "Tax Planning Strategies"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Our Tax Approach</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <FileText className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Comprehensive Review</h4>
                    <p className="text-gray-600 text-sm">We review your previous returns and current documents to ensure nothing is missed.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <ShieldCheck className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Audit Support</h4>
                    <p className="text-gray-600 text-sm">If the IRS calls, we're by your side to handle the correspondence and representation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <DollarSign className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Strategic Planning</h4>
                    <p className="text-gray-600 text-sm">We don't just record history; we help you plan for a more profitable future.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Minimize your tax liability.</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Get Tax Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}