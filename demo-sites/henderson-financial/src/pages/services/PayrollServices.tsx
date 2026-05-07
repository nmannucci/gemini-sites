
import { CheckCircle, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PayrollServices() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Payroll Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Reliable, compliant, and efficient payroll solutions. Ensure your employees are paid correctly and on time, every time.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">Eliminate Payroll Headaches</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Managing payroll can be one of the most stressful aspects of running a business. Missed deadlines or incorrect filings can lead to costly penalties. Henderson Financial Solutions takes the burden off your shoulders with our comprehensive payroll services.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We handle everything from check processing and direct deposits to W-2 generation and quarterly tax filings, giving you peace of mind and more time to focus on your business.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Complete payroll processing",
                  "Direct deposit setup",
                  "Federal and State payroll tax filings",
                  "W-2 and 1099 preparation",
                  "Workers' compensation audits"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Why Choose Our Payroll?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Time Savings</h4>
                    <p className="text-gray-600 text-sm">Stop spending hours on manual calculations. We automate the process.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Shield className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Compliance Guarantee</h4>
                    <p className="text-gray-600 text-sm">We stay updated on all labor laws and tax regulations to keep you compliant.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Users className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Employee Satisfaction</h4>
                    <p className="text-gray-600 text-sm">Accurate and timely payments keep your team happy and motivated.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Simplify your payroll today.</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
