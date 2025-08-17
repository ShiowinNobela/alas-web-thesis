import { Card } from './ui/card';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { MessageSquareIcon, CheckCircleIcon, AlertCircleIcon, TruckIcon, PackageIcon, ImageIcon, ZoomInIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { fetchOrderHistory } from '@/api/orderService';

export default function AdminNotes({ order }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (order?.id) {
        try {
          setIsLoadingHistory(true);
          const historyData = await fetchOrderHistory(order.id);
          setOrderHistory(historyData?.data || []);
        } catch (error) {
          console.error('Failed to fetch order history:', error);
          setOrderHistory([]);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };

    fetchHistory();
  }, [order?.id]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <AlertCircleIcon className="h-4 w-4 text-yellow-600" />;
      case 'processing':
        return <PackageIcon className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <TruckIcon className="h-4 w-4 text-purple-600" />;
      case 'delivered':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      default:
        return <MessageSquareIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const generateTimeline = () => {
    const timeline = [];
    
    // If we have order history data, use it for accurate timestamps
    if (orderHistory.length > 0) {
      orderHistory.forEach((historyEntry) => {
        const status = historyEntry.status.toLowerCase();
        let stage = '';
        let note = '';
        let type = 'admin';

        switch (status) {
          case 'pending':
            stage = 'Order Created';
            note = order?.notes?.trim() ? 
              `Customer note: "${order.notes}"` : 
              'Order has been placed and is awaiting confirmation.';
            type = 'system';
            break;
          case 'processing':
            stage = 'Order Confirmed';
            note = historyEntry.notes || 'Your order has been confirmed and is now being prepared.';
            break;
          case 'shipping':
            stage = 'Order Shipped';
            note = historyEntry.notes || 'Your order has been dispatched and is on its way to you.';
            break;
          case 'delivered':
            stage = 'Order Delivered';
            note = historyEntry.notes || 'Your order has been successfully delivered. Thank you for choosing us!';
            break;
          default:
            stage = status.charAt(0).toUpperCase() + status.slice(1);
            note = historyEntry.notes || `Order status updated to ${status}`;
        }

        timeline.push({
          id: `${status}-${historyEntry.history_id}`,
          stage: stage,
          status: status,
          date: historyEntry.status_date,
          note: note,
          type: type,
          image: order?.[`${status}_image`] || null
        });
      });
    } else {
      // Fallback to old method if history is not available
      if (order?.order_date) {
        timeline.push({
          id: 'order-created',
          stage: 'Order Created',
          status: 'pending',
          date: order.order_date,
          note: order?.notes?.trim() ? 
            `Customer note: "${order.notes}"` : 
            'Order has been placed and is awaiting confirmation.',
          type: 'system',
          image: null
        });
      }

      if (order?.status === 'processing' || order?.status === 'shipped' || order?.status === 'delivered') {
        timeline.push({
          id: 'order-confirmed',
          stage: 'Order Confirmed',
          status: 'processing',
          date: order.status_date || order.updated_at || order.order_date,
          note: 'Your order has been confirmed and is now being prepared.',
          type: 'admin',
          image: order?.processing_image || null
        });
      }

      if (order?.status === 'shipped' || order?.status === 'delivered') {
        timeline.push({
          id: 'order-shipped',
          stage: 'Order Shipped',
          status: 'shipped',
          date: order.status_date || order.updated_at || order.order_date,
          note: 'Your order has been dispatched and is on its way to you.',
          type: 'admin',
          image: order?.shipping_image || null
        });
      }

      if (order?.status === 'delivered') {
        timeline.push({
          id: 'order-delivered',
          stage: 'Order Delivered',
          status: 'delivered',
          date: order.status_date || order.updated_at || order.order_date,
          note: 'Your order has been successfully delivered. Thank you for choosing us!',
          type: 'admin',
          image: order?.delivery_image || null
        });
      }
    }

    // Add admin notes if they exist
    if (order?.admin_notes?.trim()) {
      timeline.push({
        id: 'admin-note',
        stage: 'Admin Note',
        status: order.status,
        date: order.admin_notes_updated || order.updated_at || order.order_date,
        note: order.admin_notes,
        type: 'admin',
        image: order?.admin_image || null
      });
    }

    return timeline.sort((a, b) => new Date(b.date) - new Date(a.date)); //bottom to top ~ (a-b) if top to bottom
  };

  const timeline = generateTimeline();

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Admin Notes & Feedback</h2>
          <span className="text-sm text-gray-500">Order #{order?.id}</span>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareIcon className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">Communication Timeline</h3>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {isLoadingHistory ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading timeline...</p>
              </div>
            ) : timeline.map((entry, index) => (
              <div key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    {getStatusIcon(entry.status)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px h-8 bg-gray-300 mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-semibold text-gray-900">{entry.stage}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.type === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {entry.type === 'admin' ? 'Admin' : 'System'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">
                    {formatDate(entry.date)}
                  </p>
                  
                  <div className={`text-sm p-3 rounded-lg ${
                    entry.type === 'admin' 
                      ? 'bg-blue-50 border-l-4 border-blue-400' 
                      : 'bg-gray-50 border-l-4 border-gray-400'
                  }`}>
                    <p className="text-gray-700">{entry.note}</p>
                    
                    {entry.image && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          Progress Photo:
                        </p>
                        <div className="relative inline-block">
                          <img
                            src={entry.image}
                            alt={`${entry.stage} progress`}
                            className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage({
                              url: entry.image,
                              title: entry.stage,
                              date: entry.date
                            })}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 rounded-lg transition-opacity">
                            <ZoomInIcon className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {!isLoadingHistory && timeline.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquareIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No communication history available</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(order?.status)}
            <h3 className="text-sm font-semibold text-gray-900">Current Status</h3>
          </div>
          <div className="text-xs text-gray-600">
            <p>
              <strong>Status:</strong> {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)} • 
              <strong> Order Date:</strong> {formatDate(order?.order_date)}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {order?.status === 'delivered' ? '✅ Your order has been completed successfully!' :
               order?.status === 'shipped' ? '🚚 Your order is currently in transit.' :
               order?.status === 'processing' ? '⚡ Your order is being prepared.' :
               order?.status === 'pending' ? '⏳ Your order is awaiting confirmation.' :
               'Please contact support for status updates.'}
            </p>
          </div>
        </Card>
      </div>
      
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Progress Photo - {selectedImage.title}</DialogTitle>
              <DialogDescription>
                Taken on {formatDate(selectedImage.date)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => setSelectedImage(null)} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

AdminNotes.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    order_date: PropTypes.string,
    status_date: PropTypes.string,
    updated_at: PropTypes.string,
    notes: PropTypes.string,
    admin_notes: PropTypes.string,
    admin_notes_updated: PropTypes.string,
    admin_feedback: PropTypes.string,
    admin_feedback_updated: PropTypes.string,
    processing_image: PropTypes.string,
    shipping_image: PropTypes.string,
    delivery_image: PropTypes.string,
    admin_image: PropTypes.string,
  }),
};
