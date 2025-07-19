// components/order/OrderFiltersPanel.jsx
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Brush, Eraser, SwatchBook } from 'lucide-react';
import InputSearch from '@/components/bigComponents/inputSearch';

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
  { value: '1', label: 'GCash', Icon: SwatchBook, defaultChecked: true },
  { value: '2', label: 'Maya', Icon: Brush },
  { value: '3', label: 'Bank', Icon: Eraser },
];

export default function OrderFiltersPanel() {
  return (
    <Card className="text-content flex h-full w-64 shrink-0 flex-col gap-4 rounded-2xl p-4 shadow">
      <h3 className="border-muted-foreground font-heading border-b pb-2 font-semibold">
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
              <Checkbox id={status} />
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
                  value={item.value}
                  className="order-1 after:absolute after:inset-0"
                  defaultChecked={item.defaultChecked}
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
