import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function AddToCartModal({
  open,
  setOpen,
  product,
  quantity,
  setQuantity,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogDescription>{product.name}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Image and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-primary text-lg font-semibold">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-muted-foreground text-sm">
                {product.stock_quantity > 0
                  ? `${product.stock_quantity} available`
                  : 'Out of stock'}
              </p>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock_quantity}
                value={quantity}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === '') {
                    setQuantity('');
                  } else {
                    const numValue = parseInt(value) || 1;
                    setQuantity(Math.min(numValue, product.stock_quantity));
                  }
                }}
                onBlur={() => {
                  if (!quantity || quantity < 1) {
                    setQuantity(1);
                  }
                }}
                className="w-20"
              />
              <div className="flex-1 text-right">
                <p className="text-muted-foreground text-sm">
                  Subtotal:{' '}
                  <span className="text-foreground font-medium">
                    ${(parseFloat(product.price) * (quantity || 0)).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={onConfirm}
            disabled={quantity < 1 || quantity > product.stock_quantity}
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
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  setQuantity: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddToCartModal;
