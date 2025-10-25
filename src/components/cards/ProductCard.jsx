import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ShoppingCart } from 'lucide-react';
import AddToCartModal from '../modals/AddToCartModal';
import { useAddToCart } from '@/hooks/useAddToCart';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { open, setOpen, quantity, setQuantity, handleAdd, handleAddToCart } = useAddToCart();

  return (
    <>
      <Card
        className="group hover:ring-primary flex cursor-pointer flex-col p-4 transition-transform sm:hover:scale-[1.02] sm:hover:ring-2"
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
      >
        <div className="mb-4 flex w-full items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-42 w-full object-contain duration-200"
          />
        </div>

        {/* 📄 Product details below */}
        <div className="flex flex-1 flex-col justify-between text-left">
          <div>
            <h3 className="font-heading text-content line-clamp-1 text-lg font-bold">{product.name}</h3>
            <p className="text-lighter mb-2 line-clamp-2 text-xs">{product.description}</p>

            <div className="mb-2 flex items-center">
              <p className="text-xs font-medium text-gray-700">Net Wt. 150 ml/5 oz</p>
            </div>

            <div className="flex flex-row justify-between text-sm">
              <p className="text-emerald-500">Stock: {product.stock_quantity - product.reserved_quantity}</p>
              <p className="text-sky-600">Reserved: {product.reserved_quantity}</p>
            </div>

            <p className="font-heading text-primary pt-2 text-lg font-bold">
              ₱ {parseFloat(product?.price).toFixed(2)}
            </p>
          </div>

          <div className="mt-4">
            <Button
              className="flex w-full items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
            >
              <ShoppingCart className="size-4" />
              <span className="font-heading text-sm">Add to Cart</span>
            </Button>
          </div>
        </div>
      </Card>

      {open && (
        <AddToCartModal
          open={open}
          setOpen={setOpen}
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onConfirm={() => handleAddToCart(product, quantity)}
        />
      )}
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
