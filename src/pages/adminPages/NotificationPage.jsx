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
  CREATE: 'blue',
  UPDATE: 'purple',
  DELETE: 'red',
  ACTIVATE_PRODUCT: 'green',
  DEACTIVATE_PRODUCT: 'pink',
  ACTIVATE_USER: 'green',
  DEACTIVATE_USER: 'pink',
  ADJUST_STOCK: 'yellow',
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
                      <Badge color={ACTION_TYPE_COLORS[log.action_type] || 'gray'} size="sm" className="font-normal">
                        {log.action_type || 'LOG'}
                      </Badge>
                      {log.description && (
                        <span className="text-lighter max-w-sm truncate text-sm">{log.description}</span>
                      )}
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

                  {/* Expanded details */}
                  {expandedLogs[log.id] && (
                    <div className="ml-2 space-y-2 border-l-2 pl-8 text-sm">
                      {(log.before_data || log.after_data) && (
                        <div className="space-y-1">
                          {log.before_data && (
                            <div className="flex items-start gap-2">
                              <Badge color="failure" className="w-15 flex-shrink-0 items-center font-normal uppercase">
                                Before
                              </Badge>
                              <div className="flex-1 overflow-hidden break-words text-red-800 dark:text-red-200">
                                {formatData(log.before_data)}
                              </div>
                            </div>
                          )}
                          {log.after_data && (
                            <div className="flex items-start gap-2">
                              <Badge color="success" className="w-15 flex-shrink-0 items-center font-normal uppercase">
                                After
                              </Badge>
                              <div className="flex-1 overflow-hidden break-words text-green-800 dark:text-green-200">
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
