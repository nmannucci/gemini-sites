import { Link } from 'react-router-dom';
import { Users, Briefcase, Calculator } from 'lucide-react';

const BusinessServices = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
             <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Services</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-geist text-neutral-900 mb-6">Business Services</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              We take care of your business for you, so you can get back to the job of running your business and generating profits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceBlock 
                icon={<Briefcase />}
                title="CFO Services"
                desc="Get professional financial management without the cost of a full-time CFO. We help you better understand your financials to make sound business decisions."
            />
             <ServiceBlock 
                icon={<Users />}
                title="Forensic Accounting"
                desc="We investigate financial discrepancies and fraud, providing detailed analysis for legal proceedings or internal review."
            />
             <ServiceBlock 
                icon={<TrendingUpIcon />}
                title="Strategic Business Planning"
                desc="Clarify your company's direction. We help you develop a roadmap for growth, profitability, and long-term success."
            />
             <ServiceBlock 
                icon={<Calculator />}
                title="QuickBooks Services"
                desc="We are experts in QuickBooks. From setup and training to tune-ups and answering your specific questions, we help you get the most out of your software."
            />
          </div>

           <div className="mt-12 bg-stone-50 rounded-2xl p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold font-geist text-neutral-900 mb-4">New Business Formation</h3>
                <p className="text-neutral-600 mb-6">
                    Opening your own business is exciting and thrilling. It's everything that comes after the excitement and thrill has worn off that dictates whether you will make it or not. We help you select the right entity structure (S-Corp, LLC, etc.) to minimize taxes and liability.
                </p>
                <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                    Start your business on the right foot &rarr;
                </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

const ServiceBlock = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-3 font-geist">{title}</h3>
        <p className="text-neutral-600 leading-relaxed text-sm">{desc}</p>
    </div>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
)

export default BusinessServices;
