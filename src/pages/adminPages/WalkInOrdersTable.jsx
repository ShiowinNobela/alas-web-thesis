import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
} from 'flowbite-react';
import { useState } from 'react';
import SummaryCard from '@/components/bigComponents/SummaryCard';

const fetchWalkInOrders = async () => {
  const res = await fetch('http://localhost:3000/api/walkInOrders/');
  if (!res.ok) throw new Error('Network response was not ok');
  const json = await res.json();
  return json.data;
};

function WalkInOrders() {
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['walkInOrders'],
    queryFn: fetchWalkInOrders,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Summary calculations
  const totalOrders = orders.length;
  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount || 0),
    0
  );
  const totalDiscount = orders.reduce(
    (sum, order) => sum + parseFloat(order.discount_amount || 0),
    0
  );

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

  return (
    <div className="bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 flex h-full flex-col overflow-x-auto p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 ring-1 md:grid-cols-4">
        <Card className="shadow-sm ring-1">
          <h2 className="text-xl font-semibold">Walk-In Orders</h2>
          <Button onClick={() => navigate('/Admin/WalkInOrdering')} size="sm">
            Add a Walk-In Order?
          </Button>
        </Card>
        <SummaryCard
          iconKey="orders"
          iconColor="text-blue-600"
          title="Total Walk-In Orders"
          value={totalOrders}
        />
        <SummaryCard
          iconKey="sales"
          iconColor="text-green-600"
          title="Total Walk-In Sales"
          value={`₱ ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        />

        <SummaryCard
          iconKey="discount"
          iconColor="text-green-600"
          title="Total Walk-In Discounts"
          value={`₱ ${totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="xl" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-600">
          Failed to load orders: {error.message}
        </p>
      )}

      {!isLoading && orders.length === 0 && (
        <p className="text-center text-gray-500">No walk-in orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="relative overflow-x-auto rounded-xl shadow-md ring-1">
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
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openEditModal(order)}
                >
                  <TableCell className="text-center">{order.id}</TableCell>
                  <TableCell className="text-center">
                    {order.customer_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.customer_email}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(order.sale_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ₱ {parseFloat(order.total_amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ₱ {parseFloat(order.discount_amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">{order.notes}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      size="xs"
                      outline
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
