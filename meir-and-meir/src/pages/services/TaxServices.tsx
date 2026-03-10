import { Link } from 'react-router-dom';
import { AlertCircle, FileCheck, ArrowRight } from 'lucide-react';

const TaxServices = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
             <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Services</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-geist text-neutral-900 mb-6">Tax Services</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              We specialize in resolving complex tax problems and providing strategic planning to minimize your liabilities.
            </p>
          </div>

          {/* Intro Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-geist">Preparation & Planning</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                    We prepare tax returns for individuals, corporations, partnerships, and non-profits. Our proactive planning strategies help you keep more of what you earn.
                </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-4">
                    <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-geist">Tax Problem Resolution</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                    Facing the IRS can be a nightmare. We step in to handle audits, liens, levies, and back taxes so you can sleep at night.
                </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold font-geist text-neutral-900 mb-10">Tax Resolution Services</h2>
          
          <div className="space-y-6">
            <ServiceCard 
                title="IRS Audit Representation" 
                desc="Rarely do our clients have to talk with the IRS. We handle it all for you so that you need not take time off of your business or job to handle the bureaucracy and paperwork of the IRS."
            />
            <ServiceCard 
                title="Non-Filed Tax Returns" 
                desc="If you haven't filed your tax returns for one or more years, we can help you get compliant and minimize penalties."
            />
             <ServiceCard 
                title="Back Taxes Owed" 
                desc="We can help you navigate the options for paying back taxes, including installment agreements and offers in compromise."
            />
             <ServiceCard 
                title="Payroll Tax Problems" 
                desc="The IRS views failing to pay payroll taxes as the cardinal sin of tax delinquency. We help you resolve these critical issues quickly."
            />
             <ServiceCard 
                title="IRS Liens & Levies" 
                desc="We work to get liens and levies released so you can get back to normal life."
            />
             <ServiceCard 
                title="Offer In Compromise" 
                desc="We can help you determine if you qualify to settle your tax debt for less than the full amount you owe."
            />
          </div>

          {/* CTA */}
          <div className="mt-16 bg-blue-600 rounded-3xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold font-geist mb-4">Don't Face the IRS Alone</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                If you've received a notice from the IRS, contact us immediately. The sooner we get involved, the better the outcome.
            </p>
            <Link to="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Get Help Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex gap-4 p-6 rounded-xl border border-neutral-200 hover:border-blue-300 bg-white transition-colors">
        <div className="mt-1">
            <ArrowRight className="w-5 h-5 text-blue-600" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2 font-geist">{title}</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default TaxServices;
