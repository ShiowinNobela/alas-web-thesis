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
        className="group flex flex-row gap-4 rounded-lg p-4 shadow-md transition-transform hover:ring-amber-500 sm:hover:scale-[1.02] sm:hover:ring-2"
        onClick={() => {
          navigate(`/ProductDetailsPage/${product.id}`);
        }}
      >
        <div className="relative flex w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-red-200/10 via-orange-200/10 to-yellow-200/10 mix-blend-multiply"></div>
        </div>

        <div className="flex flex-1 flex-col justify-between text-left">
          <div>
            <h3 className="font-heading mb-1 line-clamp-1 text-lg font-semibold tracking-wide">{product.name}</h3>
            <p className="text-lighter mb-2 line-clamp-2 text-sm">{product.description}</p>

            <div className="mb-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Flame key={i} className="text-primary size-3" />
              ))}
              <p className="ml-2 text-xs">Extreme</p>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <p className="text-sm text-green-600">Stock: {product.stock_quantity - product.reserved_quantity}</p>
            <p className="text-sm text-sky-600">Reserved: {product.reserved_quantity}</p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="font-heading text-base font-semibold text-green-700">
              ₱ {parseFloat(product.price).toFixed(2)}
            </p>
            <Button
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
            >
              <ShoppingCart className="size-4" />
              <span className="font-heading text-sm">Add</span>
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
