import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Edit, Trash2 } from 'lucide-react'

export default function ReviewCard({ review, onEdit, onDelete }) {
  const renderStars = (rating) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )

  return (
    <Card className="p-0 transition-all duration-300 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl">
      <CardHeader className="text-white bg-primary rounded-t-2xl">
        <CardTitle className="pt-2 text-lg">{review.product_name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-6 space-y-4">
        <div className="flex items-center justify-between">
          {renderStars(review.rating)}
          <span className="text-sm text-lighter">
            {new Date(review.updated_at || review.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-content">
          {review.review_text}
        </p>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200/50">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg hover:bg-primary/10"
            onClick={() => onEdit(review)}
          >
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="rounded-lg"
            onClick={() => onDelete(review.review_id)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

