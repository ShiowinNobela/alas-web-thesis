import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Flame, ShoppingCart } from 'lucide-react';
import AddToCartModal from '../modals/AddToCartModal';
import { useAddToCart } from '@/hooks/useAddToCart';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { open, setOpen, quantity, setQuantity, handleAdd, handleAddToCart } = useAddToCart();

  return (
    <>
      <Card className="group z-10 flex flex-col gap-2 p-5 shadow-md transition-transform hover:scale-[1.02] hover:ring-2 hover:ring-amber-500">
        <div className="relative mb-3 overflow-hidden rounded-md">
          <span className="text-content absolute top-0 left-0 z-10 rounded-full bg-gray-200 px-2 py-1 text-xs font-bold">
            {product.category || 'Category'}
          </span>

          <span className="text-content absolute top-0 right-0 z-10 rounded-full bg-gray-100 px-2 py-1 text-xs font-bold">
            {product.rating || '4.5'} <span className="text-yellow-500">★</span>
          </span>

          {/* Product Image */}
          <div className="relative flex h-35 w-full items-center justify-center overflow-hidden rounded-md bg-white pt-2">
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-red-200/15 via-orange-200/15 to-yellow-200/15 mix-blend-multiply transition-opacity"></div>

            <img
              src={product.image}
              alt={product.name}
              className="relative z-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-4"
            />
          </div>
        </div>

        {/* Product Info - Left Aligned */}
        <div className="text-content flex-1 text-left">
          <h3 className="font-heading mb-1 line-clamp-1 tracking-wide">{product.name}</h3>
          <p className="text-lighter mb-2 line-clamp-2 min-h-[2rem] text-sm">{product.description}</p>
          {/* Hotness Rating (static for now) */}
          <div className="mb-4 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                <Flame className="text-primary size-5" />
              </span>
            ))}
            <p className="ml-2 flex justify-center text-sm italic">Extreme</p>
          </div>
          <p className="mb-1 text-sm text-green-600">Stock: {product.stock_quantity}</p>
        </div>

        <Button
          variant="outline"
          className="mt-2 w-full text-xs"
          onClick={() => navigate(`/ProductDetailsPage/${product.id}`)}
        >
          View Details
        </Button>

        {/* Price and Add to Cart - Bottom Row */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold">₱ {parseFloat(product.price).toFixed(2)}</p>
          <Button className="flex items-center justify-center gap-2" onClick={handleAdd}>
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </Card>

      <AddToCartModal
        open={open}
        setOpen={setOpen}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        onConfirm={() => handleAddToCart(product, quantity)}
      />
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    stock_quantity: PropTypes.number.isRequired,
    category: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProductCard;
