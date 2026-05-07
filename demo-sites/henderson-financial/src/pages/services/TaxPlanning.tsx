
import { CheckCircle, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaxPlanning() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Strategic Tax Planning</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Don't just file taxes—plan for them. Proactive strategies to minimize liability and maximize wealth.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">A Proactive Approach to Taxes</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Most people only think about taxes once a year. By then, it's often too late to make changes that could save you money. Tax planning is a year-round process of looking at your financial situation and making strategic decisions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We work with you to understand your long-term goals and structure your finances in the most tax-efficient way possible, ensuring you keep more of what you earn.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Business entity selection analysis",
                  "Retirement plan contribution optimization",
                  "Capital gains and loss harvesting",
                  "Estate and trust tax planning",
                  "Tax credit utilization"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Strategies for Success</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Target className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Goal Alignment</h4>
                    <p className="text-gray-600 text-sm">We align tax strategies with your personal and business financial goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <TrendingUp className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Future Proofing</h4>
                    <p className="text-gray-600 text-sm">We anticipate tax law changes to protect your wealth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Lightbulb className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Creative Solutions</h4>
                    <p className="text-gray-600 text-sm">We explore legal avenues for tax reduction that others might miss.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Start saving today.</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Plan Your Strategy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
