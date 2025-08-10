// src/services/orderService.js
import axios from 'axios';
import dayjs from 'dayjs';

const API_BASE = '/api';

const getAuthHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return { Authorization: `Bearer ${user.token}` };
};

export const fetchOrders = async (status = '', startDate, endDate) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (startDate)
    params.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
  if (endDate) params.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

  const response = await axios.get(
    `${API_BASE}/adminOrder?${params.toString()}`,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await axios.get(`${API_BASE}/adminOrder/${orderId}`, {
    headers: getAuthHeader(),
  });
  return response.data?.data || response.data;
};

export const fetchOrderHistory = async (orderId) => {
  const response = await axios.get(
    `${API_BASE}/adminOrder/status-history/${orderId}`,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const updateOrderStatus = async (orderId, data) => {
  const { status, note, image } = data;
  const url = status
    ? `${API_BASE}/adminOrder/status-update/${orderId}`
    : `${API_BASE}/adminOrder/cancel/${orderId}`;

  const requestData = status
    ? { notes: note, status, shipping_image: image }
    : { notes: note };

  const response = await axios.patch(url, requestData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const fetchOrderSummary = async (startDate, endDate) => {
  const start = startDate ? dayjs(startDate) : dayjs();
  const end = endDate ? dayjs(endDate) : dayjs();
  const params = new URLSearchParams();
  params.append('start', start.format('YYYY-MM-DD'));
  params.append('end', end.format('YYYY-MM-DD'));

  const response = await axios.get(
    `${API_BASE}/reports/sales-summary-order?${params.toString()}`,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data.data.data;
};

export const fetchLast30OrderSummary = async () => {
  const end = dayjs();
  const start = dayjs().subtract(100, 'day');
  const params = new URLSearchParams();
  params.append('start', start.format('YYYY-MM-DD'));
  params.append('end', end.format('YYYY-MM-DD'));

  const response = await axios.get(
    `${API_BASE}/reports/sales-summary-order?${params.toString()}`,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data.data.data;
};
