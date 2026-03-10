
import { useEffect } from 'react';

export default function GoogleReviews() {
  useEffect(() => {
    const scriptId = 'review-widget-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://page.intromartialarts.com/reputation/assets/review-widget.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">What Our Clients Say</h3>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>
        
        <div className="w-full">
          <iframe 
            className="lc_reviews_widget" 
            src="https://page.intromartialarts.com/reputation/widgets/review_widget/bmB2HGbfaWFdd07zoGeg" 
            frameBorder="0" 
            scrolling="no" 
            style={{ minWidth: '100%', width: '100%' }}
            title="Google Reviews"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
