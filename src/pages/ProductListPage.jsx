import Cart from '../components/Cart.jsx';
import React, { useState, useEffect } from 'react';
import { PiMagnifyingGlassLight } from 'react-icons/pi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';

function ProductPage() {
  const [data, setData] = useState([]);
  const [limData, setLimData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [newData, setNewData] = useState([]);
  const navigate = useNavigate();
  const [cartUpdated, setCartUpdated] = useState(false);

  const user = window.localStorage.getItem('user');
  const isLoggedIn = !!user;

  useEffect(() => {
    window.localStorage.getItem('user');
    axios
      .get('/api/products')
      .then((res) => {
        setData(res.data);
        setNewData([...res.data]);
      })
      .catch((err) => console.log(err));
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
          {/* <div className="h-10 w-2/5 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between cursor-pointer">
                <p>search</p>
                <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
              </div> */}
          {/* Product List */}
          <div className="grid h-[89%] grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto">
            {newData.map((d) => (
              // products
              <div className="mr-4 flex flex-col items-center justify-center rounded-md bg-white/70 p-6 shadow-md">
                <img
                  src={d.image}
                  alt={d.name}
                  className="mb-4 h-55 w-50 rounded-sm object-cover"
                />
                <div className="mb-2 text-center">
                  <p className="mb-1 text-lg font-semibold">{d.name} </p>
                  <p className="text-xl font-bold text-[#000000]">{d.price}</p>
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                  <button
                    className="flex justify-center rounded bg-[#db2026] px-4 py-2 text-sm font-semibold text-[#ffffff] transition hover:bg-red-800"
                    onClick={() => handleAddToCart(d)}
                  >
                    <TiShoppingCart className="h-10 w-10" />
                    {d.stock_quantity}
                  </button>
                  <button
                    className="text-s rounded bg-gray-200 px-4 py-2 font-semibold text-[#363535] transition hover:bg-gray-400"
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
