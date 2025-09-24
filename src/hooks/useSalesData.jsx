import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SALES_KEYS = {
  weekly: ['sales', 'weekly'],
  monthly: ['sales', 'monthly'],
};

const fetchWeeklySales = async () => {
  const { data } = await axios.get('/api/sales/weekly');
  return data;
};

const fetchMonthlySales = async () => {
  const { data } = await axios.get('/api/sales/monthly');
  return data; 
};

export const useSalesData = (activePeriod = 'weekly') => {
  const weeklyQuery = useQuery({
    queryKey: SALES_KEYS.weekly,
    queryFn: fetchWeeklySales,
  });

  const monthlyQuery = useQuery({
    queryKey: SALES_KEYS.monthly,
    queryFn: fetchMonthlySales,
  });

  const currentPeriodProducts = activePeriod === 'weekly' 
    ? weeklyQuery.data?.products 
    : monthlyQuery.data?.products;

  return {
    weekly: weeklyQuery.data?.weekly,
    monthly: monthlyQuery.data?.monthly,
    products: currentPeriodProducts,
    isLoading: weeklyQuery.isLoading || monthlyQuery.isLoading,
    isError: weeklyQuery.isError || monthlyQuery.isError,
    refetch: () => {
      weeklyQuery.refetch();
      monthlyQuery.refetch();
    },
  };
};