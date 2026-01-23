import { Star, Quote } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: 'Michael R.',
    role: 'Dispensary Owner, Los Angeles',
    content: "Green Plus CPA transformed our financial operations. Sevana's expertise in cannabis tax law saved us over $50,000 in our first year. Their understanding of 280E is unmatched.",
    rating: 5,
  },
  {
    name: 'Sarah T.',
    role: 'Cultivation Facility, Humboldt County',
    content: "Finally, a CPA who actually understands the cannabis industry. They helped us restructure our operations to minimize tax burden while staying fully compliant. Highly recommend!",
    rating: 5,
  },
  {
    name: 'David L.',
    role: 'Cannabis Delivery Service, San Diego',
    content: "Professional, knowledgeable, and responsive. Green Plus CPA handled our IRS audit with expertise and got us the best possible outcome. They're worth every penny.",
    rating: 5,
  },
];

const ReviewsWidget = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Client Testimonials
          </span>
          <h2 className="font-geist font-semibold text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
            Trusted by Cannabis Businesses Across California
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            See why cannabis business owners choose Green Plus CPA for their tax and accounting needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group bg-stone-50 rounded-2xl p-8 border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-100" />

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6 relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="font-geist font-semibold text-emerald-700">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{review.name}</p>
                  <p className="text-sm text-neutral-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-500 text-sm">
            Google Reviews widget will be integrated here post-build
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsWidget;
