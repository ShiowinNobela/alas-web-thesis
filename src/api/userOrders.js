import axios from 'axios';

export const fetchOrders = async ({ orderIdSearch, statusFilters, paymentFilters, monthYearFilter }) => {
  if (orderIdSearch) {
    try {
      const response = await axios.get(`/api/orders/${orderIdSearch}`);
      return [response.data.data];
    } catch (err) {
      if (err.response?.status === 404) {
        throw new Error(`Order ID "${orderIdSearch}" not found.`);
      }
      throw err;
    }
  }

  const statusQuery = statusFilters.map((s) => `status=${encodeURIComponent(s)}`).join('&');
  const paymentQuery = paymentFilters.map((p) => `payment_method=${encodeURIComponent(p)}`).join('&');
  const monthYearQuery = monthYearFilter ? `month_year=${encodeURIComponent(monthYearFilter)}` : '';

  const queryString = [statusQuery, paymentQuery, monthYearQuery].filter(Boolean).join('&');
  const url = `/api/orders${queryString ? `?${queryString}` : ''}`;

  const response = await axios.get(url);
  return response.data.data;
};

export const cancelOrderApi = async ({ orderId, note }) => {
  return axios.put(`/api/orders/cancel/${orderId}`, { notes: note });
};
