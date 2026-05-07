import { Star } from 'lucide-react';

const ReviewsWidget = () => {
  const reviews = [
    {
      id: 1,
      author: "Robert Chen",
      rating: 5,
      text: "Mannucci Associates handled our business incorporation with incredible attention to detail. Their advice on liability protection was invaluable.",
      date: "2 months ago"
    },
    {
      id: 2,
      author: "Sarah Jenkins",
      rating: 5,
      text: "Professional, knowledgeable, and responsive. They made the estate planning process simple and stress-free for my family.",
      date: "1 month ago"
    },
    {
      id: 3,
      author: "Michael Ross",
      rating: 5,
      text: "The best legal team in Pasadena. I've worked with them for over 5 years on various commercial contracts and they never miss a beat.",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">"{review.text}"</p>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-700 font-bold text-xs ring-2 ring-white">
                {review.author[0]}
             </div>
             <div>
               <div className="font-semibold text-neutral-900 text-sm">{review.author}</div>
               <div className="text-xs text-neutral-400">{review.date}</div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsWidget;
