// components/order/OrderFiltersPanel.jsx
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputSearch from '@/components/bigComponents/inputSearch';
import { useSearchParams } from 'react-router-dom';
import { Brush, Eraser, SwatchBook } from 'lucide-react';

const statuses = [
  'pending',
  'processing',
  'shipping',
  'delivered',
  'cancelled',
  'refunded',
  'returned',
];

const items = [
  { value: 'gcash', label: 'GCash', Icon: SwatchBook },
  { value: 'maya', label: 'Maya', Icon: Brush },
  { value: 'bank_transfer', label: 'Bank', Icon: Eraser },
];

export default function OrderFiltersPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStatuses = searchParams.getAll('status');
  const selectedPayments = searchParams.getAll('payment_method');

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

  const clearFilters = (filterType) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(filterType);
        return newParams;
      },
      { replace: true }
    );
  };

  return (
    <Card className="text-content flex h-full w-full shrink-0 flex-col gap-4 rounded-xl p-4 shadow lg:w-64">
      <div className="border-lighter flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-bold">Filters</h3>
        {(selectedStatuses.length > 0 || selectedPayments.length > 0) && (
          <button
            onClick={() => {
              clearFilters('status');
              clearFilters('payment_method');
            }}
            className="text-primary hover:text-primary/70 text-xs font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <InputSearch placeholder="Search orders..." />

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
