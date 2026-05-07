import { Link } from 'react-router-dom';
import { ScrollText, HeartHandshake } from 'lucide-react';

const EstatePlanning = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
             <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Services</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-geist text-neutral-900 mb-6">Estate Planning</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Protecting your wealth and ensuring your legacy for future generations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-neutral-100 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/2">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                        <ScrollText className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold font-geist text-neutral-900 mb-6">Plan for the Future</h2>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                        Estate planning is about more than just a will. It's about comprehensive financial planning to manage risk, improve performance, and ensure the growth and longevity of your wealth.
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                        We work closely with you to understand your specific goals and family dynamics, creating a tailored plan that minimizes estate taxes and ensures your assets are distributed according to your wishes.
                    </p>
                </div>
                <div className="lg:w-1/2 bg-stone-50 rounded-xl p-8 border border-neutral-200">
                    <h3 className="text-xl font-bold font-geist text-neutral-900 mb-4 flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5 text-blue-600" />
                        Our Approach
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm text-neutral-600">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                            <span>Comprehensive review of current financial situation</span>
                        </li>
                        <li className="flex gap-3 text-sm text-neutral-600">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                            <span>Strategies to minimize estate and gift taxes</span>
                        </li>
                        <li className="flex gap-3 text-sm text-neutral-600">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                            <span>Coordination with your legal team</span>
                        </li>
                        <li className="flex gap-3 text-sm text-neutral-600">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                            <span>Succession planning for business owners</span>
                        </li>
                    </ul>
                    <div className="mt-8">
                        <Link to="/contact" className="block w-full text-center bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
                            Discuss Your Estate Plan
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatePlanning;
