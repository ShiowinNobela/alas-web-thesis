import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Datepicker, TextInput, Button } from 'flowbite-react';
import { HiOutlineSearch } from 'react-icons/hi';
import dayjs from 'dayjs';
import StatusFilterDropdown from '@/components/filters/StatusFilterDropdown';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderReportPDF from '@/components/ReportFormats/OrderReportPDF';

const AdminOrderFilters = ({ onRefresh, onSearch, searchId, setSearchId, orders, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || null;
  const endDate = searchParams.get('endDate') || null;

  const handleStatusChange = useCallback(
    (newStatus) => {
      const params = new URLSearchParams(searchParams);
      if (newStatus) params.set('status', newStatus);
      else params.delete('status');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleStartDateChange = useCallback(
    (date) => {
      const params = new URLSearchParams(searchParams);
      if (date) {
        params.set('startDate', dayjs(date).format('YYYY-MM-DD'));
        if (!params.get('endDate')) params.set('endDate', dayjs().format('YYYY-MM-DD'));
      } else params.delete('startDate');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleEndDateChange = useCallback(
    (date) => {
      const params = new URLSearchParams(searchParams);
      if (date) params.set('endDate', dayjs(date).format('YYYY-MM-DD'));
      else params.delete('endDate');
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
    <div className="flex w-full flex-wrap items-center gap-3 px-2">
      {/* Search */}
      <div className="flex min-w-[200px] flex-[0_0_20%] items-center gap-2">
        <TextInput
          placeholder="Search order by ID..."
          value={searchId}
          icon={HiOutlineSearch}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          color="gray"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-1 items-center justify-end gap-2">
        <div className="min-w-[190px] flex-[0_0_18%]">
          <Datepicker
            placeholder="Start date"
            value={startDate ? new Date(startDate) : null}
            onChange={handleStartDateChange}
            maxDate={new Date()}
            color="gray"
          />
        </div>
        <h3 className="whitespace-nowrap">TO</h3>
        <div className="min-w-[190px] flex-[0_0_18%]">
          <Datepicker
            placeholder="End date"
            value={endDate ? new Date(endDate) : null}
            onChange={handleEndDateChange}
            minDate={startDate ? new Date(startDate) : null}
            maxDate={new Date()}
            color="gray"
          />
        </div>

        <StatusFilterDropdown selected={status} onChange={handleStatusChange} />

        <Button color="gray" onClick={handleResetFilters}>
          Reset All
        </Button>

        <PDFDownloadLink
          document={<OrderReportPDF orders={orders} startDate={startDate} endDate={endDate} />}
          fileName={`orders-${startDate || 'all'}-to-${endDate || 'all'}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <Button className="rounded bg-gray-300 px-3 py-2 text-sm text-gray-700">Preparing...</Button>
            ) : (
              <Button disabled={isLoading} color="gray">
                Download PDF
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default AdminOrderFilters;
