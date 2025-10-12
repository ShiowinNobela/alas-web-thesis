import RoleBadge from '@/components/bigComponents/RoleBadge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Card, Alert, Badge } from 'flowbite-react';
import { Bell, User, Clock, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';

const fetchLogs = async () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { data } = await axios.get('/api/logs/admin-audit-logs', {
    headers: { Authorization: `Bearer ${user?.token}` },
  });
  return data.data;
};

const formatValue = (val) => {
  if (val === null || val === undefined) return '(empty)';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  return val;
};

const formatData = (data) => {
  if (!data) return null;
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${key
          .split('_')
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' ')}: ${formatValue(value)}`
    )
    .join(', ');
};

const ACTION_TYPE_COLORS = {
  CREATE: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300',
  UPDATE:
    'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-200 dark:text-purple-900 dark:hover:bg-purple-300',
  DELETE: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:hover:bg-red-300',
  ACTIVATE:
    'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300',
  DEACTIVATE: 'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-200 dark:text-pink-900 dark:hover:bg-pink-300',
  ADJUST_STOCK:
    'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-yellow-300',
  PROCESS:
    'bg-yellow-200 text-yellow-700 hover:bg-yellow-300 dark:bg-yellow-300 dark:text-yellow-800 dark:hover:bg-yellow-400',
  SHIP: 'bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-300 dark:text-green-900 dark:hover:bg-green-400',
  DELIVER: 'bg-blue-200 text-blue-800 hover:bg-blue-300 dark:bg-blue-300 dark:text-blue-900 dark:hover:bg-blue-400',
  CANCEL: 'bg-red-300 text-red-800 hover:bg-red-400 dark:bg-red-400 dark:text-red-900 dark:hover:bg-red-500',
};

const ENTITY_TYPE_COLORS = {
  USER: 'teal',
  PRODUCT: 'yellow',
  ORDER: 'indigo',
};

function NotificationPage() {
  const {
    data: logs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['adminLogs'],
    queryFn: fetchLogs,
    refetchInterval: 30000,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const [expandedLogs, setExpandedLogs] = useState({});

  const toggleExpand = (logId) => {
    setExpandedLogs((prev) => ({
      ...prev,
      [logId]: !prev[logId],
    }));
  };

  if (isError) {
    return (
      <Alert color="failure" className="m-4">
        Failed to load logs.
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-admin p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-4 shadow ring-1">
          <div className="mb-4 flex items-center">
            <Bell className="text-primary mr-2 h-5 w-5" />
            <h1 className="text-content text-lg font-semibold">Admin Activity Logs</h1>
          </div>

          {isLoading ? (
            <TableSkeleton columns={4} rows={10} />
          ) : logs.length === 0 ? (
            <Card className="text-center">
              <FileText className="text-lighter mx-auto h-8 w-8" />
              <h3 className="text-md mt-2 font-medium">No activity logs found</h3>
              <p className="text-lighter text-sm">There are no activity logs to display at this time.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <Card key={log.id} className="ring-1">
                  {/* Header row: action + user + timestamp */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => toggleExpand(log.id)} className="text-content hover:text-lighter">
                        <ChevronDown
                          className={`size-5 transition-transform ${expandedLogs[log.id] ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <Badge
                        size="sm"
                        className={`font-normal ${ACTION_TYPE_COLORS[log.action_type] || 'bg-gray-400 text-white'}`}
                      >
                        {log.action_type || 'LOG'}
                      </Badge>
                      <Badge color={ENTITY_TYPE_COLORS[log.entity_type] || 'gray'} size="sm" className="font-normal">
                        {log.entity_type}
                      </Badge>
                      {log.description && <span className="max-w-sm truncate text-sm">{log.description}</span>}
                    </div>

                    {/* User + role + timestamp */}
                    <div className="flex items-center gap-2 text-sm">
                      <Badge icon={User} color="gray" className="px-4 font-normal">
                        {log.username || 'Unknown'}
                      </Badge>

                      {log.role && <RoleBadge role={log.role} />}
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{dayjs(log.created_at).format('MMM DD, HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  {expandedLogs[log.id] && (
                    <div className="ml-2 border-l-2 pl-6 text-sm">
                      {(log.before_data || log.after_data) && (
                        <div className="grid grid-cols-2 gap-4">
                          {/* BEFORE */}
                          {log.before_data && (
                            <div className="rounded-lg border border-red-300 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/40">
                              <h4 className="mb-1 font-semibold text-red-700 dark:text-red-300">Before</h4>
                              <div className="overflow-hidden break-words text-red-800 dark:text-red-200">
                                {formatData(log.before_data)}
                              </div>
                            </div>
                          )}

                          {/* AFTER */}
                          {log.after_data && (
                            <div className="rounded-lg border border-green-300 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/40">
                              <h4 className="mb-1 font-semibold text-green-700 dark:text-green-300">After</h4>
                              <div className="overflow-hidden break-words text-green-800 dark:text-green-200">
                                {formatData(log.after_data)}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default NotificationPage;
