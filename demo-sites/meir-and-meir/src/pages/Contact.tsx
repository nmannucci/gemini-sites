import { MapPin, Mail, Clock } from 'lucide-react';
import PlaceholderForm from '../components/PlaceholderForm';

const Contact = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold font-geist text-neutral-900 mb-6">Contact Us</h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Ready to solve your tax problems or plan for your financial future? Reach out to us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold font-geist text-neutral-900 mb-8">Get in Touch</h2>
            
            <div className="space-y-8">
              {/* Canoga Park */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Canoga Park Office</h3>
                  <p className="text-neutral-600 mb-2">21201 Victory Blvd Suite #145<br />Canoga Park, CA 91303</p>
                   <a href="tel:+13104351759" className="text-blue-600 font-medium hover:underline block mb-1">(310) 435-1759</a>
                </div>
              </div>

               {/* Beverly Hills */}
               <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Beverly Hills Office</h3>
                  <p className="text-neutral-600 mb-2">139 South Beverly Drive Suite 204<br />Beverly Hills, CA 90212</p>
                   <a href="tel:+13102747541" className="text-blue-600 font-medium hover:underline block mb-1">(310) 274-7541</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-neutral-600 mb-2">For general inquiries and information.</p>
                  <a href="mailto:Info@meirandmeir.com" className="text-blue-600 font-medium hover:underline">Info@meirandmeir.com</a>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-stone-50 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <h3 className="font-bold text-neutral-900">Business Hours</h3>
                </div>
                <p className="text-neutral-600 text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday - Sunday: Closed<br />
                    <span className="text-neutral-400 italic mt-2 block">Extended hours available during tax season.</span>
                </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-neutral-100">
            <h2 className="text-2xl font-bold font-geist text-neutral-900 mb-2">Send us a Message</h2>
            <p className="text-neutral-500 mb-8 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
            <PlaceholderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
