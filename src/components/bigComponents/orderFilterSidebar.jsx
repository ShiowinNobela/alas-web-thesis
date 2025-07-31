// components/order/OrderFiltersPanel.jsx
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Brush, Eraser, SwatchBook } from 'lucide-react';
import InputSearch from '@/components/bigComponents/inputSearch';
import { useSearchParams } from 'react-router-dom';

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
    <Card className="text-content flex h-full w-56 shrink-0 flex-col gap-4 rounded-2xl p-4 shadow">
      <h3 className="font-heading border-b border-gray-200 text-lg">Filters</h3>

      {/* Search Order ID */}
      <div className="mb-2">
        <InputSearch placeholder="Search orders..." />
      </div>

      {/* Status Filter */}
      <div className="border-b border-gray-100 pb-4">
        <h4 className="mb-3 flex items-center justify-between text-sm font-medium">
          <span>Status</span>
          {selectedStatuses.length > 0 && (
            <button
              onClick={() => clearFilters('status')}
              className="text-info hover:text-info/70 text-xs"
            >
              Clear
            </button>
          )}
        </h4>
        <div className="leading-loose">
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
              htmlFor={status}
            >
              <Checkbox
                id={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleFilter('status', status)}
              />
              <span className="capitalize">{status}</span>
              <span className="ml-auto text-xs text-gray-400">
                {/* Optional: Add count here if available */}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="pb-2">
        <h4 className="mb-3 flex items-center justify-between text-sm font-medium">
          <span>Payment Method</span>
          {selectedPayments.length > 0 && (
            <button
              onClick={() => clearFilters('payment_method')}
              className="text-info hover:text-info/70 text-xs"
            >
              Clear
            </button>
          )}
        </h4>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.value}
              className={`relative flex items-center gap-3 rounded-md border p-2 ${
                selectedPayments.includes(item.value)
                  ? 'border-primary bg-muted'
                  : 'border-lighter hover:border-primary/40'
              }`}
            >
              <Checkbox
                checked={selectedPayments.includes(item.value)}
                onCheckedChange={() =>
                  toggleFilter('payment_method', item.value)
                }
              />
              <div className="flex items-center gap-2 text-sm">
                {item.Icon && <item.Icon size={16} aria-hidden="true" />}
                <Label>{item.label}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Add a clear all button at the bottom */}
      {(selectedStatuses.length > 0 || selectedPayments.length > 0) && (
        <button
          onClick={() => {
            clearFilters('status');
            clearFilters('payment_method');
          }}
          className="text-info hover:text-info/70 mt-auto text-left text-sm"
        >
          Clear all filters
        </button>
      )}
    </Card>
  );
}
