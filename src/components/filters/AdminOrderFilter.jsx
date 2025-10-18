import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextInput, Button } from 'flowbite-react';
import { Search } from 'lucide-react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import StatusFilterDropdown from '@/components/filters/StatusFilterDropdown';
import { DateRangeSelector } from '../bigComponents/DateRangeSelector';
import { CalendarDate } from '@internationalized/date';

const parseCalendarDate = (dateString) => {
  if (!dateString) return null;
  const d = dayjs(dateString);
  if (!d.isValid()) return null;
  return new CalendarDate(d.year(), d.month() + 1, d.date()); // month +1 because CalendarDate is 1-based
};

const AdminOrderFilters = ({ onRefresh, onSearch, searchId, setSearchId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [dateRange, setDateRange] = useState({
    start: searchParams.get('startDate') || '',
    end: searchParams.get('endDate') || '',
  });

  // Update query params whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (dateRange.start) params.set('startDate', dateRange.start);
    if (dateRange.end) params.set('endDate', dateRange.end);
    setSearchParams(params);
  }, [status, dateRange, setSearchParams]);

  const handleResetFilters = useCallback(() => {
    setStatus('');
    setDateRange({ start: '', end: '' });
    setSearchId('');
    setSearchParams({});
    onRefresh();
  }, [setSearchParams, setSearchId, onRefresh]);

  const parsedDateRange =
    dateRange.start && dateRange.end
      ? {
          start: parseCalendarDate(dateRange.start),
          end: parseCalendarDate(dateRange.end),
        }
      : null;

  return (
    <div className="flex w-full flex-wrap items-center gap-3 px-2">
      {/* Search by ID */}
      <div className="flex min-w-[200px] flex-[0_0_20%] items-center gap-2">
        <TextInput
          placeholder="Search order by ID..."
          value={searchId}
          icon={Search}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          color="gray"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {/* Date Range Selector */}
        <div>
          <DateRangeSelector
            value={parsedDateRange}
            onChange={(range) =>
              setDateRange({
                start: range?.start?.toString() || '',
                end: range?.end?.toString() || '',
              })
            }
            placeholder="All Time"
          />
        </div>

        {/* Status Filter */}
        <StatusFilterDropdown selected={status} onChange={setStatus} />

        {/* Reset Filters */}
        <Button color="gray" onClick={handleResetFilters}>
          Reset All
        </Button>
      </div>
    </div>
  );
};

AdminOrderFilters.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchId: PropTypes.string.isRequired,
  setSearchId: PropTypes.func.isRequired,
};

export default AdminOrderFilters;
