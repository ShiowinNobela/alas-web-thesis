import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { HiBell, HiCheck } from 'react-icons/hi';
import { Flame, Package, AlertTriangle, CheckCircle, Clock, Search, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import ErrorState from '@/components/States/ErrorState';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

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

      const uniqueNotifications = notificationsArray.filter(
        (notification, index, self) =>
          index ===
          self.findIndex(
            (n) =>
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
      await axios.post(
        `/api/inventory-notifications/${notificationId}/acknowledge`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notif) =>
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
    navigate(`/admin/inventory?productId=${productId}`);
  };

  const triggerStockCheck = async (productId) => {
    try {
      await axios.post(
        `/api/inventory-notifications/trigger/product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      await axios.post(
        '/api/inventory-notifications/trigger-batch',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      const response = await axios.post(
        `/api/inventory-notifications/entity/product/${productId}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      filtered = filtered.filter(
        (notif) => notif.type === 'CRITICAL_STOCK' || notif.type === 'LOW_STOCK' || notif.priority === 'critical'
      );
    } else if (filterType === 'acknowledged') {
      filtered = filtered.filter((notif) => notif.acknowledged_at);
    } else if (filterType === 'unacknowledged') {
      filtered = filtered.filter((notif) => !notif.acknowledged_at);
    } else if (filterType === 'resolved') {
      filtered = filtered.filter(
        (notif) =>
          notif.status === 'resolved' ||
          notif.resolution_status === 'resolved' ||
          notif.resolved === true ||
          notif.is_resolved === true ||
          notif.resolved_at
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (notif) =>
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
    const isResolved =
      notification.status === 'resolved' ||
      notification.resolution_status === 'resolved' ||
      notification.resolved === true ||
      notification.is_resolved === true ||
      notification.resolved_at;
    const isCritical =
      notification.type === 'CRITICAL_STOCK' ||
      notification.type === 'LOW_STOCK' ||
      notification.priority === 'critical';

    if (isResolved) {
      return (
        <div className="rounded-full bg-green-100 p-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
      );
    } else if (isCritical) {
      return (
        <div className="rounded-full bg-red-100 p-2">
          <Flame className="h-6 w-6 text-red-600" />
        </div>
      );
    } else if (notification.acknowledged_at) {
      return (
        <div className="rounded-full bg-blue-100 p-2">
          <HiCheck className="h-6 w-6 text-blue-600" />
        </div>
      );
    } else {
      return (
        <div className="rounded-full bg-yellow-100 p-2">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
      );
    }
  };

  const getPriorityBadge = (notification) => {
    const isResolved =
      notification.status === 'resolved' ||
      notification.resolution_status === 'resolved' ||
      notification.resolved === true ||
      notification.is_resolved === true ||
      notification.resolved_at;

    if (isResolved) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          <CheckCircle className="h-3 w-3" />
          RESOLVED
        </span>
      );
    } else if (
      notification.type === 'CRITICAL_STOCK' ||
      notification.type === 'LOW_STOCK' ||
      notification.priority === 'critical'
    ) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
          <Flame className="h-3 w-3" />
          CRITICAL
        </span>
      );
    } else if (notification.acknowledged_at) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          <HiCheck className="h-3 w-3" />
          ACKNOWLEDGED
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
          <Clock className="h-3 w-3" />
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
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  };

  if (loading) {
    return (
      <section className="bg-neutral min-h-screen py-10">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>
            <p className="mt-6 text-lg font-medium text-gray-600">Loading spicy notifications...</p>
            <p className="mt-2 text-sm text-gray-400">Getting the latest inventory heat checks</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="bg-neutral min-h-screen py-10">
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-100 to-amber-100 blur-sm"></div>
                <div className="relative rounded-full bg-gradient-to-br from-red-50 to-amber-50 p-4">
                  <Flame className="h-12 w-12 text-red-600" />
                </div>
              </div>
            </div>
            <h1 className="font-heading text-content mb-2 text-4xl font-bold">Inventory Heat Monitor</h1>
            <p className="text-lighter text-lg font-medium">Track your sauce stock levels and critical alerts</p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-red-200">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-red-100 opacity-20"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium tracking-wider text-red-600 uppercase">Total Alerts</p>
                    <p className="text-3xl font-bold text-red-900">{totalNotifications}</p>
                  </div>
                  <div className="rounded-full bg-red-100 p-3">
                    <Package className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-orange-200">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-orange-100 opacity-20"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium tracking-wider text-orange-600 uppercase">Critical Stock</p>
                    <p className="text-3xl font-bold text-orange-900">
                      {Array.isArray(notifications)
                        ? notifications.filter(
                            (n) =>
                              (n.type === 'CRITICAL_STOCK' || n.type === 'LOW_STOCK' || n.priority === 'critical') &&
                              n.status !== 'resolved' &&
                              n.resolution_status !== 'resolved' &&
                              !n.resolved &&
                              !n.is_resolved &&
                              !n.resolved_at
                          ).length
                        : 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-orange-100 p-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-green-200">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-green-100 opacity-20"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium tracking-wider text-green-600 uppercase">Resolved</p>
                    <p className="text-3xl font-bold text-green-900">
                      {Array.isArray(notifications)
                        ? notifications.filter(
                            (n) =>
                              n.status === 'resolved' ||
                              n.resolution_status === 'resolved' ||
                              n.resolved === true ||
                              n.is_resolved === true ||
                              n.resolved_at
                          ).length
                        : 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-yellow-200">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-yellow-100 opacity-20"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium tracking-wider text-yellow-600 uppercase">Pending</p>
                    <p className="text-3xl font-bold text-yellow-900">
                      {Array.isArray(notifications)
                        ? notifications.filter(
                            (n) =>
                              !n.acknowledged_at &&
                              n.status !== 'resolved' &&
                              n.resolution_status !== 'resolved' &&
                              !n.resolved &&
                              !n.is_resolved &&
                              !n.resolved_at
                          ).length
                        : 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Section */}
          <Card className="mb-8 bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none sm:w-64"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none"
                  >
                    <option value="all">All Notifications</option>
                    <option value="critical">🔥 Critical Only</option>
                    <option value="unacknowledged">⏳ Unacknowledged</option>
                    <option value="acknowledged">✅ Acknowledged</option>
                    <option value="resolved">🎯 Resolved</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={triggerBatchCheck}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all hover:from-blue-700 hover:to-blue-800"
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Batch Check
                  </Button>

                  <Button
                    onClick={fetchNotifications}
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300 text-gray-700 transition-all hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          {loading ? (
            <TableSkeleton columns={1} rows={5} />
          ) : (
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="bg-white shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="mb-6 rounded-full bg-gray-100 p-6">
                      <HiBell className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-heading mb-2 text-xl font-bold text-gray-900">No Heat Alerts Found</h3>
                    <p className="max-w-md text-center text-gray-500">
                      {searchTerm || filterType !== 'all'
                        ? 'Try adjusting your filters or search terms to find specific notifications.'
                        : 'Your sauce inventory is running smooth! No critical alerts at this time.'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                        notification.status === 'resolved' ||
                        notification.resolution_status === 'resolved' ||
                        notification.resolved === true ||
                        notification.is_resolved === true ||
                        notification.resolved_at
                          ? 'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50'
                          : notification.type === 'CRITICAL_STOCK' ||
                              notification.type === 'LOW_STOCK' ||
                              notification.priority === 'critical'
                            ? 'border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50'
                            : !notification.acknowledged_at
                              ? 'border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50'
                              : 'border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-sky-50'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-1 items-start space-x-4">
                            <div className="mt-1 flex-shrink-0">{getNotificationIcon(notification)}</div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-3 flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-heading mb-1 text-lg font-semibold text-gray-900">
                                    {notification.title ||
                                      `🌶️ Stock Alert - ${notification.product_name || notification.entity_id}`}
                                  </h3>
                                  <p className="mb-2 leading-relaxed text-gray-700">{notification.message}</p>
                                  {notification.entity_id && (
                                    <div className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                      <Package className="mr-1 h-3 w-3" />
                                      Product ID: {notification.entity_id}
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">{getPriorityBadge(notification)}</div>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDate(notification.created_at)}
                                </div>
                                {notification.acknowledged_at && (
                                  <div className="flex items-center gap-1 text-blue-600">
                                    <CheckCircle className="h-3 w-3" />
                                    Acknowledged: {formatDate(notification.acknowledged_at)}
                                  </div>
                                )}
                                {(notification.status === 'resolved' ||
                                  notification.resolution_status === 'resolved' ||
                                  notification.resolved === true ||
                                  notification.is_resolved === true ||
                                  notification.resolved_at) && (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="h-3 w-3" />
                                    Resolved:{' '}
                                    {notification.resolved_at ? formatDate(notification.resolved_at) : 'Just now'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="ml-6 flex flex-col gap-2">
                            {!notification.acknowledged_at &&
                              !(
                                notification.status === 'resolved' ||
                                notification.resolution_status === 'resolved' ||
                                notification.resolved === true ||
                                notification.is_resolved === true ||
                                notification.resolved_at
                              ) && (
                                <Button
                                  onClick={() => acknowledgeNotification(notification.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-green-300 text-green-600 transition-all hover:border-green-400 hover:bg-green-50"
                                >
                                  <HiCheck className="mr-1 h-3 w-3" />
                                  Acknowledge
                                </Button>
                              )}

                            {notification.entity_id &&
                              !(
                                notification.status === 'resolved' ||
                                notification.resolution_status === 'resolved' ||
                                notification.resolved === true ||
                                notification.is_resolved === true ||
                                notification.resolved_at
                              ) && (
                                <>
                                  <Button
                                    onClick={() => navigateToInventory(notification.entity_id)}
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-300 text-blue-600 transition-all hover:border-blue-400 hover:bg-blue-50"
                                  >
                                    <Package className="mr-1 h-3 w-3" />
                                    Check Stock
                                  </Button>

                                  <Button
                                    onClick={() => resolveProductNotifications(notification.entity_id)}
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all hover:from-purple-700 hover:to-purple-800"
                                  >
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Resolve
                                  </Button>
                                </>
                              )}

                            {(notification.status === 'resolved' ||
                              notification.resolution_status === 'resolved' ||
                              notification.resolved === true ||
                              notification.is_resolved === true ||
                              notification.resolved_at) && (
                              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                <CheckCircle className="h-3 w-3" />
                                Resolved
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default Notifs;
