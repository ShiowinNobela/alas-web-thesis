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
    <Card className="flex flex-col w-full h-full gap-4 p-4 overflow-y-scroll shadow text-content shrink-0 rounded-xl lg:w-72">
      <div className="flex items-center justify-between pb-2 border-b border-lighter">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => clearFilters('all')}
            className="text-xs font-medium text-primary hover:text-primary/70"
          >
            Clear All
          </button>
        )}
      </div>

      <InputSearch placeholder="Search orders..." />

      <div className="relative pb-3 border-b border-lighter">
        <h4 className="flex items-center justify-between mb-2 text-sm font-semibold">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            Month & Year
          </span>
          {selectedMonthYear && (
            <button
              onClick={() => clearFilters('month_year')}
              className="text-xs font-medium text-primary hover:text-primary/70"
            >
              Clear
            </button>
          )}
        </h4>

        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center justify-between w-full p-2 text-sm border border-gray-300 rounded hover:bg-gray-500"
        >
          <span className={monthYearFilter ? 'text-white ' : 'text-gray-500'}>
            {formatMonthYear(monthYearFilter)}
          </span>
          <Calendar size={16} className="text-gray-500" />
        </button>

        {/* Calendar Dropdown */}
        {showCalendar && (
          <div className="absolute left-0 right-0 z-10 p-3 mt-1 bg-gray-700 border border-gray-200 rounded-lg shadow-lg top-full">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => navigateYear(-1)} className="p-1 rounded hover:bg-gray-100">
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
              <button onClick={() => navigateYear(1)} className="p-1 rounded hover:bg-gray-100">
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
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
                <span className="text-sm">Selected: {formatMonthYear(monthYearFilter)}</span>
                <button
                  onClick={() => handleMonthYearChange('')}
                  className="flex items-center text-sm text-red-500 hover:text-red-700"
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
      <div className="pb-3 border-b border-lighter">
        <h4 className="flex items-center justify-between mb-2 text-sm font-semibold">
          <span>Order Status</span>
          {selectedStatuses.length > 0 && (
            <button
              onClick={() => clearFilters('status')}
              className="text-xs font-medium text-primary hover:text-primary/70"
            >
              Clear ({selectedStatuses.length})
            </button>
          )}
        </h4>
        <div className="space-y-1">
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 px-2 py-1 text-sm rounded cursor-pointer text-lighter hover:bg-gray-50"
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
        <h4 className="flex items-center justify-between mb-2 text-sm font-semibold">
          <span>Payment Method</span>
          {selectedPayments.length > 0 && (
            <button
              onClick={() => clearFilters('payment_method')}
              className="text-xs font-medium text-primary hover:text-primary/70"
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
