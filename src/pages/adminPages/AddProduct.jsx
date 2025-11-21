import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import RHFTextarea from '@/components/rhform/RHFTextArea';
import RHFFileUpload from '@/components/rhform/RHFFileUpload';
import { Button } from 'flowbite-react';
import RHFSelectInput from '@/components/rhform/RHFSelectInput';
import { useState } from 'react';
import { Flame } from 'lucide-react';

function AddProduct() {
  const { control, handleSubmit, reset, setValue, watch } = useForm();
  const [resetKey, setResetKey] = useState(0);

  const mutation = useMutation({
    mutationFn: (newProduct) => axios.post('/api/products/', newProduct).then((res) => res.data),
    onSuccess: () => {
      toast.success('Product added successfully!');
      reset({
        id: '',
        name: '',
        category: '',
        stock_quantity: '',
        price: '',
        image: '',
        description: '',
        spice_level: 0,
      });
      setResetKey((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      id: data.id,
      name: data.name,
      category: data.category,
      stock_quantity: Number(data.stock_quantity),
      price: Number(data.price),
      image: data.image,
      description: data.description,
      spice_level: data.spice_level,
    });
  };

  return (
    <>
      <div className="bg-admin flex flex-col overflow-auto p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-6 shadow ring-1">
          <div className="mb-6 flex w-full items-center gap-3">
            <BackButton label="" className="py-6 ring-1" />

            <div className="flex flex-col">
              <span className="text-lighter text-sm">Create a new product for the menu</span>
              <h1 className="flex items-center gap-1 text-xl font-bold">Add Product</h1>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto grid w-full max-w-full grid-cols-1 gap-8 md:grid-cols-2"
          >
            <div className="flex flex-col gap-7 rounded-xl">
              <RHFTextInput
                name="id"
                control={control}
                label="Product ID"
                placeholder="Product ID"
                rules={{ required: 'ID is required' }}
              />
              <RHFTextInput
                name="name"
                control={control}
                label="Product Name"
                placeholder="Product Name"
                rules={{ required: 'Name is required' }}
              />

              <RHFFileUpload
                key={resetKey}
                name="image"
                control={control}
                rules={{ required: 'Image is required' }}
                onUploadSuccess={(uploadData) => setValue('image', uploadData.url)}
              />

              <RHFSelectInput
                name="category"
                control={control}
                label="Category"
                placeholder="Select a category"
                rules={{ required: 'Category is required' }}
                options={['condiment', 'pickles', 'powders']}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="spice_level" className="text-sm font-medium">
                  Spice Level
                </label>
                <input
                  id="spice_level"
                  name="spice_level"
                  type="range"
                  min={0}
                  max={5}
                  value={watch('spice_level')}
                  onChange={(e) => setValue('spice_level', Number(e.target.value))}
                  className="sr-only"
                />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      aria-label={`Set spice level ${level}`}
                      aria-pressed={watch('spice_level') >= level}
                      className="m-0 border-0 bg-transparent p-0 focus:outline-none"
                      onClick={() => setValue('spice_level', level)}
                    >
                      <Flame
                        size={24}
                        className={watch('spice_level') >= level ? 'fill-current text-red-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Click to select spice level</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <RHFTextInput
                  name="stock_quantity"
                  control={control}
                  label="Stock Quantity"
                  placeholder="Stock"
                  type="number"
                  rules={{
                    required: 'Stock is required',
                    min: {
                      value: 0,
                      message: 'Stock cannot be negative',
                    },
                  }}
                  min={0}
                />
                <RHFTextInput
                  name="price"
                  control={control}
                  label="Price"
                  placeholder="Price"
                  type="number"
                  rules={{
                    required: 'Price is required',
                    min: {
                      value: 0,
                      message: 'Stock cannot be negative',
                    },
                  }}
                  min={0}
                />
              </div>

              <RHFTextarea
                name="description"
                control={control}
                label="Description"
                placeholder="Enter product description"
                rows={4}
                rules={{ required: 'Description is required' }}
              />

              <Button type="submit" color="gray" disabled={mutation.isLoading} className="w-full">
                {mutation.isLoading ? 'Adding...' : 'Add Product'}
              </Button>
            </div>

            <div className="flex h-full flex-col items-center justify-center rounded-xl p-8 ring-1">
              {watch('image') ? (
                <img
                  src={watch('image')}
                  alt="Uploaded preview"
                  className="h-full max-h-[500px] w-auto rounded-lg object-cover shadow"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400">
                  No image uploaded
                </div>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default AddProduct;
