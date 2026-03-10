import React from 'react';

const PlaceholderForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! This is a demo form.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-sans uppercase tracking-widest text-brand-navy/60">First Name</label>
          <input type="text" className="w-full bg-transparent border-b border-brand-navy/20 py-2 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors font-serif text-lg" required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-sans uppercase tracking-widest text-brand-navy/60">Last Name</label>
          <input type="text" className="w-full bg-transparent border-b border-brand-navy/20 py-2 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors font-serif text-lg" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-sans uppercase tracking-widest text-brand-navy/60">Email Address</label>
        <input type="email" className="w-full bg-transparent border-b border-brand-navy/20 py-2 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors font-serif text-lg" required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-sans uppercase tracking-widest text-brand-navy/60">Message</label>
        <textarea rows={3} className="w-full bg-transparent border-b border-brand-navy/20 py-2 text-brand-navy focus:outline-none focus:border-brand-gold transition-colors font-serif text-lg resize-none"></textarea>
      </div>

      <button type="submit" className="px-8 py-4 bg-brand-navy text-white text-xs tracking-[0.2em] uppercase hover:bg-brand-gold transition-colors duration-300 w-full md:w-auto">
        Send Message
      </button>
    </form>
  );
};

export default PlaceholderForm;
