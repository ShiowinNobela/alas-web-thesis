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
      <Card
        className="group z-10 flex flex-col gap-2 rounded-sm p-4 shadow-md transition-transform hover:ring-amber-500 sm:rounded-xl sm:hover:scale-[1.02] sm:hover:ring-2"
        onClick={() => {
          navigate(`/ProductDetailsPage/${product.id}`);
        }}
      >
        <div className="relative mb-3 overflow-hidden rounded-md">
          {/* Product Image */}
          <div className="relative flex h-42 w-full items-center justify-center overflow-hidden rounded-md bg-white pt-2">
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-red-200/12 via-orange-200/12 to-yellow-200/12 mix-blend-multiply transition-opacity"></div>

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
          <div className="mb-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                <Flame className="text-primary size-3" />
              </span>
            ))}
            <p className="ml-2 flex justify-center text-xs">Extreme</p>
          </div>
          <p className="text-sm text-green-600">Stock: {product.stock_quantity}</p>
          <p className="text-sm text-sky-600">Reserved: {product.reserved_quantity}</p>
        </div>

        <div className="hidden sm:block">
          <Button
            variant="outline"
            className="mt-2 w-full text-xs"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ProductDetailsPage/${product.id}`);
            }}
          >
            View Details
          </Button>

          <div className="font-heading mt-4 flex items-center justify-between">
            <p className="text-sm font-semibold">₱ {parseFloat(product.price).toFixed(2)}</p>
            <Button
              className="flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
            >
              <ShoppingCart className="size-4" />
              <span className="font-heading text-sm tracking-wide">Add to Cart</span>
            </Button>
          </div>
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
    reserved_quantity: PropTypes.number.isRequired,
    category: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProductCard;
