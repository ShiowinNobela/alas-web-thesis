import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EmptyReviewState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <MessageSquare className="w-16 h-16 mb-4 text-muted-foreground" />
      <h2 className="mb-2 text-2xl font-bold text-content">No Reviews Yet</h2>
      <p className="max-w-sm mb-4 text-center text-muted-foreground">
        You haven't shared your thoughts yet. Your spicy story starts here!
      </p>
      <Button>Browse Products</Button>
    </div>
  )
}
