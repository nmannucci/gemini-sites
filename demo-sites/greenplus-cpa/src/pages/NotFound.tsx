import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-stone-100">
      <div className="text-center px-6">
        <p className="text-8xl font-geist font-bold text-emerald-600 mb-4">404</p>
        <h1 className="font-geist font-semibold text-3xl text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
