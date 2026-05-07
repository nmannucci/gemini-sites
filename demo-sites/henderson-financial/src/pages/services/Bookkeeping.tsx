
import { CheckCircle, FileText, Search, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookkeeping() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Professional Bookkeeping</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Keep your finances organized and audit-ready. Meticulous bookkeeping services for clarity and peace of mind.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">The Foundation of Financial Health</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Accurate bookkeeping is the backbone of any successful business. Without organized records, you can't truly understand your profitability or cash flow. Our professional bookkeepers ensure every transaction is recorded correctly.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We provide you with clear, concise monthly statements that help you track expenses, monitor revenue, and prepare for tax season with ease.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Accounts payable and receivable management",
                  "Credit card and bank reconciliation",
                  "Expense tracking and categorization",
                  "Monthly financial statement preparation",
                  "Year-end clean up"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Clear Financial Visibility</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Database className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Organized Records</h4>
                    <p className="text-gray-600 text-sm">Never lose track of a receipt or invoice again. We keep everything digital and sorted.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Search className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Error Detection</h4>
                    <p className="text-gray-600 text-sm">We catch discrepancies early, preventing small issues from becoming big problems.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <FileText className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Tax Readiness</h4>
                    <p className="text-gray-600 text-sm">When tax season arrives, your books will be perfectly prepared for filing.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Get your books in order.</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
