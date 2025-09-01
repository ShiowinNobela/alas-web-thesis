import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Upload from '../../components/bigComponents/Upload.jsx';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import { Button } from 'flowbite-react';

function AddProduct() {
  const [values, setValues] = useState({
    id: '',
    name: '',
    category: '',
    stock_quantity: '',
    price: '',
    image: 'placeholderImg.png',
    description: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/products/', values)
      .then(() => {
        toast.success('Product Details updated successfully!');
        setTimeout(() => {
          navigate('/Admin/ProductManagement');
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      });
  };

  return (
    <>
      <div className="flex h-full flex-col overflow-x-auto bg-white">
        <div className="bg-gray-50">
          <div className="flex w-full items-center justify-between pt-5">
            <BackButton onClick={() => navigate('/Admin/ProductManagement')} />
          </div>
          <div className="grid h-135 w-full grid-cols-2 gap-7 px-8 pt-5">
            <div className="flex h-full flex-col gap-3 rounded-2xl bg-gray-800 p-7">
              <div className="grid grid-cols-[0.6fr_0.4fr] gap-4"></div>
            </div>
            <div className="h-full rounded-2xl bg-gray-800">
              <div className="px-7 pt-8">
                <Upload
                  onUploadSuccess={(url) =>
                    setValues({ ...values, image: url })
                  }
                />
              </div>
              <div className="flex flex-col gap-3 bg-gray-800 p-7">
                <div className="flex w-full justify-between">
                  <div className="mt-8">
                    <Button color="gray" onClick={handleSubmit}>
                      Upload
                    </Button>
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
