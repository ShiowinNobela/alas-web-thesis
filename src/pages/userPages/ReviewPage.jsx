import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { today, getLocalTimeZone } from '@internationalized/date';
import dayjs from 'dayjs';
import { RangeCalendar } from '@/components/ui/calendar-rac';
import { Button } from '@/components/ui/button';

export default function ReviewPage() {
  const now = today(getLocalTimeZone());

  const [dateRange, setDateRange] = useState({
    start: now,
    end: now.add({ days: 3 }),
  });

  // Convert to Day.js only for display
  const formatDisplay = (date) => dayjs(`${date.year}-${date.month}-${date.day}`).format('MMM D, YYYY');

  return (
    <div className="bg-neutral flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <MessageSquare className="text-muted-foreground mb-4 h-16 w-16" />

      {/* Title */}
      <h1 className="font-heading text-content mb-2 text-3xl font-bold">Review Page</h1>

      {/* Subtitle */}
      <p className="text-muted-foreground mb-6 max-w-md">
        This is a placeholder for the Review Page. Here, users will be able to read and edit their reviews about our
        products.
      </p>

      {/* Action button */}
      <Button>Go Back Home</Button>
      <div className="flex flex-row items-start gap-8 pt-10 text-start">
        <RangeCalendar className="rounded-md border p-2" value={dateRange} onChange={setDateRange} />
        <div>
          <p>New added calendar which can accept ranges </p>

          <h2 className="text-lg font-bold">Start Date: {formatDisplay(dateRange.start)}</h2>
          <h2 className="mb-4 text-lg font-bold">End Date: {formatDisplay(dateRange.end)}</h2>
        </div>
      </div>
    </div>
  );
}
