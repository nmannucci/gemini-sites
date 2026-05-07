import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4 font-geist">404</h1>
        <p className="text-2xl font-semibold text-neutral-900 mb-2 font-geist">Page Not Found</p>
        <p className="text-neutral-600 mb-8 font-geist">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-3 font-semibold transition-all duration-300 font-geist">
            Return Home
          </Link>
          <Link to="/contact" className="border border-neutral-200 bg-white/60 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded-full px-8 py-4 font-medium transition-all duration-300 font-geist">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
