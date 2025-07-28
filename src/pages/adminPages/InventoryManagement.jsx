import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { HiOutlinePencil } from 'react-icons/hi';
import { MdToggleOn, MdToggleOff, MdErrorOutline } from 'react-icons/md';
import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react';

const tableHeadStyle = 'px-6 py-3 text-center';

function InventoryManagement() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/products/admin', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => res.data),
  });

  const totalProducts = data.length;
  const totalStock = data.reduce((sum, item) => sum + item.stock_quantity, 0);

  const queryClient = useQueryClient();

  const toggleProductStatus = useMutation({
    mutationFn: ({ id, newStatus }) => {
      console.log('Toggling product status:', { id, newStatus });
      console.log('Using token:', user?.token ? 'Token present' : 'No token found');
      
      return axios.patch(`/api/products/toggle-status/${id}`, 
        {
          is_active: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      console.log('Product status toggle successful:', response.data);
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error('Toggle error:', error.response?.data || error.message);
      console.error('Full error details:', error);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    restock_quantity: 0,
    price: 0,
  });

  function openEditModal(product) {
    setEditingProduct(product);
    setFormData({
      restock_quantity: null,
      price: product.price,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Mutation for updating stock and price
  const updateStockPrice = useMutation({
    mutationFn: ({ id, restock_quantity, price }) => {
      console.log('Updating stock/price for product:', id);
      console.log('New values:', { restock_quantity, price });
      console.log('Using token:', user?.token ? 'Token present' : 'No token found');
      
      return axios.patch(`/api/products/stock-price/${id}`, 
        {
          restock_quantity: Number(restock_quantity),
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      console.log('Stock/price update successful:', response.data);
      queryClient.invalidateQueries(['products']);
      closeModal();
    },
    onError: (error) => {
      console.error('Stock/price update failed:', error);
      console.error('Error response:', error.response?.data);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    updateStockPrice.mutate({
      id: editingProduct.id,
      restock_quantity: formData.restock_quantity,
      price: formData.price,
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <>
      <div className="flex h-full flex-col overflow-x-auto bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-8">
          <div className="relative overflow-hidden bg-white shadow-xl sm:rounded-lg">
            {/* Summary Section */}
            <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex flex-1 items-center space-x-4">
                <h5>
                  <span className="text-gray-500">Total Products:</span>{' '}
                  <span className="font-semibold text-gray-700">
                    {totalProducts}
                  </span>
                </h5>
                <h5>
                  <span className="text-gray-500">Total Stock:</span>{' '}
                  <span className="font-semibold text-gray-700">
                    {totalStock}
                  </span>
                </h5>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-admin sticky top-0 z-10 text-xs text-white uppercase">
                  <tr>
                    <th className={tableHeadStyle}>ID</th>
                    <th className={tableHeadStyle}>Name</th>
                    <th className={tableHeadStyle}>Category</th>
                    <th className={tableHeadStyle}>Stock</th>
                    <th className={tableHeadStyle}>Price</th>
                    <th className={tableHeadStyle}>Active</th>
                    <th className={tableHeadStyle}>Last Update</th>
                    <th className={tableHeadStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr
                      key={d.id}
                      className="border-b text-center hover:bg-gray-100"
                    >
                      <td className="px-6 py-2">{d.id}</td>
                      <td className="px-6 py-2">{d.name}</td>
                      <td className="px-6 py-2">{d.category}</td>

                      <td className="px-6 py-2">
                        {d.stock_quantity <= 10 ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                            {d.stock_quantity}
                            <MdErrorOutline
                              className="text-red-500"
                              title="Low stock"
                            />
                          </span>
                        ) : (
                          d.stock_quantity
                        )}
                      </td>

                      <td className="px-6 py-2">
                        ₱{parseFloat(d.price).toFixed(2)}
                      </td>
                      <td className="min-w-[110px] px-6 py-2">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-medium ${
                            d.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {d.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-2">
                        {new Date(d.updated_at).toLocaleString()}
                      </td>
                      <td className="flex items-center justify-center gap-2 px-6 py-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => openEditModal(d)}
                        >
                          <HiOutlinePencil size={18} />
                        </button>
                        <button
                          onClick={() =>
                            toggleProductStatus.mutate({
                              id: d.id,
                              newStatus: !d.is_active,
                            })
                          }
                          className="text-gray-600 hover:text-gray-800"
                          title="Toggle Active"
                          disabled={toggleProductStatus.isLoading}
                        >
                          {d.is_active ? (
                            <MdToggleOn size={24} className="text-green-500" />
                          ) : (
                            <MdToggleOff size={24} className="text-red-500" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} size="md" onClose={closeModal}>
        <ModalHeader>Edit Stock & Price</ModalHeader>
        <ModalBody>
          <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="retock_quantity"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Restock Amount
              </label>
              <input
                type="number"
                id="restock_quantity"
                name="restock_quantity"
                value={formData.restock_quantity}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            form="editForm"
            disabled={updateStockPrice.isLoading}
          >
            {updateStockPrice.isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default InventoryManagement;
