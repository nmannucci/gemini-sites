import { useState } from 'react';

const PlaceholderForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend or CRM
    console.log("Form submitted");
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2 font-geist">Thank You!</h3>
        <p className="text-green-600">Your message has been received. We will be in touch shortly.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-green-700 underline hover:text-green-800">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Name</label>
          <input type="text" id="name" required className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Phone</label>
          <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" placeholder="(555) 123-4567" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Email</label>
        <input type="email" id="email" required className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Message</label>
        <textarea id="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm" placeholder="How can we help you?"></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99]">
        Send Message
      </button>
      <p className="text-xs text-center text-neutral-400 mt-4">
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  );
};

export default PlaceholderForm;
