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
import SummaryCard from '@/components/bigComponents/SummaryCard';
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
    <div className="flex flex-col h-full p-4 overflow-x-auto bg-admin">
      <div className="grid grid-cols-1 gap-4 p-4 mb-4 bg-card rounded-xl ring-1 md:grid-cols-4">
        <Card className="shadow-sm ring-1">
          <h2 className="text-xl font-semibold">Walk-In Orders</h2>
          <Button onClick={() => navigate('/Admin/WalkInOrdering')} size="sm">
            Add a Walk-In Order?
          </Button>
        </Card>
        <SummaryCard iconKey="orders" iconColor="text-blue-600" title="Total Walk-In Orders" value={totalOrders} />
        <SummaryCard
          iconKey="sales"
          iconColor="text-green-600"
          title="Total Walk-In Sales"
          value={formatCurrency(totalAmount)}
        />

        <SummaryCard
          iconKey="discount"
          iconColor="text-green-600"
          title="Total Walk-In Discounts"
          value={formatCurrency(totalDiscount)}
        />
      </div>

      {isLoading && (
        <div className="p-4 bg-white rounded-lg shadow-sm ring-1">
          <TableSkeleton columns={8} rows={5} />
        </div>
      )}

      {error && (
        <div className="p-4 bg-white rounded-lg shadow-sm ring-1">
          <ErrorState
            error={error}
            onRetry={refetch}
            title="Failed to load walk-in orders"
            retryText="Retry"
          />
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500 bg-white rounded-lg shadow-sm ring-1 min-h-[200px]">
          <Receipt className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No walk-in orders yet</p>
          <p className="mt-1 text-sm">Create your first walk-in order to get started</p>
          <Button 
            onClick={() => navigate('/Admin/WalkInOrdering')} 
            color="blue"
            className="mt-4"
          >
            Create Order
          </Button>
        </div>
      )}

      {!isLoading && !error && orders.length > 0 &&  (
        <div className="relative overflow-x-auto shadow-md rounded-xl ring-1">
          <Table hoverable striped className="ring-1">
            <TableHead>
              <TableRow>
                <TableHeadCell>Order ID</TableHeadCell>
                <TableHeadCell>Customer Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Total Amount</TableHeadCell>
                <TableHeadCell>Discount</TableHeadCell>
                <TableHeadCell>Notes</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
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
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      color="gray"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(order);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
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
