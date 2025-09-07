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
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { Edit, Receipt} from 'lucide-react';


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
  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount || 0),
    0
  );
  const totalDiscount = orders.reduce(
    (sum, order) => sum + parseFloat(order.discount_amount || 0),
    0
  );

  // Modal state
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

  const handleSaveChanges = () => {
    console.log('Saving changes for order:', editingOrder);
    closeModal();
  };

  const formatCurrency = (amount) => {
    return `₱ ${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-x-auto bg-admin">
      <div className="grid grid-cols-1 gap-4 p-4 mb-4 bg-card rounded-xl ring-1 md:grid-cols-4">
        
        <Card className="shadow-sm ring-1">
          <div className="flex flex-col items-center text-center">
            <Receipt className="w-8 h-8 mb-2 text-blue-600" />
            <h2 className="text-xl font-semibold">Walk-In Orders</h2>
            <Button 
              onClick={() => navigate('/Admin/WalkInOrdering')} 
              size="sm"
              className="mt-3"
              color="blue"
            >
              Create New Order
            </Button>
          </div>
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
        <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[200px]">
          <div className="text-center">
            <p className="font-medium">Failed to load walk-in orders</p>
            <p className="mt-1 text-sm">{error.message}</p>
            <Button 
              onClick={() => refetch()} 
              color="gray"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
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

      {!isLoading && !error && orders.length > 0 && (
        <div className="relative overflow-x-auto shadow-md rounded-xl ring-1">
          <Table hoverable striped>
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableHeadCell>Order ID</TableHeadCell>
                <TableHeadCell>Customer</TableHeadCell>
                <TableHeadCell>Date & Time</TableHeadCell>
                <TableHeadCell>Total Amount</TableHeadCell>
                <TableHeadCell>Discount</TableHeadCell>
                <TableHeadCell>Net Amount</TableHeadCell>
                <TableHeadCell>Notes</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="transition-colors cursor-pointer hover:bg-gray-50"
                  onClick={() => openEditModal(order)}
                >
                  <TableCell className="font-mono text-sm font-medium">
                    #{order.id}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer_name}</span>
                      {order.customer_email && (
                        <span className="text-xs text-gray-500">{order.customer_email}</span>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {formatDate(order.sale_date)}
                  </TableCell>
                  
                  <TableCell className="font-medium">
                    {formatCurrency(order.total_amount)}
                  </TableCell>
                  
                  <TableCell className={order.discount_amount > 0 ? "text-orange-600" : "text-gray-400"}>
                    {order.discount_amount > 0 ? formatCurrency(order.discount_amount) : "None"}
                  </TableCell>
                  
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(order.total_amount - (order.discount_amount || 0))}
                  </TableCell>
                  
                  <TableCell>
                    {order.notes ? (
                      <span className="text-sm text-gray-600 line-clamp-1" title={order.notes}>
                        {order.notes}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">No notes</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      color="gray"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(order);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={isModalOpen} size="lg" onClose={closeModal}>
        <ModalHeader>
          Edit Walk-In Order #{editingOrder?.id}
        </ModalHeader>
        <ModalBody>
          {editingOrder ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    defaultValue={editingOrder.customer_name}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                  <input
                    type="email"
                    defaultValue={editingOrder.customer_email}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  defaultValue={editingOrder.notes}
                  rows={3}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                  <div className="mt-1 text-lg font-semibold">
                    {formatCurrency(editingOrder.total_amount)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount</label>
                  <input
                    type="number"
                    defaultValue={editingOrder.discount_amount}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Net Amount</label>
                  <div className="mt-1 text-lg font-semibold text-green-600">
                    {formatCurrency(editingOrder.total_amount - (editingOrder.discount_amount || 0))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading order details...</div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="blue">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WalkInOrders;
