// components/DateRangeSelector.jsx
import { today, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-react';
import { DateRangePicker, Dialog, Group, Popover, Button } from 'react-aria-components';
import { cn } from '@/lib/utils';
import { RangeCalendar } from '../ui/calendar-rac';
import { DateInput, dateInputStyle } from '../ui/datefield-rac';
import PropTypes from 'prop-types';

export function DateRangeSelector({ value, onChange, placeholder = 'All Time', className }) {
  const now = today(getLocalTimeZone());

  return (
    <DateRangePicker
      className={cn(className, '*:not-first:mt-2')}
      value={value}
      onChange={onChange}
      aria-label="Date range"
    >
      <div className="relative flex">
        <Group className={cn(dateInputStyle, 'pe-9')}>
          <DateInput slot="start" unstyled placeholder={placeholder} />
          <span aria-hidden="true" className="text-muted-foreground/70 px-2">
            -
          </span>
          <DateInput slot="end" unstyled placeholder={placeholder} />
        </Group>

        <Button className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-2xl border shadow-lg outline-hidden"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <RangeCalendar value={value ?? { start: now, end: now }} onChange={onChange} />
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}

DateRangeSelector.propTypes = {
  value: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
  }),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
