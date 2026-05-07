import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface PlaceholderFormProps {
  variant?: 'light' | 'dark';
}

const PlaceholderForm = ({ variant = 'light' }: PlaceholderFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted - integrate with LeadConnector', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className={`text-center py-12 ${variant === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-geist font-semibold text-2xl mb-2">Thank You!</h3>
        <p className={variant === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>
          We've received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClasses = variant === 'dark'
    ? 'w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder-neutral-400 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all'
    : 'w-full px-4 py-3 rounded-lg border border-neutral-200/80 bg-white/50 text-neutral-900 placeholder-neutral-400 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all backdrop-blur-sm';

  const labelClasses = variant === 'dark'
    ? 'block text-sm font-medium text-neutral-300 mb-2'
    : 'block text-sm font-medium text-neutral-700 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="businessType" className={labelClasses}>
            Business Type
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select your business type</option>
            <option value="dispensary">Dispensary</option>
            <option value="cultivator">Cultivator</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="distributor">Distributor</option>
            <option value="delivery">Delivery Service</option>
            <option value="other">Other Cannabis Business</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          How Can We Help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business and how we can assist you..."
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
      >
        <Send className="w-5 h-5" />
        Request Free Consultation
      </button>

      <p className={`text-xs text-center ${variant === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
        By submitting this form, you agree to be contacted regarding our services.
      </p>
    </form>
  );
};

export default PlaceholderForm;
