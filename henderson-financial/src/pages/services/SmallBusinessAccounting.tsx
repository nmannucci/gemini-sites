
import { CheckCircle, TrendingUp, BarChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmallBusinessAccounting() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Small Business Accounting Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Focus on growing your business while we handle the numbers. Comprehensive accounting solutions tailored for Pasadena small businesses.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">Why Professional Accounting Matters</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                As a small business owner, your time is your most valuable asset. Managing your own books can be time-consuming and prone to errors. Our professional small business accounting services provide you with accurate, timely financial information so you can make informed decisions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We go beyond simple data entry. We act as your strategic financial partner, helping you identify trends, manage cash flow, and plan for future growth.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Monthly or quarterly operating statements",
                  "Bank account reconciliation",
                  "Balance sheet generation",
                  "General ledger maintenance",
                  "Financial consultations"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Our Accounting Process</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <BarChart className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">1. Analysis & Setup</h4>
                    <p className="text-gray-600 text-sm">We review your current system and set up a streamlined chart of accounts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <TrendingUp className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">2. Regular Reporting</h4>
                    <p className="text-gray-600 text-sm">Receive accurate monthly reports to track your performance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <PieChart className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">3. Strategic Review</h4>
                    <p className="text-gray-600 text-sm">Quarterly meetings to discuss tax saving strategies and business health.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Ready to streamline your finances?</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
