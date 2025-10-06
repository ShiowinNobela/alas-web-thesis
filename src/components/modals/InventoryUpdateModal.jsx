import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, Button, Spinner, Label, TextInput } from 'flowbite-react';

function InventoryUpdateModal({ isOpen, product, onClose, updateStockPrice }) {
  const [formData, setFormData] = useState({ restock_quantity: 0, price: 0 });

  useEffect(() => {
    if (product) {
      setFormData({
        restock_quantity: 0,
        price: parseFloat(product.price) || 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'restock_quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStockPrice.mutate(
      {
        id: product.id,
        restock_quantity: formData.restock_quantity,
        price: formData.price,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <ModalBody>
        {product && (
          <div className="mb-6 flex gap-4">
            {/* Left: Image */}
            <img src={product.image} alt={product.name} className="h-28 w-28 rounded-2xl object-cover shadow-md" />

            {/* Right: Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Current Stock:</span> {product.stock_quantity}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reserved:</span> {product.reserved_quantity}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Available:</span> {product.stock_quantity - product.reserved_quantity}
              </p>
            </div>
          </div>
        )}

        <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="restock_quantity">Restock Amount</Label>
            <TextInput
              id="restock_quantity"
              type="number"
              name="restock_quantity"
              min="0"
              value={formData.restock_quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price (₱)</Label>
            <TextInput
              id="price"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </ModalBody>

      <ModalFooter className="justify-end">
        <Button color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" form="editForm" disabled={updateStockPrice?.isLoading}>
          {updateStockPrice?.isLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

InventoryUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    stock_quantity: PropTypes.number.isRequired,
    reserved_quantity: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  updateStockPrice: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }).isRequired,
};

export default InventoryUpdateModal;
