import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { HiBell, HiCheck} from 'react-icons/hi';
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

    if (isResolved) {
      return (
        <div className="p-2 bg-green-100 rounded-full">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      );
    } else if (isCritical) {
      return (
        <div className="p-2 bg-red-100 rounded-full">
          <Flame className="w-6 h-6 text-red-600" />
        </div>
      );
    } else if (notification.acknowledged_at) {
      return (
        <div className="p-2 bg-blue-100 rounded-full">
          <HiCheck className="w-6 h-6 text-blue-600" />
        </div>
      );
    } else {
      return (
        <div className="p-2 bg-yellow-100 rounded-full">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
        </div>
      );
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
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-800 bg-green-100 border border-green-200 rounded-full">
          <CheckCircle className="w-3 h-3" />
          RESOLVED
        </span>
      );
    } else if (notification.type === 'CRITICAL_STOCK' || notification.type === 'LOW_STOCK' || notification.priority === 'critical') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-800 bg-red-100 border border-red-200 rounded-full">
          <Flame className="w-3 h-3" />
          CRITICAL
        </span>
      );
    } else if (notification.acknowledged_at) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-full">
          <HiCheck className="w-3 h-3" />
          ACKNOWLEDGED
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-full">
          <Clock className="w-3 h-3" />
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
      <section className="min-h-screen py-10 bg-neutral">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto border-4 border-gray-200 rounded-full animate-spin border-t-red-600"></div>
            <p className="mt-6 text-lg font-medium text-gray-600">Loading spicy notifications...</p>
            <p className="mt-2 text-sm text-gray-400">Getting the latest inventory heat checks</p>
          </div>
        </div>
      </section>
    );
  }

  return (
     <ErrorBoundary>

    <section className="min-h-screen py-10 bg-neutral">
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
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-100 to-amber-100 blur-sm"></div>
              <div className="relative p-4 rounded-full bg-gradient-to-br from-red-50 to-amber-50">
                <Flame className="w-12 h-12 text-red-600" />
              </div>
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold font-heading text-content">
            Inventory Heat Monitor
          </h1>
          <p className="text-lg font-medium text-lighter">
            Track your sauce stock levels and critical alerts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden transition-all bg-white shadow-lg hover:shadow-red-200 hover:-translate-y-1">
            <div className="absolute w-20 h-20 bg-red-100 rounded-full -top-4 -right-4 opacity-20"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium tracking-wider text-red-600 uppercase">Total Alerts</p>
                  <p className="text-3xl font-bold text-red-900">{totalNotifications}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Package className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all bg-white shadow-lg hover:shadow-orange-200 hover:-translate-y-1">
            <div className="absolute w-20 h-20 bg-orange-100 rounded-full -top-4 -right-4 opacity-20"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium tracking-wider text-orange-600 uppercase">Critical Stock</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {Array.isArray(notifications) ? notifications.filter(n => 
                      (n.type === 'CRITICAL_STOCK' || n.type === 'LOW_STOCK' || n.priority === 'critical') && 
                      n.status !== 'resolved' && n.resolution_status !== 'resolved' && !n.resolved && !n.is_resolved && !n.resolved_at
                    ).length : 0}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all bg-white shadow-lg hover:shadow-green-200 hover:-translate-y-1">
            <div className="absolute w-20 h-20 bg-green-100 rounded-full -top-4 -right-4 opacity-20"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium tracking-wider text-green-600 uppercase">Resolved</p>
                  <p className="text-3xl font-bold text-green-900">
                    {Array.isArray(notifications) ? notifications.filter(n => 
                      n.status === 'resolved' || n.resolution_status === 'resolved' || n.resolved === true || n.is_resolved === true || n.resolved_at
                    ).length : 0}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden transition-all bg-white shadow-lg hover:shadow-yellow-200 hover:-translate-y-1">
            <div className="absolute w-20 h-20 bg-yellow-100 rounded-full -top-4 -right-4 opacity-20"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium tracking-wider text-yellow-600 uppercase">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {Array.isArray(notifications) ? notifications.filter(n => 
                      !n.acknowledged_at && n.status !== 'resolved' && n.resolution_status !== 'resolved' && !n.resolved && !n.is_resolved && !n.resolved_at
                    ).length : 0}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
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
                  <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none sm:w-64"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none"
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
                  className="flex items-center gap-2 text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4" />
                  Batch Check
                </Button>

                <Button
                  onClick={fetchNotifications}
                  variant="outline"
                  className="flex items-center gap-2 text-gray-700 transition-all border-gray-300 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4" />
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
                <div className="p-6 mb-6 bg-gray-100 rounded-full">
                  <HiBell className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 font-heading">No Heat Alerts Found</h3>
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
                  className={`overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                    notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500'
                      : notification.type === 'CRITICAL_STOCK' || notification.type === 'LOW_STOCK' || notification.priority === 'critical' 
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500' 
                        : !notification.acknowledged_at 
                          ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500' 
                          : 'bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-500'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1 space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg font-semibold text-gray-900 font-heading">
                                {notification.title || `🌶️ Stock Alert - ${notification.product_name || notification.entity_id}`}
                              </h3>
                              <p className="mb-2 leading-relaxed text-gray-700">
                                {notification.message}
                              </p>
                              {notification.entity_id && (
                                <div className="inline-flex items-center px-3 py-1 mb-3 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                  <Package className="w-3 h-3 mr-1" />
                                  Product ID: {notification.entity_id}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              {getPriorityBadge(notification)}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(notification.created_at)}
                            </div>
                            {notification.acknowledged_at && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <CheckCircle className="w-3 h-3" />
                                Acknowledged: {formatDate(notification.acknowledged_at)}
                              </div>
                            )}
                            {(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Resolved: {notification.resolved_at ? formatDate(notification.resolved_at) : 'Just now'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        {!notification.acknowledged_at && !(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                          <Button
                            onClick={() => acknowledgeNotification(notification.id)}
                            size="sm"
                            variant="outline"
                            className="text-green-600 transition-all border-green-300 hover:bg-green-50 hover:border-green-400"
                          >
                            <HiCheck className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        
                        {notification.entity_id && !(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                          <>
                            <Button
                              onClick={() => navigateToInventory(notification.entity_id)}
                              size="sm"
                              variant="outline"
                              className="text-blue-600 transition-all border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                            >
                              <Package className="w-3 h-3 mr-1" />
                              Check Stock
                            </Button>
                            
                            <Button
                              onClick={() => resolveProductNotifications(notification.entity_id)}
                              size="sm"
                              className="text-white transition-all bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolve
                            </Button>
                          </>
                        )}
                        
                        {(notification.status === 'resolved' || notification.resolution_status === 'resolved' || notification.resolved === true || notification.is_resolved === true || notification.resolved_at) && (
                          <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                            <CheckCircle className="w-3 h-3" />
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

export default Notifs