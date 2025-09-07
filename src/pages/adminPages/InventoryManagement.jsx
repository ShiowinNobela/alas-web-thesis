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
  TextInput,
  Alert,
  Spinner,
  Pagination,
} from 'flowbite-react';
import {
  Edit,
  PackagePlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from 'lucide-react';
import SummaryCard from '@/components/bigComponents/SummaryCard';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

const fetchProducts = async () => {
  const res = await axios.get('/api/products/admin');
  return res.data;
};

const ProductRow = ({ product, onEdit, onToggleStatus }) => (
  <TableRow className="transition duration-150 ease-in-out hover:bg-gray-50">
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
    <TableCell>₱{parseFloat(product.price).toFixed(2)}</TableCell>
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
        onClick={() => onEdit(product)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <ToggleSwitch
        checked={product.is_active}
        label=""
        onChange={() => onToggleStatus(product.id, !product.is_active)}
        color={product.is_active ? 'success' : 'failure'}
      />
    </TableCell>
  </TableRow>
);

function InventoryManagement() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ restock_quantity: 0, price: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const queryClient = useQueryClient();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Summary calculations
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + item.stock_quantity, 0);
  const lowStockItems = products.filter(item => item.stock_quantity <= 10).length;

  // Toggle product status
  const toggleProductStatus = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axios.patch(`/api/products/toggle-status/${id}`, {
        is_active: newStatus,
      }),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

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

  if (isLoading) {
    return (
      <div className="flex flex-col p-4 overflow-x-auto bg-admin">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <TableSkeleton columns={8} rows={5} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-admin">
        <Alert color="failure" className="mb-4">
          <span className="font-medium">Error loading products:</span> {error.message}
        </Alert>
        <Button onClick={() => refetch()} color="failure">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen p-4 bg-admin">
          <div className="mx-auto max-w-screen-2xl">
            <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
              <AlertTriangle className="w-12 h-12 mb-4" />
              <p className="mb-2 font-medium">Failed to load inventory</p>
              <p className="mb-4 text-sm">{error.message}</p>
              <Button onClick={resetError} color="failure">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    >
      <div className="flex flex-col p-4 overflow-x-auto bg-admin">
        <main className="w-full mx-auto overflow-x-auto border shadow bg-card rounded-xl ring-1">
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
          <div className="flex flex-col justify-between gap-4 px-4 py-4 md:flex-row">
            <h2 className="text-xl font-semibold">Product Inventory</h2>
            <div className="flex flex-col gap-4 md:flex-row">
              <TextInput
                icon={Search}
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button color="gray" className="whitespace-nowrap">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Link to="/Admin/AddProduct">
                <Button gradientMonochrome="info" className="whitespace-nowrap">
                  <PackagePlus className="w-5 h-5 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Table */}
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
                {currentProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onEdit={openEditModal}
                    onToggleStatus={(id, newStatus) => 
                      toggleProductStatus.mutate({ id, newStatus })
                    }
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showIcons
              />
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
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Restock Amount
                </label>
                <input
                  id="restock_quantity"
                  type="number"
                  name="restock_quantity"
                  min="0"
                  value={formData.restock_quantity}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
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
              {updateStockPrice.isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </ErrorBoundary>
  );
}

export default InventoryManagement;
