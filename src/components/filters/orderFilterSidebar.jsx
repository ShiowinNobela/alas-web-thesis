import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputSearch from '@/components/bigComponents/inputSearch';
import { useSearchParams } from 'react-router-dom';
import { Brush, Eraser, SwatchBook, Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const statuses = ['pending', 'processing', 'shipping', 'delivered', 'cancelled', 'refunded', 'returned'];

const items = [
  { value: 'gcash', label: 'GCash', Icon: SwatchBook },
  { value: 'maya', label: 'Maya', Icon: Brush },
  { value: 'bank_transfer', label: 'Bank', Icon: Eraser },
];

export default function OrderFiltersPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [monthYearFilter, setMonthYearFilter] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const selectedStatuses = searchParams.getAll('status');
  const selectedPayments = searchParams.getAll('payment_method');
  const selectedMonthYear = searchParams.get('month_year');

  useEffect(() => {
    setMonthYearFilter(selectedMonthYear || '');
  }, [selectedMonthYear]);

  const toggleFilter = (key, value) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        const current = new Set(newParams.getAll(key));

        if (current.has(value)) {
          current.delete(value);
        } else {
          current.add(value);
        }

        newParams.delete(key);
        current.forEach((v) => newParams.append(key, v));

        return newParams;
      },
      { replace: true }
    );
  };

  const handleMonthYearChange = (value) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        if (value) {
          newParams.set('month_year', value);
        } else {
          newParams.delete('month_year');
        }

        return newParams;
      },
      { replace: true }
    );
    setShowCalendar(false);
  };

  const clearFilters = (filterType) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        if (filterType === 'all') {
          newParams.delete('status');
          newParams.delete('payment_method');
          newParams.delete('month_year');
          setMonthYearFilter('');
        } else {
          newParams.delete(filterType);

          if (filterType === 'month_year') {
            setMonthYearFilter('');
          }
        }

        return newParams;
      },
      { replace: true }
    );
  };

  const formatMonthYear = (value) => {
    if (!value) return 'Select month & year';

    const [year, month] = value.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateMonths = () => {
    const months = [];
    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);
      months.push({
        value: `${currentYear}-${String(month + 1).padStart(2, '0')}`,
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        isCurrent: month === new Date().getMonth() && currentYear === new Date().getFullYear(),
      });
    }

    return months;
  };

  const navigateYear = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() + direction);
      return newDate;
    });
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedPayments.length > 0 || selectedMonthYear;

  return (
    <Card className="text-content flex h-full w-full shrink-0 flex-col gap-4 rounded-xl p-4 shadow lg:w-72">
      <div className="border-lighter flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => clearFilters('all')}
            className="text-primary hover:text-primary/70 text-xs font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <InputSearch placeholder="Search orders..." />

      <div className="border-lighter relative border-b pb-3">
        <h4 className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            Month & Year
          </span>
          {selectedMonthYear && (
            <button
              onClick={() => clearFilters('month_year')}
              className="text-primary hover:text-primary/70 text-xs font-medium"
            >
              Clear
            </button>
          )}
        </h4>

        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex w-full items-center justify-between rounded border border-gray-300 p-2 text-sm hover:bg-gray-500"
        >
          <span className={monthYearFilter ? 'text-white' : 'text-gray-500'}>{formatMonthYear(monthYearFilter)}</span>
          <Calendar size={16} className="text-gray-500" />
        </button>

        {/* Calendar Dropdown */}
        {showCalendar && (
          <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-gray-700 p-3 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <button onClick={() => navigateYear(-1)} className="rounded p-1 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className="font-semibold">{currentDate.getFullYear()}</span>
              <button onClick={() => navigateYear(1)} className="rounded p-1 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {generateMonths().map((month) => (
                <button
                  key={month.value}
                  onClick={() => handleMonthYearChange(month.value)}
                  className={`rounded p-2 text-center text-sm ${
                    monthYearFilter === month.value
                      ? 'bg-blue-500 text-white'
                      : month.isCurrent
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                  }`}
                >
                  {month.label}
                </button>
              ))}
            </div>

            {monthYearFilter && (
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-sm">Selected: {formatMonthYear(monthYearFilter)}</span>
                <button
                  onClick={() => handleMonthYearChange('')}
                  className="text-primary hover:text-primary/75 flex items-center text-sm"
                >
                  <X size={14} className="mr-1" />
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="border-lighter border-b pb-3">
        <h4 className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>Order Status</span>
          {selectedStatuses.length > 0 && (
            <button
              onClick={() => clearFilters('status')}
              className="text-primary hover:text-primary/70 text-xs font-medium"
            >
              Clear ({selectedStatuses.length})
            </button>
          )}
        </h4>
        <div className="space-y-1">
          {statuses.map((status) => (
            <label
              key={status}
              className="text-lighter flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-gray-50"
            >
              <Checkbox
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleFilter('status', status)}
              />
              <span className="capitalize">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h4 className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>Payment Method</span>
          {selectedPayments.length > 0 && (
            <button
              onClick={() => clearFilters('payment_method')}
              className="text-primary hover:text-primary/70 text-xs font-medium"
            >
              Clear
            </button>
          )}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <button
              type="button"
              key={item.value}
              onClick={() => toggleFilter('payment_method', item.value)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                selectedPayments.includes(item.value)
                  ? 'border-primary bg-primary/5 text-primary shadow-sm'
                  : 'hover:border-primary/40 border-gray-200 hover:bg-gray-50'
              }`}
              aria-pressed={selectedPayments.includes(item.value)}
            >
              {item.Icon && <item.Icon size={16} aria-hidden="true" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
