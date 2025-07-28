import { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Cart from '../components/Cart.jsx';

function ProductPage() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const navigate = useNavigate();

  const user = window.localStorage.getItem('user');
  const isLoggedIn = !!user;

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => {
        setData(res.data);
        setNewData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = async (product) => {
    const user = window.localStorage.getItem('user');
    if (!user) {
      navigate('/LoginPage');
      return;
    }

    try {
      await axios.post(`/api/cart/me`, {
        productId: product.id,
        quantity: 1,
      });

      setCartUpdated((prev) => !prev);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div
      className={
        isLoggedIn
          ? 'grid min-h-full w-full grid-cols-[3fr_1fr] bg-yellow-100'
          : 'h-full w-full bg-[#f2efef]'
      }
    >
      {/* Left Side */}
      <div className={isLoggedIn ? '' : 'w-full'}>
        <div className="flex min-h-fit flex-col gap-5 pt-5 pl-5">
          {/* Product List */}
          <div className="grid h-[89%] grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto">
            {newData.map((d) => (
              <div
                key={d.id}
                className="mr-4 flex flex-col items-center justify-center rounded-md bg-white/70 p-6 shadow-md"
              >
                <img
                  src={d.image}
                  alt={d.name || 'Product image'}
                  className="mb-4 h-55 w-50 rounded-sm object-cover"
                />
                <div className="mb-2 text-center">
                  <p className="mb-1 text-lg font-semibold">{d.name}</p>
                  <p className="text-xl font-bold text-[#000000]">{d.price}</p>
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-1 rounded bg-[#db2026] px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
                    onClick={() => handleAddToCart(d)}
                  >
                    <TiShoppingCart className="h-5 w-5" />
                    <span>{d.stock_quantity}</span>
                  </button>
                  <button
                    className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-[#363535] transition hover:bg-gray-400"
                    onClick={() => navigate(`/ProductDetailsPage/${d.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      {isLoggedIn && <Cart cartUpdated={cartUpdated} />}
    </div>
  );
}

export default ProductPage;
