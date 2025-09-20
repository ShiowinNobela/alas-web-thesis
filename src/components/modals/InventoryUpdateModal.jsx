import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'flowbite-react';

function InventoryUpdateModal({ isOpen, product, onClose, updateStockPrice }) {
  // 🔹 Local state instead of receiving formData from parent
  const [formData, setFormData] = useState({ restock_quantity: 0, price: 0 });

  // 🔹 Reset form whenever modal opens with a new product
  useEffect(() => {
    if (product) {
      setFormData({ restock_quantity: 0, price: product.price });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStockPrice.mutate({ id: product.id, ...formData }, { onSuccess: onClose });
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <ModalHeader>Edit {product?.name}</ModalHeader>
      <ModalBody>
        <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="restock_quantity" className="mb-2 block text-sm font-medium text-gray-700">
              Restock Amount
            </label>
            <input
              id="restock_quantity"
              type="number"
              name="restock_quantity"
              value={formData.restock_quantity}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" form="editForm" disabled={updateStockPrice.isLoading}>
          {updateStockPrice.isLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default InventoryUpdateModal;
