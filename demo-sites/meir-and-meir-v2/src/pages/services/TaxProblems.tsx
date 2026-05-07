import { ShieldAlert, FileText, Gavel, HandCoins, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import PlaceholderForm from '../../components/PlaceholderForm';

const TaxProblems = () => {
  return (
    <div className="bg-brand-cream min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 fade-in-up">
          <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6">Expert Resolution Services</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-navy mb-8 leading-tight">
            We Stand Between You <br/> <span className="italic text-brand-gold">and the IRS.</span>
          </h1>
          <p className="font-sans text-brand-navy/60 font-normal text-lg leading-relaxed max-w-2xl mx-auto">
            Facing tax problems can be a nightmare. We provide the professional representation and negotiation skills needed to resolve IRS audits, liens, and back taxes with discretion and authority.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          
          <div className="bg-white p-10 shadow-sm border border-brand-navy/5 group hover:border-brand-gold/30 transition-all duration-500">
            <ShieldAlert className="w-10 h-10 text-brand-navy mb-6 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-brand-navy mb-4">IRS Audit Representation</h3>
            <p className="font-sans text-brand-navy/60 font-normal text-sm leading-relaxed mb-6">
              Never face the IRS alone. We handle all correspondence and meetings, ensuring your rights are protected during an audit.
            </p>
          </div>

          <div className="bg-white p-10 shadow-sm border border-brand-navy/5 group hover:border-brand-gold/30 transition-all duration-500">
            <History className="w-10 h-10 text-brand-navy mb-6 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-brand-navy mb-4">Non-Filed Returns</h3>
            <p className="font-sans text-brand-navy/60 font-normal text-sm leading-relaxed mb-6">
              We help you get compliant by filing back taxes, often reducing penalties and interest in the process.
            </p>
          </div>

          <div className="bg-white p-10 shadow-sm border border-brand-navy/5 group hover:border-brand-gold/30 transition-all duration-500">
            <Gavel className="w-10 h-10 text-brand-navy mb-6 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-brand-navy mb-4">Liens & Levies</h3>
            <p className="font-sans text-brand-navy/60 font-normal text-sm leading-relaxed mb-6">
              Immediate action to release wage garnishments and bank levies, giving you breathing room to resolve the debt.
            </p>
          </div>

          <div className="bg-white p-10 shadow-sm border border-brand-navy/5 group hover:border-brand-gold/30 transition-all duration-500">
            <HandCoins className="w-10 h-10 text-brand-navy mb-6 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-brand-navy mb-4">Offer In Compromise</h3>
            <p className="font-sans text-brand-navy/60 font-normal text-sm leading-relaxed mb-6">
              We negotiate settlements to resolve your tax debt for a fraction of what you owe if you qualify.
            </p>
          </div>

           <div className="bg-white p-10 shadow-sm border border-brand-navy/5 group hover:border-brand-gold/30 transition-all duration-500">
            <FileText className="w-10 h-10 text-brand-navy mb-6 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-brand-navy mb-4">Payroll Tax Problems</h3>
            <p className="font-sans text-brand-navy/60 font-normal text-sm leading-relaxed mb-6">
              Resolving critical issues with the IRS regarding unpaid payroll taxes to keep your business running.
            </p>
          </div>

          <div className="bg-brand-navy p-10 flex flex-col justify-center text-center">
             <h3 className="font-serif text-2xl text-white mb-4">Innocent Spouse Relief</h3>
             <p className="font-sans text-white/60 font-normal text-sm leading-relaxed mb-8">
               You shouldn't be penalized for your spouse's tax mistakes. We can help you find relief.
             </p>
             <Link to="/contact" className="inline-block px-8 py-3 border border-brand-gold text-brand-gold text-xs tracking-widest uppercase hover:bg-brand-gold hover:text-brand-navy transition-colors">
               Get Help Now
             </Link>
          </div>

        </div>

        {/* Detailed Content & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-brand-navy/10 pt-20">
          <div>
            <h2 className="font-serif text-4xl text-brand-navy mb-8">End the Misery</h2>
            <p className="font-sans text-brand-navy/60 font-normal leading-relaxed mb-6">
              Tax problems don't go away on their own; they only get worse with time. Penalties accumulate, and the IRS becomes more aggressive.
            </p>
            <p className="font-sans text-brand-navy/60 font-normal leading-relaxed mb-8">
              Meir and Meir, LLP specializes in navigating the complex maze of tax regulations. We act as your shield and your advocate. Once you hire us, <strong>you never have to talk to the IRS again.</strong> We handle all calls, meetings, and negotiations on your behalf.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4 text-brand-navy font-serif text-lg">
                <span className="w-8 h-px bg-brand-gold"></span> 35+ Years of Experience
              </li>
              <li className="flex items-center gap-4 text-brand-navy font-serif text-lg">
                <span className="w-8 h-px bg-brand-gold"></span> Extremely Discreet Service
              </li>
              <li className="flex items-center gap-4 text-brand-navy font-serif text-lg">
                <span className="w-8 h-px bg-brand-gold"></span> Proven Negotiation Success
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-navy/5 transform rotate-3"></div>
            <div className="relative bg-white p-8 md:p-12 shadow-xl">
              <h3 className="font-serif text-2xl text-brand-navy mb-2">Confidential Consultation</h3>
              <p className="font-sans text-brand-navy/40 text-xs tracking-widest uppercase mb-8">No Obligation • Strictly Private</p>
              <PlaceholderForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaxProblems;
