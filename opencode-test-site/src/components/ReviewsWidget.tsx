import { Star } from 'lucide-react'

export default function ReviewsWidget() {
  return (
    <div className="bg-gray-100 p-8 rounded-2xl text-center">
      <div className="flex justify-center gap-1 mb-4">
        <Star className="fill-blue-500 text-blue-500" size={20} />
        <Star className="fill-blue-500 text-blue-500" size={20} />
        <Star className="fill-blue-500 text-blue-500" size={20} />
        <Star className="fill-blue-500 text-blue-500" size={20} />
        <Star className="fill-blue-500 text-blue-500" size={20} />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2 font-geist">Client Reviews</h3>
      <p className="text-neutral-500 text-sm font-geist mb-4">See what our clients say about us</p>
      <p className="text-xs text-neutral-400 font-geist">Google Reviews integration coming soon</p>
    </div>
  )
}
