import { CheckCircle, TrendingUp, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PayrollServices() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Advisory</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Strategic guidance to help you scale your business with precision and efficiency.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Helping You Make Better Decisions</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Your business journey requires more than just bookkeeping. It needs a strategic roadmap. Our Financial Advisory services provide the insights and analysis you need to make critical business decisions with confidence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From cash flow management to growth strategies, we partner with you to achieve your long-term financial goals.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Business Performance Analysis",
                  "Budgeting and Forecasting",
                  "Cash Flow Management",
                  "Cost Reduction Strategies",
                  "Merger and Acquisition Support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Advisory Benefits</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Target className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Goal Alignment</h4>
                    <p className="text-gray-600 text-sm">Aligning your financial strategies with your personal and business objectives.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <TrendingUp className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Growth Optimization</h4>
                    <p className="text-gray-600 text-sm">Identifying levers to increase profitability and sustainable growth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Users className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Trusted Partnership</h4>
                    <p className="text-gray-600 text-sm">A dedicated advisor who understands the nuances of your industry.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Take your business to the next level.</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Speak with an Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}