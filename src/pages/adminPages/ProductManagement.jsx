import { useEffect, useState } from "react";
import NewSideBar from "../../components/newSideBar";
import { Link } from "react-router-dom";
import Placeholder from "../../components/images/placeholder.JPG";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { Card } from "flowbite-react";
import axios from "axios";
import AdminProfile from "../../components/Chinges/AdminProfile";
import { useNavigate } from "react-router-dom";
import CreateLimited from "./CreateLimited";

function ProductManagement() {
  const [openLimitedProduct, setOpenLimitedProduct] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [createLimited, setCreateLimited] = useState({
    product_id : "",
    discouted_price: 0,
    end_date: ""
  })

  const [productType, setProductType] = useState("regular");

  useEffect(() => {
    let url = "/api/products/";
    if (productType === "bundled") url = "/api/bundles";
    else if (productType === "limited") url = "/api/limited-offer";
    else if (productType === "special") url = "/api/special-offers";
    axios
      .get(url)
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : res.data.data || []);})
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }, [productType]);

  // const handleCreateLimited = () => {
  //   axios.post("/api/limited-offer")
  //   .then

  // }

  return (
    <>
      <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto">
          <div className="w-full pt-3 pr-7 flex justify-end">
            <AdminProfile />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-row gap-3">
              <div className="h-10 w-70 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between">
                <p>search</p>
                <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
              </div>
              <div>
                <select name="show" className="bg-[#FAF9F6] shadow-2xl drop-shadow-md"
                value={productType}
                onChange={e => setProductType(e.target.value)}>
                  <option value="regular"> Regular Products</option>
                  <option value="limited">Limited Products</option>
                  <option value="special">Special Products</option>
                  <option value="bundled">Bundled Products</option>
                </select>
              </div>
            </div>
            <div className="pr-4">
              <Link to="/Admin/AddProduct">
                <button className="p-2 text-l font-normal bg-[#144f17] text-white rounded border-1 border-black">
                  ADD PRODUCT
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full pr-7 pl-3 pt-5 grid grid-cols-4 gap-5">
            {data.map((d) => (
              <Card className="max-w-sm" key={d.id}>
                <img
                  src={d.image}
                  alt={d.name || "Product image"}
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = Placeholder;
                  }}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h5 className="text-2xl font-bold tracking-tight dark:text-white text-black">
                  {d.name}
                </h5>
                <div className="flex flex-row w-full text-center gap-3">
                  <div
                    className="p-1 bg-[#d3723a] text-l font-medium mt-1 border-1 border-[#894a25] drop-shadow-sm drop-shadow-black/60 w-1/2 h-[30px] rounded-2xl  cursor-pointer"
                    onClick={() => {
                      navigate(`/Admin/EditProduct/${d.id}`);
                    }}
                  >
                    <p>Edit</p>
                  </div>

                  {productType === "regular" && (
                    
                      <div
                        className="p-1 bg-[#d3723a] text-l font-medium mt-1 border-1 border-[#894a25] drop-shadow-sm drop-shadow-black/60 w-1/2 h-[30px] rounded-2xl cursor-pointer"
                        onClick={() => setOpenLimitedProduct(d)}
                      >
                        <p>Create Limited</p>
                      </div>
                     
                    
                  )}
                </div>
              </Card>
            ))}{openLimitedProduct && (
            <CreateLimited open={!!openLimitedProduct} onClose={() => setOpenLimitedProduct(null)}>
              <div className="w-full h-full bg-gray-50 rounded-2xl flex flex-col p-7 gap-3">
                <label> Product ID:</label>
                <input type="text" value={openLimitedProduct.id} readOnly />
                <label> Discounted Price:</label>
                <input type="number" onChange={(e) => { e.target.value }} />
                <button className="bg-[#d3723a] p-2 mt-10 rounded-2xl shadow-2xl drop-shadow-xl"
                onClick={handleCreateLimited}> Create Limited Product</button>
              </div>
            </CreateLimited>
          )}
          </div>
        </div>
      </div>

      
    </>
  );
}


export default ProductManagement;
