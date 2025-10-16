import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { PackagePlus } from 'lucide-react';
import SummaryCard from '@/components/cards/SummaryCard';
import ErrorState from '@/components/States/ErrorState';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { useProducts, useToggleProductStatus, useUpdateStockPrice } from '@/hooks/useProducts';
import InventoryUpdateModal from '@/components/modals/InventoryUpdateModal';
import InventoryTable from '@/components/tables/InventoryTable';

function InventoryManagement() {
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const toggleProductStatus = useToggleProductStatus();
  const updateStockPrice = useUpdateStockPrice();

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Summary calculations
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + item.stock_quantity, 0);
  const lowStockItems = products.filter((item) => item.stock_quantity <= 10).length;

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-admin flex flex-col overflow-x-auto p-4">
      <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border shadow ring-1">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <SummaryCard
            iconKey="lowStock"
            iconColor="text-red-500"
            title="Low Stock Items"
            value={lowStockItems}
            className="bg-red-100 dark:bg-red-900/50"
          />
          <SummaryCard
            iconKey="packageBlue"
            iconColor="text-yellow-500"
            title="Total Products"
            value={totalProducts}
            className="bg-amber-100 dark:bg-amber-900/50"
          />
          <SummaryCard
            iconKey="packageGreen"
            iconColor="text-orange-500"
            title="Total Stock"
            value={totalStock}
            className="bg-orange-100 dark:bg-orange-900/50"
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-row justify-between px-4 py-4">
          <h2 className="text-xl font-semibold">Product Inventory</h2>
          <Link to="/admin/add-product">
            <Button color="gray">
              <PackagePlus className="mr-2 h-5 w-5" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={8} rows={10} />
        ) : isError ? (
          <ErrorState error={isError} onRetry={refetch} title="Failed to load Inventory" retryText="Retry Request" />
        ) : (
          <InventoryTable
            products={products}
            onEdit={openEditModal}
            onToggle={(data) => toggleProductStatus.mutate(data)}
          />
        )}
      </main>

      {editingProduct && (
        <InventoryUpdateModal
          isOpen={isModalOpen}
          product={editingProduct}
          onClose={closeModal}
          updateStockPrice={updateStockPrice}
        />
      )}
    </div>
  );
}

export default InventoryManagement;
