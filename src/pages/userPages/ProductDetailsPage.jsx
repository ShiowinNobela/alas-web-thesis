import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailsPage() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [prodQuantity, setProdQuantity] = useState(1);

  useEffect(() => {
    axios
      .get('/api/products/' + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-neutral min-h-screen py-8">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
            {/* Product Image and Details */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Product Image */}
              <div className="flex items-center justify-center p-4">
                <img
                  src={data.image}
                  alt={data.name || 'Product image'}
                  className="h-auto max-h-96 w-full max-w-md rounded-md border border-gray-200 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {data.name}
                  </h1>
                  <p className="mt-2 text-2xl font-semibold text-green-700">
                    ₱{data.price}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Description
                  </h2>
                  <p className="mt-2 text-gray-600">{data.description}</p>
                </div>

                <div className="flex flex-col space-y-4">
                  {/* Quantity Selector */}
                  <div>
                    <label className="mb-1 block text-lg font-medium text-gray-700">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={data.stock_quantity}
                      value={prodQuantity}
                      onChange={(e) => setProdQuantity(e.target.value)}
                      className="w-24 rounded-md border border-gray-300 px-3 py-2 text-center"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <button className="flex items-center justify-center rounded-md border border-red-500 bg-white px-6 py-3 font-medium text-red-500 uppercase transition-colors hover:bg-red-50">
                      <FaShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>

                    {/* Uncomment if you want a Buy Now button */}
                    {/* <button 
                      className="rounded-md bg-red-600 px-6 py-3 font-medium uppercase text-white transition-colors hover:bg-red-700"
                      onClick={() => setOpen(true)}
                    >
                      Buy Now
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-l border-gray-200 pl-8">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <p className="mt-4 text-gray-600">
                Total reviews: {data.review_count || '0'}
              </p>

              {/* You can add actual reviews here later */}
              <div className="mt-6 space-y-4">
                {/* Sample review (replace with dynamic data) */}
                <div className="border-b border-gray-200 pb-4">
                  <p className="font-medium">Great product!</p>
                  <p className="text-gray-600">⭐⭐⭐⭐⭐</p>
                  <p className="text-sm text-gray-500">From: John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailsPage;
