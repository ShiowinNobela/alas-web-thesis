import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SALES_KEYS = {
  daily : ['sales', 'daily'],
  weekly: ['sales', 'weekly'],
  monthly: ['sales', 'monthly'],
  yearly: ['sales', 'yearly'],
};

const fetchSalesData = async (period) => {
  const { data } = await axios.get(`/api/sales/${period}`);
  return data;
};

export const useSalesData = (activePeriod = 'daily') => {
  const query = useQuery({
    queryKey: SALES_KEYS[activePeriod],
    queryFn: () => fetchSalesData(activePeriod),
  });

  return {
    // Data for active period
    daily: activePeriod === 'daily' ? query.data?.daily : null,
    weekly: activePeriod === 'weekly' ? query.data?.weekly : null,
    monthly: activePeriod === 'monthly' ? query.data?.monthly : null,
    yearly: activePeriod === 'yearly' ? query.data?.yearly : null,
    
    // Products for active period
    products: query.data?.products,
    
    // Loading and error states
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};