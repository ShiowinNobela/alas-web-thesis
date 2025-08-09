import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Placeholder from '../../components/images/placeholder.JPG';
// import { PiMagnifyingGlassLight } from "react-icons/pi";
import { Card } from 'flowbite-react';
import axios from 'axios';
// import AdminProfile from "../../components/Chinges/AdminProfile";
import { useNavigate } from 'react-router-dom';
import CreateLimited from './CreateLimited';
import { Toaster, toast } from 'sonner';

function ProductManagement() {
  const [openLimitedProduct, setOpenLimitedProduct] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getToday = () => new Date().toISOString().split('T')[0];

  const [createLimited, setCreateLimited] = useState({
    product_id: '',
    discounted_price: 0,
    start_date: getToday(),
    end_date: '',
  });

  const [productType, setProductType] = useState('regular');

  useEffect(() => {
    let url = '/api/products/';
    if (productType === 'bundled') url = '/api/bundles';
    else if (productType === 'limited') url = '/api/limited-offer';
    else if (productType === 'special') url = '/api/special-offers';
    axios
      .get(url)
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }, [productType]);

  const handleCreateLimited = async () => {
    if (!openLimitedProduct) return;
    try {
      const user = JSON.parse(window.localStorage.getItem('user'));
      await axios.post(
        '/api/limited-offer',
        {
          product_id: createLimited.product_id,
          discounted_price: Number(createLimited.discounted_price),
          start_date: createLimited.start_date,
          end_date: createLimited.end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setOpenLimitedProduct(null);
      setCreateLimited({ product_id: '', discounted_price: 0, end_date: '' });
      setProductType('limited');
      toast.success('Limited product created!');
    } catch (err) {
      toast.error('Failed to create limited product');
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col overflow-x-auto bg-white">
        <section className="bg-gray-50">
          <div className="mx-auto max-w-screen-2xl px-4 py-8">
          </div>

          {/* Page Header */}
          <div className="flex w-full items-center justify-between pr-5">
            <div />
            <div>
              <Link to="/Admin/AddProduct">
                <button className="bg-secondary hover:bg-secondary/40 rounded border border-black p-2 text-lg font-medium text-white dark:text-red-500">
                  ADD PRODUCT
                </button>
              </Link>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid w-full grid-cols-4 gap-5 pt-5 px-5">
            {data.map((d) => (
              <Card
                className="max-w-sm overflow-hidden rounded-lg shadow-lg"
                key={d.id}
              >
                <img
                  src={d.image}
                  alt={d.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Placeholder;
                  }}
                  className="h-48 w-full object-cover"
                />

                <div className="bg-white p-4">
                  <h5 className="mb-2 truncate text-xl font-bold text-gray-800">
                    {d.name}
                  </h5>

                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span
                      className={`font-semibold ${
                        d.stock_quantity < 11 ? 'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      {d.stock_quantity}
                    </span>
                  </div>

                  <div className="text-admin mb-4 text-lg font-semibold">
                    ₱{parseFloat(d.price).toLocaleString()}
                  </div>

                  <button
                    onClick={() => navigate(`/Admin/EditProduct/${d.id}`)}
                    className="bg-admin hover:bg-secondary/70 w-full rounded-2xl py-2 text-white shadow transition hover:text-black"
                  >
                    Edit
                  </button>
                </div>
              </Card>
            ))}

            {/* Limited Product Modal */}
            {openLimitedProduct && (
              <CreateLimited
                open={!!openLimitedProduct}
                onClose={() => setOpenLimitedProduct(null)}
              >
                <div className="flex h-full w-full flex-col gap-3 rounded-2xl bg-gray-50 p-7">
                  <label>Product ID:</label>
                  <input
                    type="text"
                    value={createLimited.product_id}
                    readOnly
                  />
                  <label>Discounted Price:</label>
                  <input
                    type="number"
                    value={createLimited.discounted_price}
                    onChange={(e) =>
                      setCreateLimited((cl) => ({
                        ...cl,
                        discounted_price: e.target.value,
                      }))
                    }
                  />
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={createLimited.start_date}
                    readOnly
                  />
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={createLimited.end_date}
                    onChange={(e) =>
                      setCreateLimited((cl) => ({
                        ...cl,
                        end_date: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="bg-admin mt-10 rounded-2xl p-2 text-white shadow-lg"
                    onClick={handleCreateLimited}
                  >
                    Create Limited Product
                  </button>
                </div>
              </CreateLimited>
            )}
          </div>
        </section>

        <Toaster richColors />
      </div>
    </>
  );
}

export default ProductManagement;

{
  /* <AdminProfile /> */
}

{
  /* <div className="h-10 w-70 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between">
                <p>search</p>
                <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
              </div>
              <div>
                <select
                  name="show"
                  className="bg-[#FAF9F6] shadow-2xl drop-shadow-md"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="regular"> Regular Products</option>
                  <option value="limited">Limited Products</option>
                  <option value="special">Special Products</option>
                  <option value="bundled">Bundled Products</option>
                </select>
              </div> */
}

{
  /* {productType === "regular" && (
                    <div
                      className="p-1 bg-admin text-l font-medium mt-1 border-1 border-[#894a25] drop-shadow-sm drop-shadow-black/60 w-1/2 h-[30px] rounded-2xl cursor-pointer"
                      onClick={() => {
                        setOpenLimitedProduct(d);
                        setCreateLimited({
                          product_id: d.id,
                          discounted_price: 0,
                          start_date: getToday(),
                          end_date: "",
                        });
                      }}
                    >
                      <p>Create Limited</p>
                    </div>
                  )} */
}
