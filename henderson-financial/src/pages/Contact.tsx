import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <div className="font-sans text-gray-800 bg-slate-50 pt-20">
      <div className="bg-navy-900 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300">We're here to help you with your financial needs.</p>
      </div>
      <ContactSection />
    </div>
  );
}
