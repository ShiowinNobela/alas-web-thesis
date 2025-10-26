import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Modal,
  Textarea,
  Badge,
  Alert,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';

function RefundsPage() {
  const queryClient = useQueryClient();
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [actionType, setActionType] = useState('');
  const [notes, setNotes] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['refunds'],
    queryFn: async () => {
      const response = await axios.get('/api/refunds/');
      return response.data.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ orderId, notes }) => {
      const response = await axios.patch(`/api/refunds/approve/${orderId}`, { notes });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['refunds']);
      setShowModal(false);
      setNotes('');
    },
  });

  const denyMutation = useMutation({
    mutationFn: async ({ orderId, notes }) => {
      const response = await axios.patch(`/api/refunds/deny/${orderId}`, { notes });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['refunds']);
      setShowModal(false);
      setNotes('');
    },
  });

  const handleActionClick = (refund, action) => {
    setSelectedRefund(refund);
    setActionType(action);
    setNotes('');
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedRefund) return;

    const payload = { orderId: selectedRefund.order_id, notes };

    if (actionType === 'approve') {
      approveMutation.mutate(payload);
    } else {
      denyMutation.mutate(payload);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'success',
      denied: 'failure',
    };
    return (
      <Badge className="flex justify-center" color={colors[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="bg-admin flex h-full flex-col overflow-x-auto p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-6 shadow ring-1 dark:text-white">
          <div className="flex justify-center">Loading refund requests...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-admin flex h-full flex-col overflow-x-auto p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-6 shadow ring-1 dark:text-white">
          <Alert color="failure">Error loading refunds: {error.message}</Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-admin flex h-full flex-col overflow-x-auto p-4">
      <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border shadow ring-1 dark:text-white">
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Refund Requests</h1>

          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Order ID</TableHeadCell>
                <TableHeadCell>Customer</TableHeadCell>
                <TableHeadCell>Contact</TableHeadCell>
                <TableHeadCell>Reason</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Date Created</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {data?.map((refund) => (
                  <TableRow key={refund.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="font-mono">{refund.order_id}</TableCell>
                    <TableCell>{refund.customer_name}</TableCell>
                    <TableCell>{refund.contact_number}</TableCell>
                    <TableCell className="max-w-xs truncate">{refund.reason}</TableCell>
                    <TableCell>{getStatusBadge(refund.status)}</TableCell>
                    <TableCell>{formatDate(refund.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          color="success"
                          disabled={refund.status !== 'pending'}
                          onClick={() => handleActionClick(refund, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          disabled={refund.status !== 'pending'}
                          onClick={() => handleActionClick(refund, 'deny')}
                        >
                          Deny
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {data?.length === 0 && <div className="py-8 text-center text-gray-500">No refund requests found.</div>}
        </div>

        {/* Action Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ModalHeader>{actionType === 'approve' ? 'Approve' : 'Deny'} Refund Request</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p>
                You are about to{' '}
                <span
                  className={actionType === 'approve' ? 'font-semibold text-green-600' : 'font-semibold text-red-600'}
                >
                  {actionType}
                </span>{' '}
                the refund for order: <strong>{selectedRefund?.order_id}</strong>
              </p>

              <div>
                <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                  Admin Notes {actionType === 'deny' && '(Required for denial)'}
                </label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter your notes here..."
                  rows={4}
                  required={actionType === 'deny'}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color={actionType === 'approve' ? 'success' : 'failure'}
              onClick={confirmAction}
              disabled={(actionType === 'deny' && !notes.trim()) || approveMutation.isLoading || denyMutation.isLoading}
            >
              {approveMutation.isLoading || denyMutation.isLoading ? 'Processing...' : `Confirm ${actionType}`}
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  );
}

export default RefundsPage;
