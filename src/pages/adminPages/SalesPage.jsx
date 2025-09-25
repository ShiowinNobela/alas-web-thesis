import { useState } from 'react';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import ErrorState from '@/components/States/ErrorState';
import SalesMetrics from '@/components/sales/SalesMetrics';
import SalesBreakdown from '@/components/sales/SalesBreakdown';
import ProductPerformance from '@/components/sales/ProductPerformance';
import PeriodToggle from '@/components/sales/PeriodToggle';
import { useSalesData } from '@/hooks/useSalesData';

function SalesPage() {
  const [activePeriod, setActivePeriod] = useState('weekly');
  const { weekly, monthly, products, isLoading, isError, refetch } = useSalesData(activePeriod);

  if (isError) {
    return <ErrorState error={isError} onRetry={refetch} title="Failed to load sales data" retryText="Retry Request" />;
  }

  const renderContent = () => {
    const currentData = activePeriod === 'weekly' ? weekly?.current : monthly?.current;
    const previousData = activePeriod === 'weekly' ? weekly?.previous : monthly?.previous;

    return (
      <>
        <SalesMetrics
          currentData={currentData}
          previousData={previousData}
          period={activePeriod}
          isLoading={isLoading}
        />
        <div className="grid grid-cols-5 gap-6 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <SalesBreakdown data={currentData} period={activePeriod} isLoading={isLoading} />
          </div>
          <div className="col-span-3">
            <ProductPerformance products={products} period={activePeriod} isLoading={isLoading} />
          </div>
        </div>
      </>
    );
  };

  return (
    <ErrorBoundary>
      <div className="bg-admin min-h-screen p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sales Analytics</h1>
        </div>

        <PeriodToggle
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />

        {renderContent()}
      </div>
    </ErrorBoundary>
  );
}

export default SalesPage;
