import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch,
} from 'flowbite-react';
import {
  Edit,
  PackagePlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import SummaryCard from '@/components/bigComponents/SummaryCard';

const fetchProducts = async () => {
  const res = await axios.get('/api/products/admin');
  return res.data;
};

function InventoryManagement() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const queryClient = useQueryClient();

  // Summary calculations
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, item) => sum + item.stock_quantity,
    0
  );
  const lowStockItems = products.filter(
    (item) => item.stock_quantity <= 10
  ).length;

  // Toggle product status
  const toggleProductStatus = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axios.patch(`/api/products/toggle-status/${id}`, {
        is_active: newStatus,
      }),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ restock_quantity: 0, price: 0 });

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      restock_quantity: 0,
      price: product.price,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update stock and price
  const updateStockPrice = useMutation({
    mutationFn: ({ id, restock_quantity, price }) =>
      axios.patch(`/api/products/stock-price/${id}`, {
        restock_quantity: Number(restock_quantity),
        price: Number(price),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      closeModal();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStockPrice.mutate({
      id: editingProduct.id,
      ...formData,
    });
  };

  return (
    <div className="bg-admin flex flex-col overflow-x-auto p-4">
      <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border shadow ring-1">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <SummaryCard
            iconKey="lowStock"
            iconColor="text-yellow-500"
            title="Low Stock Items"
            value={lowStockItems}
          />
          <SummaryCard
            iconKey="packageBlue"
            iconColor="text-blue-500"
            title="Total Products"
            value={totalProducts}
          />
          <SummaryCard
            iconKey="packageGreen"
            iconColor="text-green-500"
            title="Total Stock"
            value={totalStock}
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-row justify-between px-4 py-4">
          <h2 className="text-xl font-semibold">Product Inventory</h2>
          <Link to="/Admin/AddProduct">
            <Button gradientMonochrome="info">
              <PackagePlus className="mr-2 h-5 w-5" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-lighter p-6 text-center">
            Loading products...
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-600">
            Failed to load products.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <TableHead className="uppercase">
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Stock</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Last Updated</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-content">
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="transition duration-150 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Badge color="gray" className="w-fit">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.stock_quantity <= 10 ? (
                        <Badge color="failure" icon={AlertTriangle}>
                          {product.stock_quantity} (Low)
                        </Badge>
                      ) : (
                        product.stock_quantity
                      )}
                    </TableCell>
                    <TableCell>
                      ₱{parseFloat(product.price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        color={product.is_active ? 'success' : 'failure'}
                        icon={product.is_active ? CheckCircle : XCircle}
                        className="flex items-center justify-center gap-1 px-3"
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(product.updated_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        outline
                        color="gray"
                        size="sm"
                        onClick={() => openEditModal(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <ToggleSwitch
                        checked={product.is_active}
                        label=""
                        onChange={() =>
                          toggleProductStatus.mutate({
                            id: product.id,
                            newStatus: !product.is_active,
                          })
                        }
                        color={product.is_active ? 'success' : 'failure'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      <Modal show={isModalOpen} size="md" onClose={closeModal}>
        <ModalHeader>Edit {editingProduct?.name}</ModalHeader>
        <ModalBody>
          <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="restock_quantity"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Restock Amount
              </label>
              <input
                id="restock_quantity"
                type="number"
                name="restock_quantity"
                value={formData.restock_quantity}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
                id="price"
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
            {updateStockPrice.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InventoryManagement;
