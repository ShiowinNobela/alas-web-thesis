import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import RHFTextarea from '@/components/rhform/RHFTextArea';
import RHFFileUpload from '@/components/rhform/RHFFileUpload';
import { Button } from 'flowbite-react';

function AddProduct() {
  const { control, handleSubmit, reset, setValue, watch } = useForm();

  // React Query mutation
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
      });
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
            {/* Left side: form inputs */}
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
                name="image"
                control={control}
                rules={{ required: 'Image is required' }}
                onUploadSuccess={(uploadData) => setValue('image', uploadData.url)}
              />

              <RHFTextInput
                name="category"
                control={control}
                label="Category"
                placeholder="Category"
                rules={{ required: 'Category is required' }}
              />

              <div className="grid grid-cols-2 gap-4">
                <RHFTextInput
                  name="stock_quantity"
                  control={control}
                  label="Stock Quantity"
                  placeholder="Stock"
                  type="number"
                  rules={{ required: 'Stock is required' }}
                />
                <RHFTextInput
                  name="price"
                  control={control}
                  label="Price"
                  placeholder="Price"
                  type="number"
                  rules={{ required: 'Price is required' }}
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

            {/* Right side: image preview */}
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

      <Toaster richColors />
    </>
  );
}

export default AddProduct;
