import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Button,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
} from 'flowbite-react';
import { useState } from 'react';
import SummaryCard from '@/components/cards/SummaryCard';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorState from '@/components/States/ErrorState';

const fetchWalkInOrders = async () => {
  try {
    const res = await axios.get('/api/walkInOrders/');
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

function WalkInOrders() {
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['walkInOrders'],
    queryFn: fetchWalkInOrders,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Summary calculations
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
  const totalDiscount = orders.reduce((sum, order) => sum + parseFloat(order.discount_amount || 0), 0);

  // Optional: track editing modal state if you want to edit order details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const openEditModal = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const formatCurrency = (amount) => {
    return `₱ ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-admin flex h-full flex-col overflow-x-auto p-4">
      <div className="bg-card mb-4 grid grid-cols-1 gap-4 rounded-xl p-4 ring-1 md:grid-cols-4">
        <Card className="shadow-sm ring-1">
          <h2 className="text-xl font-semibold">Walk-In Orders</h2>
          <Button onClick={() => navigate('/admin/create-walk-in')} size="sm">
            Add a Walk-In Order?
          </Button>
        </Card>
        <SummaryCard
          iconKey="orders"
          iconColor="text-fuchsia-600"
          title="Total Walk-In Orders"
          value={totalOrders}
          className="bg-fuchsia-100 dark:bg-fuchsia-900/50"
        />
        <SummaryCard
          iconKey="sales"
          iconColor="text-green-600"
          title="Total Walk-In Sales"
          value={formatCurrency(totalAmount)}
          className="bg-green-100 dark:bg-green-900/50"
        />

        <SummaryCard
          iconKey="discount"
          iconColor="text-lime-600"
          title="Total Walk-In Discounts"
          value={formatCurrency(totalDiscount)}
          className="bg-lime-100 dark:bg-lime-900/50"
        />
      </div>

      {isLoading && (
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1">
          <TableSkeleton columns={8} rows={5} />
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1">
          <ErrorState error={error} onRetry={refetch} title="Failed to load walk-in orders" retryText="Retry" />
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg bg-white p-6 text-gray-500 shadow-sm ring-1">
          <p className="text-lg font-medium">No walk-in orders yet</p>
          <p className="mt-1 text-sm">Create your first walk-in order to get started</p>
          <Button onClick={() => navigate('/admin/create-walk-in')} color="blue" className="mt-4">
            Create Order
          </Button>
        </div>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div className="relative overflow-x-auto rounded-xl shadow-md ring-1">
          <Table hoverable striped className="ring-1">
            <TableHead>
              <TableRow>
                <TableHeadCell className="table-header">Order ID</TableHeadCell>
                <TableHeadCell className="table-header">Customer Name</TableHeadCell>
                <TableHeadCell className="table-header">Email</TableHeadCell>
                <TableHeadCell className="table-header">Date</TableHeadCell>
                <TableHeadCell className="table-header">Total Amount</TableHeadCell>
                <TableHeadCell className="table-header">Discount</TableHeadCell>
                <TableHeadCell className="table-header">Notes</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="text-content">
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openEditModal(order)}
                >
                  <TableCell className="text-xs">{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.customer_email}</TableCell>
                  <TableCell>{new Date(order.sale_date).toLocaleDateString()}</TableCell>
                  <TableCell>₱ {parseFloat(order.total_amount).toLocaleString()}</TableCell>
                  <TableCell>₱ {parseFloat(order.discount_amount).toLocaleString()}</TableCell>
                  <TableCell>{order.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Modal show={isModalOpen} size="md" onClose={closeModal}>
        <ModalHeader>Edit Order #{editingOrder?.id}</ModalHeader>
        <ModalBody>
          <p>Implement edit form here...</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} color="gray">
            Close
          </Button>
          <Button /* onClick={handleSave} */>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WalkInOrders;
