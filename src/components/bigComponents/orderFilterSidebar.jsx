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
  { value: 'gcash', label: 'GCash', Icon: SwatchBook, defaultChecked: true },
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

  return (
    <Card className="text-content flex h-full w-64 shrink-0 flex-col gap-4 rounded-2xl p-4 shadow">
      <h3 className="border-muted-foreground font-heading border-b pb-2">
        Filters
      </h3>

      {/* Search Order ID */}
      <div className="mb-2 flex flex-col gap-2">
        <InputSearch />
      </div>

      {/* Status Filter */}
      <div>
        <h4 className="text-muted mb-2 w-3/4 border-b border-b-gray-400 pb-2 text-sm">
          Status
        </h4>
        <div className="flex flex-col gap-2 py-1">
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 text-sm text-gray-700"
              htmlFor={status}
            >
              <Checkbox
                id={status}
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
        <h4 className="text-muted mt-2 w-3/4 border-b border-b-gray-400 pb-2 text-sm">
          Payment Method
        </h4>
        <div className="my-2 grid grid-cols-1 gap-2">
          {items.map((item) => (
            <Card
              key={item.value}
              className="relative flex cursor-pointer flex-col gap-2 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between gap-2">
                <Checkbox
                  checked={selectedPayments.includes(item.value)}
                  onCheckedChange={() =>
                    toggleFilter('payment_method', item.value)
                  }
                  className="order-1 after:absolute after:inset-0"
                />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  {item.Icon && <item.Icon size={16} aria-hidden="true" />}
                  <Label>{item.label}</Label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
