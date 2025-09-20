import axios from 'axios';

// GET all products
export const fetchProducts = async () => {
  const res = await axios.get('/api/products/admin/list');
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// PATCH toggle status
export const toggleProductStatus = async ({ id, newStatus }) => {
  return axios.patch(`/api/products/toggle-status/${id}`, {
    is_active: newStatus,
  });
};

// PATCH stock & price
export const updateStockPrice = async ({ id, restock_quantity, price }) => {
  return axios.patch(`/api/products/stock-price/${id}`, {
    restock_quantity: Number(restock_quantity),
    price: Number(price),
  });
};
