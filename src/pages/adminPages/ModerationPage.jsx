import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
  Button,
  Alert,
  Card,
} from 'flowbite-react';
import { Clock, User, FileText, Edit3 } from 'lucide-react';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import { useState } from 'react';
import ReviewModal from '@/components/modals/ReviewModal';

const fetchAllReviews = async () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { data } = await axios.get('/api/reviews/admin/all', {
    headers: { Authorization: `Bearer ${user?.token}` },
  });
  return data.data;
};

const moderateReview = async ({ review_id, action }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  await axios.post(
    `/api/reviews/admin/moderate/${review_id}`,
    { action },
    { headers: { Authorization: `Bearer ${user?.token}` } }
  );
};

function ModerationPage() {
  const queryClient = useQueryClient();
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['allReviews'],
    queryFn: fetchAllReviews,
    refetchInterval: 30000,
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: moderateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
      setShowModal(false);
      setSelectedReview(null);
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleSubmit = (action) => {
    if (!action || !selectedReview) return;
    mutation.mutate({ review_id: selectedReview.review_id, action });
  };

  if (isError) {
    return (
      <Alert color="failure" className="m-4">
        Failed to load reviews.
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-4 bg-admin">
        <main className="w-full p-4 mx-auto overflow-x-auto border shadow bg-card rounded-xl ring-1">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold text-content">Review Moderation</h1>
          </div>

          {isLoading ? (
            <TableSkeleton columns={5} rows={10} />
          ) : reviews.length === 0 ? (
            <Card className="text-center">
              <FileText className="w-8 h-8 mx-auto text-lighter" />
              <h3 className="mt-2 font-medium text-md">No reviews found</h3>
              <p className="text-sm text-lighter">There are currently no reviews to moderate.</p>
            </Card>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>User</TableHeadCell>
                  <TableHeadCell>Product</TableHeadCell>
                  <TableHeadCell>Rating</TableHeadCell>
                  <TableHeadCell>Review</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Created</TableHeadCell>
                  <TableHeadCell className="text-right">Action</TableHeadCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reviews.map((review) => (
                  <TableRow
                    key={review.review_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
                  >
                    <TableCell>{review.review_id}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {review.username || 'Unknown'}
                    </TableCell>
                    <TableCell>{review.product_name}</TableCell>
                    <TableCell>{review.rating}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {review.review_text || '(no text)'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        color={
                          review.status === 'flagged'
                            ? 'failure'
                            : review.status === 'removed'
                            ? 'gray'
                            : 'success'
                        }
                      >
                        {review.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {dayjs(review.created_at).format('MMM DD, HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="xs" color="gray" onClick={() => handleOpenModal(review)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Moderate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </main>

        <ReviewModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          review={selectedReview}
          isLoading={mutation.isPending}
        /> 
      </div>
    </ErrorBoundary>
  );
}

export default ModerationPage;
