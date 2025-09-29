import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cartStore';

function AddToCartModal({ open, setOpen, product, quantity, setQuantity, onConfirm }) {
  const { items } = useCartStore();

  const existingItem = items.find((i) => i.product_id === product.id);
  const alreadyInCart = existingItem ? existingItem.quantity : 0;

  const maxAddable = Math.max(product.stock_quantity - product.reserved_quantity - alreadyInCart, 0);

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      setQuantity('');
    } else {
      const numValue = parseInt(value, 10) || 1;
      setQuantity(Math.min(numValue, maxAddable));
    }
  };

  const handleBlur = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogDescription>{product.name}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Image and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="size-30 flex-shrink-0 overflow-hidden rounded-md border">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-primary text-lg font-semibold">₱{parseFloat(product.price).toFixed(2)}</p>
              <p className="text-muted-foreground text-sm">
                {product.stock_quantity - product.reserved_quantity > 0
                  ? `${product.stock_quantity - product.reserved_quantity} available`
                  : 'Out of stock'}
              </p>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity to Add
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="quantity"
                type="number"
                min="1"
                max={maxAddable}
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-20"
              />
              <div className="flex-1 text-right">
                <p className="text-muted-foreground text-sm">
                  {product.stock_quantity - product.reserved_quantity > 0
                    ? `${product.stock_quantity - product.reserved_quantity} available`
                    : 'Out of stock'}
                </p>

                {alreadyInCart > 0 && (
                  <p className="text-primary text-sm">You already have {alreadyInCart} in your cart</p>
                )}

                {alreadyInCart > 0 && (
                  <p className="text-muted-foreground text-sm">
                    {maxAddable > 0 ? `${maxAddable} more can be added` : 'No more can be added'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={onConfirm}
            disabled={quantity < 1 || quantity > maxAddable}
            className="mt-4 w-full"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

AddToCartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setQuantity: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddToCartModal;
