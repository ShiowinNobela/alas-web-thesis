import { Button } from 'flowbite-react';
import dayjs from 'dayjs';

const PeriodToggle = ({ activePeriod, onPeriodChange }) => {
  const periods = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  const getCurrentDateRange = () => {
    const today = dayjs();
    switch (activePeriod) {
      case 'daily':
        return today.format('MMMM D, YYYY');
      case 'weekly':
        const startOfWeek = today.startOf('week').add(1, 'day');
        const endOfWeek = today.endOf('week').add(1, 'day'); // getsuyoubi
        return `${startOfWeek.format('MMM D')} - ${endOfWeek.format('MMM D, YYYY')}`;
      case 'monthly':
        return today.format('MMMM YYYY');
      case 'yearly':
        return today.format('YYYY');
      default:
        return '';
    }
  };

  return (
      <div className="flex p-2 mb-6 space-x-2 rounded-lg">
        {periods.map((period) => (
          <Button
            key={period.key}
            color={activePeriod === period.key ? 'blue' : 'gray'}
            onClick={() => onPeriodChange(period.key)}
            className="flex-1"
          >
            {period.label}
          </Button>
        ))}
      </div>
  );
};

export default PeriodToggle;