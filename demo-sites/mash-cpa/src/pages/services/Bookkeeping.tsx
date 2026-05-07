import { CheckCircle, Briefcase, FileText, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookkeeping() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entity Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Comprehensive support for your business entity throughout its lifecycle.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Structured for Success</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Maintaining your business entity involves more than just filing taxes. It requires adherence to corporate formalities and ongoing compliance to protect your liability shield. Our Entity Services ensure your business stays in good standing.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We handle the details of entity management so you can focus on operations.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Annual Statement of Information Filing",
                  "Registered Agent Services",
                  "Corporate Minutes and Resolutions",
                  "Entity Dissolution",
                  "Foreign Qualification"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Entity Management</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Briefcase className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Compliance</h4>
                    <p className="text-gray-600 text-sm">Timely filings with state and local agencies to avoid penalties.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <Layers className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Organization</h4>
                    <p className="text-gray-600 text-sm">Keeping your corporate records organized and accessible.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-sm shadow-sm h-fit">
                    <FileText className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-navy-900">Asset Protection</h4>
                    <p className="text-gray-600 text-sm">Ensuring your entity structure effectively protects your personal assets.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-bold text-navy-900 mb-4">Protect your business.</p>
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