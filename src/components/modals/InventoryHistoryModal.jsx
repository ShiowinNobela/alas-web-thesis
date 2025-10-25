// components/modals/InventoryHistoryModal.jsx
import { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Table,
  Pagination,
  Spinner,
  Badge,
  TableHeadCell,
  TableHead,
  TableBody,
  TableCell,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TableRow,
} from 'flowbite-react';
import { X, Calendar, Package, User, ShoppingCart } from 'lucide-react';
import axios from 'axios';

function InventoryHistoryModal({ isOpen, onClose, productId = null }) {
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  const fetchInventoryLogs = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      if (productId) {
        // Product-specific history - no pagination
        const response = await axios.get(`/api/inventoryLog/product/${productId}`);
        if (response.data.success) {
          setInventoryLogs(response.data.data);
          setPagination({
            current: 1,
            pages: 1,
            total: response.data.count || response.data.data.length,
          });
        }
      } else {
        // All inventory history - with pagination
        const limit = 10;
        const response = await axios.get(`/api/inventoryLog/paginated?page=${page}&limit=${limit}`);
        if (response.data.success) {
          setInventoryLogs(response.data.data);
          if (response.data.pagination) {
            setPagination(response.data.pagination);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch inventory history');
      console.error('Error fetching inventory logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInventoryLogs(1);
    }
  }, [isOpen, productId]);

  const handlePageChange = (page) => {
    // Only fetch new page if it's not product-specific history
    if (!productId) {
      fetchInventoryLogs(page);
    }
  };

  const getActionBadge = (action) => {
    const actionColors = {
      stock_add: 'success',
      stock_remove: 'failure',
      reserve: 'warning',
      unreserve: 'info',
      adjustment: 'purple',
    };

    return (
      <Badge color={actionColors[action] || 'gray'} className="capitalize">
        {action.replace('_', ' ')}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="7xl">
      <ModalHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {productId ? `Inventory History - Product ${productId}` : 'Complete Inventory History'}
        </div>
      </ModalHeader>

      <ModalBody>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <div className="text-error py-8 text-center">
            <p className="mb-4">{error}</p>
            <Button onClick={() => fetchInventoryLogs(1)}>Retry</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {inventoryLogs.length} of {pagination.total} records
                {productId && ' (All history for this product)'}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>Date & Time</TableHeadCell>
                  <TableHeadCell>Product ID</TableHeadCell>
                  <TableHeadCell>Action</TableHeadCell>
                  <TableHeadCell>Available Change</TableHeadCell>
                  <TableHeadCell>Reserved Change</TableHeadCell>
                  <TableHeadCell>Order ID</TableHeadCell>
                  <TableHeadCell>User</TableHeadCell>
                  <TableHeadCell>Reason</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {inventoryLogs.map((log) => (
                    <TableRow key={log._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(log.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-500" />
                          <span className="font-mono text-sm">{log.productId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${log.changeAvailable >= 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {log.changeAvailable >= 0 ? '+' : ''}
                          {log.changeAvailable}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${log.changeReserved >= 0 ? 'text-blue-600' : 'text-orange-600'}`}
                        >
                          {log.changeReserved >= 0 ? '+' : ''}
                          {log.changeReserved}
                        </span>
                      </TableCell>
                      <TableCell>
                        {log.orderId ? (
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-purple-500" />
                            <span className="font-mono text-sm">{log.orderId}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {log.userId ? (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{log.userId}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{log.reason || '-'}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination - Only show for all history, not product-specific */}
            {!productId && pagination.pages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={pagination.current}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                  showIcons
                />
              </div>
            )}

            {inventoryLogs.length === 0 && !loading && (
              <div className="py-8 text-center text-gray-500">
                <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p>No inventory history found</p>
              </div>
            )}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <Button color="gray" onClick={onClose}>
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default InventoryHistoryModal;
