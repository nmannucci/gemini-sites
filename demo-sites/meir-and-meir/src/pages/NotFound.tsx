import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-neutral-100 font-geist">404</h1>
        <div className="relative -mt-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20">
            Return to Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
