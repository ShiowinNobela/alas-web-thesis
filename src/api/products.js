import axios from 'axios';

// GET all products
export const fetchProducts = async () => {
  const res = await axios.get('/api/products/admin/list');
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

/* 


{
		"id": "P001",
		"name": "The Ballad of Q",
		"category": "Condiment",
		"stock_quantity": 81,
		"price": "500.00",
		"image": "https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302194/alas_uploads/iknwr95caffzjwbkkhdu.jpg",
		"description": "A hot sauce with a poetic kick—a bold, smoky, and slightly sweet blend featuring fiery peppers like ghost or habanero, balanced with hints of dark fruit (think blackberry or fig) and a touch of bourbon-barrel-aged depth. The name suggests a rich, storied heat—one that starts slow, builds to a crescendo, and leaves a lingering, memorable finish. Perfect for those who savor both spice and storytell..",
		"is_active": 1,
		"created_at": "2025-05-30T01:14:12.000Z",
		"updated_at": "2025-09-24T13:09:05.000Z",
		"reserved_quantity": 3
	},
*/

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
