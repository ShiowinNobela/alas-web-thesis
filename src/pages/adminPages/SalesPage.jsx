import { useState } from 'react';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import ErrorState from '@/components/States/ErrorState';
import SalesMetrics from '@/components/sale/SalesMetrics';
import SalesBreakdown from '@/components/sale/SalesBreakdown';
import ProductPerformance from '@/components/sale/ProductPerformance';
import PeriodToggle from '@/components/sale/PeriodToggle';
import { useSalesData } from '@/hooks/useSalesData';

function SalesPage() {
  const [activePeriod, setActivePeriod] = useState('daily');
  const { daily, weekly, monthly, yearly, products, isLoading, isError, refetch } = useSalesData(activePeriod);

  if (isError) {
    return <ErrorState error={isError} onRetry={refetch} title="Failed to load sales data" retryText="Retry Request" />;
  }

  const getCurrentData = () => {
    switch (activePeriod) {
      case 'daily' : return daily?.current;
      case 'weekly' : return weekly?.current;
      case 'monthly' : return monthly?.current;
      case 'yearly' : return yearly?.current;
      default: return weekly?.current;
    }
  };

  const getPreviousData = () => {
    switch (activePeriod) {
      case 'daily' : return daily?.previous;
      case 'weekly' : return weekly?.previous;
      case 'monthly' : return monthly?.previous;
      case 'yearly' : return yearly?.previous;
      default: return weekly?.previous;
    }
  };

  const renderContent = () => {
    const currentData = getCurrentData();
    const previousData = getPreviousData();
  
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
      <div className="min-h-screen p-6 bg-admin">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sales Analytics</h1>
        </div>

        <PeriodToggle
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />

        {renderContent()}
      </div>
    </ErrorBoundary>
  );
};

export default SalesPage;
