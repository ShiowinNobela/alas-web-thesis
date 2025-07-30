import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { IoIosNotifications } from 'react-icons/io';
import {
  HiOutlineSearch,
  HiOutlineRefresh,
  HiUser,
  HiClock,
  HiDocumentText,
} from 'react-icons/hi';
import { toast, Toaster } from 'sonner';
import dayjs from 'dayjs';

function NotificationPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const logsPerPage = 10;

  const user = JSON.parse(window.localStorage.getItem('user'));

  const fetchLogs = useCallback(
    async (page = 1, search = '') => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: logsPerPage.toString(),
        });

        if (search.trim()) {
          params.append('search', search);
        }

        const response = await axios.get(
          `/api/admin-activity-logs?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          const responseData = response.data.data;

          // Try different possible structures
          let adminLogs = [];
          let pagination = {};

          if (responseData.adminLogs) {
            // Structure: { adminLogs: [], pagination: {} }
            adminLogs = responseData.adminLogs;
            pagination = responseData.pagination || {};
          } else if (Array.isArray(responseData)) {
            // Structure: [log1, log2, ...]
            adminLogs = responseData;
          } else if (responseData.logs) {
            // Structure: { logs: [], pagination: {} }
            adminLogs = responseData.logs;
            pagination = responseData.pagination || {};
          } else {
            // Look for any array property
            for (const key of Object.keys(responseData)) {
              if (Array.isArray(responseData[key])) {
                adminLogs = responseData[key];
                break;
              }
            }
          }

          setLogs(adminLogs);
          setTotalPages(pagination.total_pages || 1);
          setTotalLogs(pagination.total_records || 0);
          setCurrentPage(pagination.current_page || page);
        } else {
          // Fallback for unexpected response structure
          setLogs([]);
          setTotalPages(1);
          setTotalLogs(0);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error('Error fetching admin activity logs:', error);
        toast.error('Failed to fetch activity logs');
      } finally {
        setLoading(false);
      }
    },
    [user?.token]
  );

  useEffect(() => {
    fetchLogs(1, searchTerm);

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchLogs(currentPage, searchTerm);
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLogs, searchTerm]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLogs(1, searchTerm);
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchLogs(1, '');
  };

  // Test function to manually create a log entry
  const testActivityLog = async () => {
    try {
      const response = await axios.post(
        '/api/admin-activity-logs/test',
        {
          action: 'TEST',
          description: 'Manual test log entry',
          details: { test: true, timestamp: new Date().toISOString() },
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success('Test log created successfully');
      // Refresh logs after creating test entry
      setTimeout(() => fetchLogs(1, ''), 1000);
    } catch (error) {
      console.error('Test log creation failed:', error);
      toast.error('Test log creation failed');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLogs(newPage, searchTerm);
    }
  };

  const getActionColor = (action) => {
    const actionColors = {
      CREATE: 'text-green-600 bg-green-50',
      UPDATE: 'text-blue-600 bg-blue-50',
      DELETE: 'text-red-600 bg-red-50',
      LOGIN: 'text-purple-600 bg-purple-50',
      LOGOUT: 'text-gray-600 bg-gray-50',
      EDIT: 'text-blue-600 bg-blue-50',
      MODIFY: 'text-orange-600 bg-orange-50',
      INVENTORY_UPDATE: 'text-indigo-600 bg-indigo-50',
      PRICE_UPDATE: 'text-yellow-600 bg-yellow-50',
      STOCK_UPDATE: 'text-cyan-600 bg-cyan-50',
      PRODUCT_UPDATE: 'text-blue-600 bg-blue-50',
      ORDER_STATUS_UPDATE: 'text-purple-600 bg-purple-50',
      USER_STATUS_UPDATE: 'text-orange-600 bg-orange-50',
      ADJUST_STOCK: 'text-indigo-600 bg-indigo-50',
      ADJUST: 'text-indigo-600 bg-indigo-50',
    };
    return actionColors[action?.toUpperCase()] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="h-screen w-full overflow-auto bg-white p-5">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex flex-row justify-between rounded-t-2xl bg-gray-300 p-5">
          <div className="flex h-full flex-row items-center justify-center">
            <IoIosNotifications className="text-secondary mr-3 text-4xl" />
            <h1 className="text-secondary text-2xl font-bold">
              Admin Activity Logs
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="focus:ring-primary rounded border border-gray-300 bg-white px-4 py-2 text-black shadow-md focus:ring-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-dark flex items-center rounded px-4 py-2 text-white transition-colors"
            >
              <HiOutlineSearch className="mr-1 h-4 w-4" />
              Search
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
            >
              <HiOutlineRefresh className="mr-1 h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={testActivityLog}
              className="flex items-center rounded bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
            >
              Test Log
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col rounded-b-2xl bg-gray-50 p-5 shadow-lg">
          {/* Stats */}
          <div className="mb-4 rounded-lg border bg-white p-3">
            <p className="text-sm text-gray-600">
              Total Activity Logs:{' '}
              <span className="text-primary font-semibold">{totalLogs}</span>
              {searchTerm && (
                <span className="ml-2">
                  | Showing results for:{' '}
                  <span className="font-semibold">"{searchTerm}"</span>
                </span>
              )}
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
              <span className="ml-2 text-gray-600">
                Loading activity logs...
              </span>
            </div>
          ) : (
            <>
              {/* Logs Table */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="py-12 text-center">
                    <HiDocumentText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No activity logs found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm
                        ? 'Try adjusting your search terms.'
                        : 'No admin activities have been logged yet.'}
                    </p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      {/* Header */}
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getActionColor(log.action_type)}`}
                          >
                            {log.action_type}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <HiUser className="mr-1 h-4 w-4" />
                            <span>
                              {log.username ||
                                log.user_name ||
                                log.admin_name ||
                                log.name ||
                                (log.first_name && log.last_name
                                  ? `${log.first_name} ${log.last_name}`
                                  : log.first_name) ||
                                'Unknown Admin'}
                              {log.role && (
                                <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                                  {log.role}
                                </span>
                              )}
                            </span>
                          </div>
                          {log.entity_type && (
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                                {log.entity_type}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <HiClock className="mr-1 h-4 w-4" />
                          {dayjs(log.created_at).format(
                            'MMM DD, YYYY - HH:mm:ss'
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="border-t border-gray-100 pt-3">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <p className="mb-1 text-sm font-medium text-gray-900">
                              Description
                            </p>
                            <p className="text-sm text-gray-600">
                              {log.description || 'No description available'}
                            </p>
                          </div>
                          {(log.before_data || log.after_data) && (
                            <div>
                              <p className="mb-1 text-sm font-medium text-gray-900">
                                Changes
                              </p>
                              <div className="space-y-1 rounded bg-gray-50 p-2 font-mono text-sm text-gray-600">
                                {log.before_data && (
                                  <div>
                                    <span className="text-red-600">
                                      Before:
                                    </span>{' '}
                                    {typeof log.before_data === 'object'
                                      ? JSON.stringify(log.before_data)
                                      : log.before_data}
                                  </div>
                                )}
                                {log.after_data && (
                                  <div>
                                    <span className="text-green-600">
                                      After:
                                    </span>{' '}
                                    {typeof log.after_data === 'object'
                                      ? JSON.stringify(log.after_data)
                                      : log.after_data}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                          {log.entity_id && (
                            <span>
                              Entity ID:{' '}
                              <span className="font-mono">{log.entity_id}</span>
                            </span>
                          )}
                          {log.ip_address && (
                            <span>
                              IP:{' '}
                              <span className="font-mono">
                                {log.ip_address}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between rounded-lg border-t border-gray-200 bg-white px-4 py-3">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                          {(currentPage - 1) * logsPerPage + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * logsPerPage, totalLogs)}
                        </span>{' '}
                        of <span className="font-medium">{totalLogs}</span>{' '}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                  page === currentPage
                                    ? 'bg-primary focus-visible:outline-primary z-10 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2'
                                    : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 3 ||
                            page === currentPage + 3
                          ) {
                            return (
                              <span
                                key={page}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default NotificationPage;
