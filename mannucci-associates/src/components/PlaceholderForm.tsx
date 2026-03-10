import React from 'react';

const PlaceholderForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted - integrate with LeadConnector');
    alert('Thank you! This is a placeholder form. Integration pending.');
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-neutral-200/80 bg-white/50 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm outline-none placeholder:text-neutral-400 font-inter";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            required
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">How can we help?</label>
        <textarea
          id="message"
          placeholder="How can we help you?"
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 font-geist"
      >
        Request Free Consultation
      </button>
    </form>
  );
};

export default PlaceholderForm;
