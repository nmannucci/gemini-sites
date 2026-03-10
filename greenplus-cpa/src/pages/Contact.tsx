import { MapPin, Phone, Mail, Clock, Leaf } from 'lucide-react';
import PlaceholderForm from '../components/PlaceholderForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(818) 644-2550',
      href: 'tel:+18186442550',
      description: 'Call us during business hours',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'sevana.janian@greenpluscpa.com',
      href: 'mailto:sevana.janian@greenpluscpa.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: '301 N Lake Ave Suite 600',
      value2: 'Pasadena, CA 91101',
      href: 'https://maps.google.com/?q=301+N+Lake+Ave+Suite+600+Pasadena+CA+91101',
      description: 'Visit our Pasadena office',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Monday - Friday',
      value2: '9:00 AM - 5:00 PM',
      description: 'PST Time Zone',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#0B1120] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-300 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Get In Touch
          </span>
          <h1 className="font-geist font-semibold text-4xl md:text-5xl text-white tracking-tighter mb-6">
            Let's Discuss Your Cannabis Business
          </h1>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
            Schedule your free consultation and discover how we can help reduce your tax burden
            and streamline your financial operations.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-geist font-semibold text-2xl text-neutral-900 mb-2">
                Request a Free Consultation
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <div className="bg-stone-50 rounded-2xl p-8 border border-neutral-200">
                <PlaceholderForm />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-geist font-semibold text-2xl text-neutral-900 mb-2">
                Contact Information
              </h2>
              <p className="text-neutral-600 mb-8">
                Prefer to reach out directly? Use any of the methods below.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-neutral-200"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-geist font-semibold text-neutral-900">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('https') ? '_blank' : undefined}
                          rel={info.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-neutral-700">{info.value}</p>
                      )}
                      {info.value2 && <p className="text-neutral-700">{info.value2}</p>}
                      <p className="text-sm text-neutral-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5456!2d-118.1445!3d34.1478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c35f!2s301%20N%20Lake%20Ave%20%23600%2C%20Pasadena%2C%20CA%2091101!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Green Plus CPA Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-geist font-semibold text-neutral-900 mb-2">Quick Response</h3>
              <p className="text-neutral-600">We respond to all inquiries within 24 business hours.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-geist font-semibold text-neutral-900 mb-2">Free Consultation</h3>
              <p className="text-neutral-600">Your initial consultation is always complimentary.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-geist font-semibold text-neutral-900 mb-2">Virtual Meetings</h3>
              <p className="text-neutral-600">Can't visit us? We offer secure video consultations statewide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
