
import { CheckCircle, FileCheck, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndividualTaxPreparation() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Individual Tax Preparation</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Maximize your refund and minimize stress. Expert tax preparation services for individuals and families in Pasadena.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">More Than Just Tax Filing</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Tax laws change every year, making it difficult for individuals to ensure they are taking advantage of every deduction and credit available. At Henderson Financial Solutions, we stay up-to-date with the latest tax codes to ensure accurate and compliant returns.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Whether you have a simple W-2 return or complex investments and rental properties, our experienced team provides personalized attention to your unique financial situation.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Federal and State tax return filing",
                  "Review of previous years' returns",
                  "Electronic filing for faster refunds",
                  "Investment income and stock sales",
                  "Rental property income reporting"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Tax Season Made Simple</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <FileCheck className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">1. Document Collection</h4>
                    <p className="text-gray-600 text-sm">Use our secure portal to easily upload your tax documents.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Calendar className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">2. Preparation & Review</h4>
                    <p className="text-gray-600 text-sm">We prepare your return and review it with you to ensure accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <DollarSign className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">3. Filing & Planning</h4>
                    <p className="text-gray-600 text-sm">We file electronically and provide tips for next year's savings.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Ready to file your taxes?</p>
                <Link to="/contact" className="block w-full py-3 bg-gold-500 text-navy-900 text-center font-bold rounded-sm hover:bg-gold-600 transition-colors">
                  Book Your Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
