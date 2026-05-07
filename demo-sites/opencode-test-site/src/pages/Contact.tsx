import { Phone, Mail, MapPin } from 'lucide-react'
import PlaceholderForm from '../components/PlaceholderForm'

export default function Contact() {
  return (
    <main className="pt-20 min-h-screen">
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight font-geist">Contact Us</h1>
            <p className="text-xl text-neutral-600 font-geist leading-relaxed">
              Ready to take control of your accounting and tax needs? Get in touch with us today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-geist">Send Us a Message</h2>
              <PlaceholderForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-geist">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2 font-geist">Phone</h3>
                      <div className="space-y-1">
                        <div>
                          <p className="text-xs text-neutral-500 font-geist">Canoga Park</p>
                          <a href="tel:3104351759" className="text-blue-600 hover:text-blue-700 font-geist">(310) 435-1759</a>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 font-geist">Beverly Hills</p>
                          <a href="tel:3102747541" className="text-blue-600 hover:text-blue-700 font-geist">(310) 274-7541</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2 font-geist">Email</h3>
                      <a href="mailto:Info@meirandmeir.com" className="text-blue-600 hover:text-blue-700 font-geist">Info@meirandmeir.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-4 font-geist">Office Locations</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 mb-1 font-geist">Canoga Park Office</p>
                          <p className="text-sm text-neutral-600 font-geist">
                            21201 Victory Blvd Suite #145<br />
                            Canoga Park, CA 91303
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 mb-1 font-geist">Beverly Hills Office</p>
                          <p className="text-sm text-neutral-600 font-geist">
                            139 South Beverly Drive Suite 204<br />
                            Beverly Hills, CA 90212
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-neutral-900 mb-2 font-geist">Office Hours</h3>
                <p className="text-sm text-neutral-600 font-geist">Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
