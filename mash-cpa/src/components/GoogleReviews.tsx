import { Star } from 'lucide-react';

export default function GoogleReviews() {
  const reviews = [
    {
      name: "Local Business Owner",
      text: "MashCPA has been instrumental in helping our business grow. Their strategic advice and attention to detail are unmatched.",
      rating: 5
    },
    {
      name: "Tax Client",
      text: "Denis is a true professional. He made the tax filing process stress-free and found deductions I didn't know about.",
      rating: 5
    },
    {
      name: "Startup Founder",
      text: "The formation services were excellent. They guided me through every step of setting up my LLC.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h3>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-sm border border-gray-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
              <p className="font-bold text-navy-900">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}