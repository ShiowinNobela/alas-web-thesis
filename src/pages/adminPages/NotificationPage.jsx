import RoleBadge from '@/components/bigComponents/RoleBadge';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Card, Alert, Badge, Button } from 'flowbite-react';
import { Bell, User, Clock, FileText, ChevronDown, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

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


const LogSkeleton = () => (
  <Card className="ring-1 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-20 h-6 bg-gray-300 rounded"></div>
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 h-6 bg-gray-300 rounded"></div>
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </Card>
);


const LogItem = ({ log, isExpanded, onToggle }) => (
  <Card key={log.id} className="ring-1">

    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(log.id)}
          className="text-content hover:text-lighter"
        >
          <ChevronDown
            className={`size-5 transition-transform ${
              isExpanded ? 'rotate-180' : ''
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


    {isExpanded && (
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
);

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

  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen p-4 bg-admin">
          <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <p className="mb-2 font-medium">Failed to load logs</p>
            <p className="mb-4 text-sm">{error.message}</p>
            <Button onClick={resetError} color="failure">
              Try Again
            </Button>
          </div>
        </div>
      )}
    >
      <div className="min-h-screen p-4 bg-admin">
        <div className="mx-auto max-w-screen-2xl">
          <Card className="mb-4 bg-card ring-1">
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-2" />
              <h1 className="text-2xl font-bold">Admin Activity Logs</h1>
            </div>
          </Card>

          
          {isError && (
            <Alert color="failure" icon={AlertTriangle} className="mb-4">
              <div className="flex items-center justify-between">
                <span>Failed to load logs. Please try again later.</span>
                <Button size="xs" onClick={() => refetch()} color="failure">
                  Try Again
                </Button>
              </div>
            </Alert>
          )}

         
          {isLoading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, idx) => (
                <LogSkeleton key={idx} />
              ))}
            </div>
          )}

          
          {!isLoading && logs.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">No activity logs found</h3>
              <p className="mb-6 text-gray-500">There are no activity logs to display at this time.</p>
            </div>
          )}

          
          {!isLoading && logs.length > 0 && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {logs.map((log) => (
                <LogItem 
                  key={log.id} 
                  log={log} 
                  isExpanded={expandedLogs[log.id]} 
                  onToggle={toggleExpand} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default NotificationPage;
