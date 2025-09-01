import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Upload from '../../components/bigComponents/Upload.jsx';
import { Button } from 'flowbite-react';

function AddProduct() {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: '',
    name: '',
    category: '',
    stock_quantity: '',
    price: '',
    image: '',
    description: '',
    is_active: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/api/products/' + id)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    const submitValues = {
      ...values,
      is_active: Boolean(values.is_active), // force boolean
    };
    axios
      .put('/api/products/' + id, submitValues)
      .then((res) => {
        setValues({
          ...values,
          is_active: Boolean(res.data.is_active),
        });
        console.log(res);
        toast.success('Product Details updated successfully!');
        setTimeout(() => {
          navigate('/Admin/ProductManagement');
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      });
  };

  return (
    <div className="flex h-full flex-col overflow-x-auto bg-white">
      {/* Main Content */}
      <main className="flex flex-col gap-2 p-6">
        {/* Top bar with Back Button */}
        <div className="flex items-center justify-start">
          <button
            onClick={() => navigate('/Admin/ProductManagement')}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black shadow transition-colors duration-200 hover:bg-gray-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Form Card */}
        <section className="rounded-xl bg-white p-8 shadow-lg">
          <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-black">Basic Info</h2>

              <div className="grid gap-4 sm:grid-cols-2"></div>

              <div className="mt-2 flex items-center gap-3">
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-black"
                >
                  Active
                </label>
                <input
                  id="active"
                  type="checkbox"
                  checked={!!values.is_active}
                  onChange={(e) =>
                    setValues({ ...values, is_active: e.target.checked })
                  }
                  className="h-5 w-5 rounded-md accent-[#d3723a]"
                />
              </div>
            </div>

            {/* Right Column – Image Upload */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-black">
                Product Image
              </h2>
              <Upload
                onUploadSuccess={(url) => setValues({ ...values, image: url })}
              />
            </div>
          </div>

          {/* Save Button Centered */}
          <div className="mt-10 flex justify-center">
            <Button color="gray" onClick={handleUpdate}>
              Upload
            </Button>
          </div>
        </section>

        <Toaster richColors />
      </main>
    </div>
  );
}

export default AddProduct;
