
import { Phone, Mail, MapPin } from 'lucide-react';
import LeadConnectorForm from './LeadConnectorForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">Let's Discuss Your Financial Future</h3>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-slate-50 p-10 rounded-sm border border-gray-100">
              <h4 className="text-2xl font-serif font-bold text-navy-900 mb-8">Contact Information</h4>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center shadow-sm text-gold-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <p className="font-bold text-navy-900 mb-1">Our Office</p>
                    <p className="text-gray-600">260 S. Los Robles Suite 318<br />Pasadena, CA 91101</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center shadow-sm text-gold-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <p className="font-bold text-navy-900 mb-1">Phone</p>
                    <p className="text-gray-600">626-744-9450</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center shadow-sm text-gold-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="ml-6">
                    <p className="font-bold text-navy-900 mb-1">Email</p>
                    <p className="text-gray-600">contactus@hfsol.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <LeadConnectorForm />
          </div>
        </div>
      </section>
  );
}
