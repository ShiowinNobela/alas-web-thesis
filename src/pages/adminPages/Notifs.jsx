import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { HiOutlineSearch, HiOutlineRefresh, HiBell, HiCheck, HiX, HiExclamation } from 'react-icons/hi';
import { IoIosNotifications } from 'react-icons/io';

function Notifs() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [totalNotifications, setTotalNotifications] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();


  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inventory-notifications', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      let notificationsData = [];
      if (response.data.data && response.data.data.notifications) {
        notificationsData = response.data.data.notifications;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        notificationsData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        notificationsData = response.data;
      }
      
      const notificationsArray = Array.isArray(notificationsData) ? notificationsData : [];
      
      const uniqueNotifications = notificationsArray.filter((notification, index, self) => 
        index === self.findIndex(n => 
          n.entity_id === notification.entity_id && 
          n.type === notification.type &&
          n.message === notification.message
        )
      );
      
      setNotifications(uniqueNotifications);
      setFilteredNotifications(uniqueNotifications);
      setTotalNotifications(uniqueNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to fetch inventory notifications');
      setNotifications([]);
      setFilteredNotifications([]);
      setTotalNotifications(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchCriticalNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inventory-notifications/critical', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      const notificationsData = response.data.data || response.data || [];
      const notificationsArray = Array.isArray(notificationsData) ? notificationsData : [];
      setNotifications(notificationsArray);
      setFilteredNotifications(notificationsArray);
    } catch (error) {
      console.error('Error fetching critical notifications:', error);
      toast.error('Failed to fetch critical notifications');
      setNotifications([]);
      setFilteredNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeNotification = async (notificationId) => {
    try {
      await axios.post(`/api/inventory-notifications/${notificationId}/acknowledge`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, acknowledged: true, acknowledged_at: new Date().toISOString() }
            : notif
        )
      );
      
      toast.success('Notification acknowledged');
    } catch (error) {
      console.error('Error acknowledging notification:', error);
      toast.error('Failed to acknowledge notification');
    }
  };


  const navigateToInventory = (productId) => {
    navigate(`/Admin/InventoryManagement?productId=${productId}`);
  };

  const triggerStockCheck = async (productId) => {
    try {
      await axios.post(`/api/inventory-notifications/trigger/product/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      toast.success('Stock check triggered for product');
      setTimeout(() => fetchNotifications(), 1000);
    } catch (error) {
      console.error('Error triggering stock check:', error);
      toast.error('Failed to trigger stock check');
    }
  };

  const triggerBatchCheck = async () => {
    try {
      setLoading(true);
      await axios.post('/api/inventory-notifications/trigger-batch', {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      toast.success('Batch inventory check triggered');
      setTimeout(() => fetchNotifications(), 2000);
    } catch (error) {
      console.error('Error triggering batch check:', error);
      toast.error('Failed to trigger batch check');
    } finally {
      setLoading(false);
    }
  };

  const resolveProductNotifications = async (productId) => {
    try {
      const response = await axios.post(`/api/inventory-notifications/entity/product/${productId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.data.status === 'success') {
        toast.success('Product notifications resolved successfully');
        
        setTimeout(() => {
          fetchNotifications();
        }, 500);
      }
      
    } catch (error) {
      console.error('Error resolving product notifications:', error);
      toast.error('Failed to resolve notifications');
    }
  };

  useEffect(() => {
    let filtered = Array.isArray(notifications) ? notifications : [];

    if (filterType === 'critical') {
      filtered = filtered.filter(notif => notif.type === 'CRITICAL_STOCK' || notif.type === 'LOW_STOCK' || notif.priority === 'critical');
    } else if (filterType === 'acknowledged') {
      filtered = filtered.filter(notif => notif.acknowledged_at);
    } else if (filterType === 'unacknowledged') {
      filtered = filtered.filter(notif => !notif.acknowledged_at);
    } else if (filterType === 'resolved') {
      filtered = filtered.filter(notif => 
        notif.status === 'resolved' || 
        notif.resolution_status === 'resolved' ||
        notif.resolved === true || 
        notif.is_resolved === true || 
        notif.resolved_at
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(notif => 
        (notif.message && notif.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (notif.product_name && notif.product_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (notif.entity_id && notif.entity_id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, filterType, searchTerm]);

  useEffect(() => {
    fetchNotifications();

  }, []);

  const getNotificationIcon = (notification) => {
    const isResolved = notification.status === 'resolved' || 
                      notification.resolution_status === 'resolved' ||
                      notification.resolved === true || 
                      notification.is_resolved === true || 
                      notification.resolved_at;
    const isCritical = notification.type === 'CRITICAL_STOCK' || 
                      notification.type === 'LOW_STOCK' || 
                      notification.priority === 'critical';
    const iconClass = `h-6 w-6 ${
      isResolved ? 'text-green-500' :
      isCritical ? 'text-red-500' : 
      notification.acknowledged_at ? 'text-blue-500' : 
      'text-yellow-500'
    }`;

    if (isResolved) {
      return <HiCheck className={iconClass} />;
    } else if (isCritical) {
      return <HiExclamation className={iconClass} />;
    } else if (notification.acknowledged_at) {
      return <HiCheck className={iconClass} />;
    } else {
      return <HiBell className={iconClass} />;
    }
  };

  const getPriorityBadge = (notification) => {
    const isResolved = notification.status === 'resolved' || 
                      notification.resolution_status === 'resolved' ||
                      notification.resolved === true || 
                      notification.is_resolved === true || 
                      notification.resolved_at;
    
    if (isResolved) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          RESOLVED
        </span>
      );
    } else if (notification.type === 'CRITICAL_STOCK' || notification.type === 'LOW_STOCK' || notification.priority === 'critical') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          CRITICAL
        </span>
      );
    } else if (notification.acknowledged_at) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          ACKNOWLEDGED
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          PENDING
        </span>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full overflow-auto bg-white p-5">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading inventory notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-auto bg-white p-5">
      <Toaster richColors />
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex flex-row justify-between rounded-t-2xl bg-gray-300 p-5">
          <div className="flex h-full flex-row items-center justify-center">
            <IoIosNotifications className="text-secondary mr-3 text-4xl" />
            <h1 className="text-secondary text-2xl font-bold">
              Inventory Notifications
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-primary rounded border border-gray-300 bg-white px-4 py-2 text-black shadow-md focus:ring-2 focus:outline-none"
            />
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="focus:ring-primary rounded border border-gray-300 bg-white px-4 py-2 text-black shadow-md focus:ring-2 focus:outline-none"
            >
              <option value="all">All Notifications</option>
              <option value="critical">Critical Only</option>
              <option value="unacknowledged">Unacknowledged</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>

            <button
              onClick={triggerBatchCheck}
              className="flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <HiOutlineRefresh className="h-4 w-4" />
              <span>Batch Check</span>
            </button>

            <button
              onClick={fetchNotifications}
              className="flex items-center space-x-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            >
              <HiOutlineRefresh className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-100 px-5 py-3 border-b">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Total Notifications: <span className="font-semibold text-gray-900">{totalNotifications}</span>
            </span>
            <span>
              Critical: <span className="font-semibold text-red-600">
                {Array.isArray(notifications) ? notifications.filter(n => 
                  (n.type === 'CRITICAL_STOCK' || n.type === 'LOW_STOCK' || n.priority === 'critical') && 
                  n.status !== 'resolved' && n.resolution_status !== 'resolved' && !n.resolved && !n.is_resolved && !n.resolved_at
                ).length : 0}
              </span>
            </span>
            <span>
              Resolved: <span className="font-semibold text-green-600">
                {Array.isArray(notifications) ? notifications.filter(n => 
                  n.status === 'resolved' || n.resolution_status === 'resolved' || n.resolved === true || n.is_resolved === true || n.resolved_at
                ).length : 0}
              </span>
            </span>
            <span>
              Unacknowledged: <span className="font-semibold text-yellow-600">
                {Array.isArray(notifications) ? notifications.filter(n => 
                  !n.acknowledged_at && n.status !== 'resolved' && n.resolution_status !== 'resolved' && !n.resolved && !n.is_resolved && !n.resolved_at
                ).length : 0}
              </span>
            </span>
            <span>
              Showing: <span className="font-semibold text-gray-900">{Array.isArray(filteredNotifications) ? filteredNotifications.length : 0}</span>
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <HiBell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications found</h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your filters or search terms.' 
                    : 'No inventory notifications at this time.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 transition-colors hover:bg-gray-50 ${
                    notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at
                      ? 'bg-green-50 border-l-4 border-green-500'
                      : notification.type === 'CRITICAL_STOCK' || notification.type === 'LOW_STOCK' || notification.priority === 'critical' 
                        ? 'bg-red-50 border-l-4 border-red-500' 
                        : !notification.acknowledged_at 
                          ? 'bg-yellow-50 border-l-4 border-yellow-500' 
                          : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {notification.title || `Stock Alert - ${notification.product_name || notification.entity_id}`}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {notification.message}
                            </p>
                            {notification.entity_id && (
                              <p className="mt-1 text-xs text-gray-400">
                                Product ID: {notification.entity_id}
                              </p>
                            )}
                            <div className="mt-2 flex items-center space-x-3">
                              <span className="text-xs text-gray-400">
                                {formatDate(notification.created_at)}
                              </span>
                              {getPriorityBadge(notification)}
                              {notification.acknowledged_at && (
                                <span className="text-xs text-gray-400">
                                  Acknowledged: {formatDate(notification.acknowledged_at)}
                                </span>
                              )}
                              {(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                                <span className="text-xs text-green-600">
                                  Resolved: {notification.resolved_at ? formatDate(notification.resolved_at) : 'Just now'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.acknowledged_at && !(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                        <button
                          onClick={() => acknowledgeNotification(notification.id)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 border border-green-300 rounded hover:bg-green-50 transition-colors"
                          title="Acknowledge notification"
                        >
                          Acknowledge
                        </button>
                      )}
                      
                      {notification.entity_id && !(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                        <>
                          <button
                            onClick={() => navigateToInventory(notification.entity_id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                            title="Go to Inventory Management"
                          >
                            Check Stock
                          </button>
                          
                          <button
                            onClick={() => resolveProductNotifications(notification.entity_id)}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium px-3 py-1 border border-purple-300 rounded hover:bg-purple-50 transition-colors"
                            title="Resolve all notifications for this product"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      
                      {(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                        <span className="text-green-600 text-sm font-medium px-3 py-1 bg-green-100 rounded">
                          ✓ Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifs