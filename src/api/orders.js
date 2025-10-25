// src/services/orderService.js
import axios from 'axios';
import dayjs from 'dayjs';

export const fetchOrders = async (status = '', startDate, endDate) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (startDate) params.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
  if (endDate) params.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

  const response = await axios.get(`/api/adminOrder?${params.toString()}`, {});
  return response.data.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await axios.get(`/api/adminOrder/${orderId}`, {});
  return response.data?.data || response.data;
};

/* {
	"statusCode": 200,
	"status": "success",
	"message": "Order retrieved successfully",
	"data": {
		"id": "ALAS101625897077",
		"customer_id": 32,
		"order_date": "2025-10-16T12:50:26.000Z",
		"status": "pending",
		"total_amount": "800.00",
		"discount_amount": "0.00",
		"notes": "Hello mah man",
		"address": "69 Kalamares, Almaroeses",
		"cancel_requested": 0,
		"coupon_code": null,
		"subtotal": "800.00",
		"payment_method": "bank_transfer",
		"reference_number": "DFHUSJ934",
		"account_name": "09234823312",
		"username": "RodianEbias1",
		"email": "RodianEbias1@gmail.com",
		"contact_number": "0973486343",
		"items": [
			{
				"item_id": 180,
				"order_id": "ALAS101625897077",
				"product_id": "P003",
				"quantity": 2,
				"unit_price": "400.00",
				"subtotal": "800.00",
				"product_name": "Call Me Debra",
				"product_image": "https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302419/alas_uploads/ffgfhv57rvygxjkriw9e.jpg"
			}
		]
	}
} */

export const fetchOrderHistory = async (orderId) => {
  const response = await axios.get(`/api/adminOrder/status-history/${orderId}`, {});
  return response.data;
};

export const updateOrderStatus = async (orderId, data) => {
  const { status, note, image } = data;
  const url = status ? `/api/adminOrder/status-update/${orderId}` : `/api/adminOrder/cancel/${orderId}`;

  const requestData = status ? { notes: note, status, shipping_image: image } : { notes: note };

  const response = await axios.patch(url, requestData, {});
  return response.data;
};

export const moveToProcessingApi = async (orderId, { notes }) => {
  const response = await axios.patch(`/api/adminOrder/move-to-processing/${orderId}`, { notes });
  return response.data;
};

export const moveToShippingApi = async (orderId, { notes, shippingPrice, shippingCompany, orderReferenceNumber }) => {
  const response = await axios.patch(`/api/adminOrder/move-to-shipping/${orderId}`, {
    notes,
    shipping_price: shippingPrice,
    shipping_company: shippingCompany,
    order_reference_number: orderReferenceNumber,
  });
  return response.data;
};
export const moveToDeliveredApi = async (orderId, { notes }) => {
  const response = await axios.patch(`/api/adminOrder/move-to-delivered/${orderId}`, { notes });
  return response.data;
};

export const cancelOrderApi = async (orderId, { notes }) => {
  const response = await axios.patch(`/api/adminOrder/cancel/${orderId}`, { notes });
  return response.data;
};

export const fetchOrderSummary = async (startDate, endDate) => {
  const start = startDate ? dayjs(startDate) : dayjs();
  const end = endDate ? dayjs(endDate) : dayjs();
  const params = new URLSearchParams();
  params.append('start', start.format('YYYY-MM-DD'));
  params.append('end', end.format('YYYY-MM-DD'));

  const response = await axios.get(`/api/reports/sales-summary-order?${params.toString()}`, {});
  return response.data.data.data;
};

export const fetchLast30OrderSummary = async () => {
  const end = dayjs();
  const start = dayjs().subtract(100, 'day');
  const params = new URLSearchParams();
  params.append('start', start.format('YYYY-MM-DD'));
  params.append('end', end.format('YYYY-MM-DD'));

  const response = await axios.get(`/api/reports/sales-summary-order?${params.toString()}`, {});
  return response.data.data.data;
};
