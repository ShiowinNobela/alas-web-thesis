// components/order/OrderFiltersPanel.jsx
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  { value: '1', label: 'GCash', Icon: SwatchBook, defaultChecked: true },
  { value: '2', label: 'Maya', Icon: Brush },
  { value: '3', label: 'Bank', Icon: Eraser },
];

export default function OrderFiltersPanel() {
  return (
    <Card className="sticky top-4 h-fit w-full shrink-0 rounded-2xl bg-white px-4 py-4 shadow-md md:w-2xs">
      <h3 className="text-lg font-semibold">Filter your results</h3>
      <div className="*:not-first:mt-2">
        <Label>Search Order ID</Label>
        <div className="flex gap-2">
          <Input className="flex-1" placeholder="ALAS12345" />
          <Button>Search</Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <Checkbox id={status} />
            <Label htmlFor={status}>{status}</Label>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {items.map((item) => (
          <div
            key={item.value}
            className="border-primary/50 relative flex cursor-pointer flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
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
          </div>
        ))}
      </div>
    </Card>
  );
}
