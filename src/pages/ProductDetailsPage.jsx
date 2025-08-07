import Modal from '../components/ThankYouPopUp.jsx';
import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarImg from '../components/images/star.png';

function ProductDetailsPage() {
  const [Open, setOpen] = useState(false);
  const { id } = useParams();
  const [reviewDetails, setReviewDetails] = useState([]);
  const [data, setData] = useState([]);
  const [prodQuantity, setProdQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/products/' + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/reviews/' + id)
      .then((response) => setReviewDetails(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const userdata = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await userdata.data;
      const product = await axios.post(`/api/cart/${response.id}`, {
        productId: id.toString(),
        quantity: prodQuantity,
      });
      navigate('/ProductListPage');
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  };

  return (
    <>
      <section className="flex h-screen w-screen flex-col items-center justify-start overflow-auto bg-[#e9e5e5] bg-cover px-10 py-10">
        <div className="mb-2 self-start"></div>

        <div className="w-8xl grid max-h-4/5 grid-cols-[60fr_40fr] gap-10 rounded-lg border-1 border-[#b4afaf] bg-[#f8f7f7] p-6 shadow-lg">
          <div className="grid grid-cols-[50fr_50fr]">
            <div className="flex items-center justify-center">
              <img
                src={data.image}
                alt="/"
                className="mx-auto h-100 w-100 rounded-sm border-1 border-[#dfdddd] shadow-sm"
              />
            </div>
            {/* product name */}
            <div className="mb-6 ml-10 flex flex-col justify-around">
              <div>
                <h1 className="mb-4 text-4xl font-black lg:mb-0">
                  {data.name}
                </h1>
                <h2 className="mt-2 text-2xl font-bold text-green-700">
                  {' '}
                  ₱ {data.price}
                </h2>
              </div>
              <div>
                <h1 className="pb-1 text-xl">What to expect?</h1>
                <p className="font-extralight text-gray-700">
                  {data.description}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {/* quantity + price */}
                <div className="mb-6">
                  <label className="mr-1 text-lg font-semibold">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={prodQuantity}
                    onChange={(e) => setProdQuantity(e.target.value)}
                    max={data.stock_quantity}
                    className="w-24 rounded border border-black px-2 py-1"
                  />
                </div>

                {/* add to cart + buy now */}
                <div className="flex flex-col gap-4">
                  <div
                    className="text-l flex cursor-pointer items-center justify-center rounded-md border border-[#EA1A20] px-6 py-3 font-semibold uppercase shadow-md transition hover:bg-[#fdd]"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="mr-2 h-6 w-6" />
                    Add to Cart
                  </div>

                  {/* <div
                    className="bg-[#EA1A20] text-white text-xl text-center px-6 py-3 font-bold rounded-md cursor-pointer shadow-md hover:bg-red-800 transition uppercase"
                    onClick={() => setOpen(true)}
                  >
                    Buy Now
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className="flex flex-col border-l">
            <h2 className="mb-4 text-center text-2xl font-bold">Reviews</h2>
            <h3 className="mb-4 ml-3 text-lg">
              Total reviews: {reviewDetails.length}
            </h3>
            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
              {reviewDetails.map((d, index) => (
                <div
                  key={index}
                  className="ml-3 rounded border border-gray-300 bg-white p-4 shadow-lg"
                >
                  <h3 className="font-semibold">Name: {d.username}</h3>
                  <div className="flex flex-row items-center gap-x-3">
                    <h4>Rating: {d.rating} / 5 </h4>
                    <img src={StarImg} alt="/" className="h-8 w-8" />
                  </div>
                  <h4>Review:</h4>
                  <p>{d.review_text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal open={Open} onClose={() => setOpen(false)}>
          <div className="flex h-[200px] w-[400px] flex-col justify-between p-6 text-center">
            <h1 className="text-3xl font-bold">
              Do you want to complete the transaction?
            </h1>
            <p className="mt-2 text-lg">
              Click Confirm to complete the transaction!
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button className="w-[150px] cursor-pointer rounded-full bg-[#EA1A20] p-3 font-bold text-white">
                Confirm
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-[150px] cursor-pointer rounded-full bg-gray-500 p-3 font-bold text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default ProductDetailsPage;
