import { useState } from 'react'

export default function PlaceholderForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Form integration pending.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-xs font-semibold text-neutral-700 ml-1 block mb-1 font-geist">Name</label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-neutral-200/80 bg-white/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm font-geist"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-semibold text-neutral-700 ml-1 block mb-1 font-geist">Email</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-neutral-200/80 bg-white/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm font-geist"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="text-xs font-semibold text-neutral-700 ml-1 block mb-1 font-geist">Phone</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-neutral-200/80 bg-white/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm font-geist"
          placeholder="(310) 555-1234"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-semibold text-neutral-700 ml-1 block mb-1 font-geist">Message</label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-neutral-200/80 bg-white/50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm font-geist resize-none"
          placeholder="How can we help you?"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 group font-geist"
      >
        Send Message
      </button>
    </form>
  )
}
