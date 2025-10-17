import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function WishlistCard({ item, onRemove }) {
  const navigate = useNavigate()

  return (
    <Card className="flex flex-col h-full p-0 transition-all duration-300 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl">
      <CardHeader className="text-white bg-pink-500 rounded-t-2xl">
        <CardTitle className="pt-2 text-lg">{item.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 pb-6 space-y-4">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-48 rounded-lg"
        />
        <p className="flex-1 text-sm text-content">{item.description}</p>
        <p className="text-sm font-semibold text-content">₱{item.price}</p>

        <div className="flex justify-between gap-2 pt-4 border-t border-gray-200/50">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => navigate(`/product/${item.product_id}`)}
          >
            <Eye className="w-4 h-4 mr-1" /> View Product
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="rounded-lg"
            onClick={() => onRemove(item.product_id)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
