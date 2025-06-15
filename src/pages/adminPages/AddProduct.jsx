import Sidebar from "../../components/sidebar.jsx";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../../components/Chinges/AdminProfile.jsx";
import NewSideBar from "../../components/newSideBar";
import BackButton from "../../components/Chinges/BackButton.jsx";
import BaseInput from "../../components/Chinges/BaseInput.jsx";
import Description from "../../components/Chinges/Description.jsx";
import DropDown from "../../components/Chinges/DropDown.jsx";
import Upload from "../../components/Chinges/Upload.jsx";
import UploadButton from "../../components/Chinges/UploadButton.jsx";

function AddProduct() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    category: "",
    stock_quantity: "",
    price: "",
    image: "placeholderImg.png",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/products/", values)
      .then((res) => {
        toast.success("Product Details updated successfully!");
        setTimeout(() => {
          navigate("/Admin/ProductManagement");
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      });
  };

  return (
    <>
      <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto">
          <div className="w-full pt-3 pr-7 flex justify-end">
            <AdminProfile />
          </div>
          <div className="w-full flex justify-between items-center">
            <BackButton onClick={() => navigate("/Admin/ProductManagement")} />
          </div>
          <div className="w-full h-135 grid grid-cols-2 gap-7 pl-4 pr-8">
            <div className="h-full bg-gray-800 rounded-2xl flex flex-col p-7 gap-3">
              <BaseInput
                label="Product Id"
                className="pb-5"
                onChange={(e) => setValues({ ...values, id: e.target.value })}
              />
              <BaseInput
                label="Product Name "
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <Description
                label="Product Description"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
              <div className="grid grid-cols-[0.6fr_0.4fr] gap-4">
                <BaseInput
                  label="Quantity"
                  onChange={(e) =>
                    setValues({ ...values, stock_quantity: e.target.value })
                  }
                />
                <DropDown
                  label="Category"
                  options={[
                    { value: "", label: "-- select an option --" },
                    { value: "hot_sauce", label: "Hot Sauce" },
                    { value: "chili_oils", label: "Chili Oils" },
                    { value: "pickled_jalopeno", label: "Pickled Jalopeno" },
                    { value: "limited_item", label: "Limited Item" },
                  ]}
                  value={values.category}
                  onChange={(e) =>
                    setValues({ ...values, category: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="h-full bg-gray-800 rounded-2xl">
              <div className="px-7 pt-8">
                <Upload
                  onUploadSuccess={(url) =>
                    setValues({ ...values, image: url })
                  }
                />
              </div>
              <div className="bg-gray-800 flex flex-col p-7 gap-3">
                <DropDown
                  label="Spice Level (Future Addition)"
                  options={[
                    { value: "Mild", label: "Mild" },
                    { value: "Spicy", label: "Spicy" },
                    { value: "Very Spicy", label: "Very Spicy" },
                    { value: "Extreme", label: "Extreme" },
                  ]}
                />
                <div className="w-full flex justify-between">
                  <BaseInput
                    label="Price"
                    onlyNumber
                    min="0"
                    value={values.price}
                    onChange={(e) =>
                      setValues({ ...values, price: e.target.value })
                    }
                  />
                  <div className="mt-8">
                    <UploadButton onClick={handleSubmit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={!!values.is_active}
        onChange={(e) => setValues({ ...values, is_active: e.target.checked })}
        hidden
      />
      <Toaster richColors />
    </>
  );
}

export default AddProduct;
