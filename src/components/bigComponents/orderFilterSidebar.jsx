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
    <Card className="text-content flex h-full w-full shrink-0 flex-col gap-4 rounded-2xl p-4 shadow lg:w-56">
      <h3 className="font-heading border-b border-gray-200 pb-2 text-lg lg:block hidden">Filters</h3>

      {/* Search Order ID */}
      <div className="mb-2">
        <InputSearch placeholder="Search orders..." />
      </div>

      {/* Status Filter */}
      <div className="border-b border-gray-100 pb-4">
        <h4 className="mb-3 flex items-center justify-between text-sm font-semibold">
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
              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              htmlFor={status}
            >
              <Checkbox
                id={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleFilter('status', status)}
              />
              <span className="capitalize font-medium">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="pb-2">
        <h4 className="mb-3 flex items-center justify-between text-sm font-semibold">
          <span>Payment Method</span>
          {selectedPayments.length > 0 && (
            <button
              onClick={() => clearFilters('payment_method')}
              className="text-primary hover:text-primary/70 text-xs font-medium"
            >
              Clear ({selectedPayments.length})
            </button>
          )}
        </h4>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.value}
              className={`relative flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                selectedPayments.includes(item.value)
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
              }`}
              onClick={() => toggleFilter('payment_method', item.value)}
            >
              <Checkbox
                checked={selectedPayments.includes(item.value)}
                onCheckedChange={() =>
                  toggleFilter('payment_method', item.value)
                }
              />
              <div className="flex items-center gap-2 text-sm font-medium">
                {item.Icon && <item.Icon size={16} aria-hidden="true" />}
                <Label className="cursor-pointer">{item.label}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clear all filters button */}
      {(selectedStatuses.length > 0 || selectedPayments.length > 0) && (
        <div className="border-t pt-4 mt-auto">
          <button
            onClick={() => {
              clearFilters('status');
              clearFilters('payment_method');
            }}
            className="w-full text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </Card>
  );
}
