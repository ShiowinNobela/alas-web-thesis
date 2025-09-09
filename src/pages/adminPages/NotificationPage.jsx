import RoleBadge from '@/components/bigComponents/RoleBadge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Card, Spinner, Alert, Badge } from 'flowbite-react';
import { Bell, User, Clock, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import EmptyState from '@/components/States/EmptyState';

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
  CREATE: 'lime',
  UPDATE: 'teal',
  DELETE: 'failure',
  ACTIVATE_PRODUCT: 'green',
  DEACTIVATE_PRODUCT: 'pink',
  ACTIVATE_USER: 'green',
  DEACTIVATE_USER: 'pink',
  ADJUST_STOCK: 'cyan',
};

function NotificationPage() {
  const {
    data: logs = [],
    isLoading,
    isError,
    refetch,
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
    
    <div className="p-4 bg-admin">
      <main className="w-full p-4 mx-auto overflow-x-auto border shadow bg-card rounded-xl ring-1">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-lg font-semibold text-content">
            Admin Activity Logs
          </h1>
        </div>

        {isLoading ? (
          <TableSkeleton columns={4} rows={10} />
        ) : logs.length === 0 ? (
          <Card className="text-center">
            <FileText className="w-8 h-8 mx-auto text-lighter" />
            <h3 className="mt-2 font-medium text-md">No activity logs found</h3>
            <p className="text-sm text-lighter">
              There are no activity logs to display at this time.
            </p>
          </Card>
        ) : isError ? (
        <ErrorState 
                error={isOrdersError}
                onRetry={refetchOrders}
                title="Failed to load Notifications"
                retryText="Retry Request"
              /> ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <Card key={log.id} className="ring-1">
                {/* Header row: action + user + timestamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleExpand(log.id)}
                      className="text-content hover:text-lighter"
                    >
                      <ChevronDown
                        className={`size-5 transition-transform ${
                          expandedLogs[log.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <Badge
                      color={ACTION_TYPE_COLORS[log.action_type] || 'gray'}
                      size="sm"
                      className="font-normal"
                    >
                      {log.action_type || 'LOG'}
                    </Badge>
                    {log.description && (
                      <span className="max-w-sm text-sm truncate text-lighter">
                        {log.description}
                      </span>
                    )}
                  </div>

                  {/* User + role + timestamp */}
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      icon={User}
                      color="gray"
                      className="px-4 font-normal"
                    >
                      {log.username || 'Unknown'}
                    </Badge>

                    {log.role && <RoleBadge role={log.role} />}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {dayjs(log.created_at).format('MMM DD, HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedLogs[log.id] && (
                  <div className="pl-8 ml-2 space-y-2 text-sm border-l-2">
                    {(log.before_data || log.after_data) && (
                      <div className="space-y-1">
                        {log.before_data && (
                          <div className="flex items-start gap-2">
                            <Badge
                              color="failure"
                              className="items-center flex-shrink-0 font-normal uppercase w-15"
                            >
                              Before
                            </Badge>
                            <div className="flex-1 overflow-hidden text-red-800 break-words dark:text-red-200">
                              {formatData(log.before_data)}
                            </div>
                          </div>
                        )}
                        {log.after_data && (
                          <div className="flex items-start gap-2">
                            <Badge
                              color="success"
                              className="items-center flex-shrink-0 font-normal uppercase w-15"
                            >
                              After
                            </Badge>
                            <div className="flex-1 overflow-hidden text-green-800 break-words dark:text-green-200">
                              {formatData(log.after_data)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {log.entity_type && (
                      <div className="flex items-center gap-2">
                        <Badge color="gray" size="xs">
                          {log.entity_type}
                        </Badge>
                        <span className="font-mono">
                          {log.entity_id}
                          {log.entity_name ? ` (${log.entity_name})` : ''}
                        </span>
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
