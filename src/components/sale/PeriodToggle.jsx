import { Button } from 'flowbite-react';

const PeriodToggle = ({ activePeriod, onPeriodChange }) => {
  const periods = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

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