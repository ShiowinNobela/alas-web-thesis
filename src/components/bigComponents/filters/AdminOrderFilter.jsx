// src/components/Filters/AdminOrderFilters.jsx
import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Datepicker, TextInput, Button } from 'flowbite-react';
import { HiOutlineSearch } from 'react-icons/hi';
import dayjs from 'dayjs';
import StatusFilterDropdown from '@/components/StatusFilterDropdown';

const AdminOrderFilters = ({ onRefresh, onSearch, searchId, setSearchId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDateKey, setStartDateKey] = useState(0);
  const [endDateKey, setEndDateKey] = useState(0);

  // Get filter values from URL or use defaults
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || null;
  const endDate = searchParams.get('endDate') || null;

  useEffect(() => {
    if (!startDate) {
      setStartDateKey((prev) => prev + 1);
    }
  }, [startDate]);

  useEffect(() => {
    if (!endDate) {
      setEndDateKey((prev) => prev + 1);
    }
  }, [endDate]);

  const handleStatusChange = useCallback(
    (newStatus) => {
      const params = new URLSearchParams(searchParams);
      if (newStatus) {
        params.set('status', newStatus);
      } else {
        params.delete('status');
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleStartDateChange = useCallback(
    (date) => {
      const params = new URLSearchParams(searchParams);
      if (date) {
        params.set('startDate', dayjs(date).format('YYYY-MM-DD'));
        // If end date is not set, automatically set it to today
        if (!params.get('endDate')) {
          params.set('endDate', dayjs().format('YYYY-MM-DD'));
          // Force re-render of end date picker by updating its key
          setEndDateKey((prev) => prev + 1);
        }
      } else {
        params.delete('startDate');
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleEndDateChange = useCallback(
    (date) => {
      const params = new URLSearchParams(searchParams);
      if (date) {
        params.set('endDate', dayjs(date).format('YYYY-MM-DD'));
      } else {
        params.delete('endDate');
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleResetFilters = useCallback(() => {
    setSearchParams({});
    setSearchId('');
    onRefresh();
  }, [setSearchParams, setSearchId, onRefresh]);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 px-2">
      <div className="flex w-full items-center gap-2 sm:w-[30%]">
        <TextInput
          placeholder="Search order by ID..."
          value={searchId}
          icon={HiOutlineSearch}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          color="white"
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="w-[22%]">
          <Datepicker
            key={`start-${startDateKey}`}
            placeholder="Start date"
            value={startDate ? new Date(startDate) : null}
            onChange={handleStartDateChange}
            maxDate={new Date()}
            color="white"
          />
        </div>
        <h3>TO</h3>
        <div className="w-[22%]">
          <Datepicker
            key={`end-${endDateKey}`}
            placeholder="End date"
            value={endDate ? new Date(endDate) : null}
            onChange={handleEndDateChange}
            minDate={startDate ? new Date(startDate) : null}
            maxDate={new Date()}
            color="white"
          />
        </div>

        <StatusFilterDropdown selected={status} onChange={handleStatusChange} />

        <Button onClick={handleResetFilters} color="gray">
          Reset All
        </Button>
      </div>
    </div>
  );
};

export default AdminOrderFilters;
