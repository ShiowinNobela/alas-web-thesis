import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import RHFTextarea from '@/components/rhform/RHFTextArea';
import RHFFileUpload from '@/components/rhform/RHFFileUpload';
import { Button } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function UpdateProduct() {
  const { id: productId } = useParams();

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      image: '',
      description: '',
    },
  });

  // Fetch existing product
  const {
    data: product,
    isLoading: loadingProduct,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => axios.get(`/api/products/${productId}`).then((res) => res.data),
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: Number(product.price),
        image: product.image,
        description: product.description,
      });
    }
  }, [product, reset]);

  // Mutation for updating product
  const mutation = useMutation({
    mutationFn: (updatedProduct) => axios.put(`/api/products/${productId}`, updatedProduct).then((res) => res.data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      name: data.name,
      category: data.category,
      price: Number(data.price),
      image: data.image,
      description: data.description,
    });
  };

  return (
    <>
      <div className="bg-admin flex flex-col overflow-x-auto p-4">
        <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-6 shadow ring-1">
          {/* Header */}
          <div className="mb-6 flex w-full items-center gap-3">
            <BackButton label="" className="py-6 ring-1" />

            <div className="flex flex-col">
              <span className="text-lighter text-sm">Update details of product: {product?.name}</span>
              <h1 className="flex items-center gap-1 text-xl font-bold">Edit Product</h1>
            </div>
          </div>

          {loadingProduct ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">{error?.response?.data?.message || 'Failed to load product'}</p>
          ) : product ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto grid w-full max-w-full grid-cols-1 items-stretch gap-8 md:grid-cols-2"
            >
              {/* Left side: form fields */}
              <div className="flex flex-col gap-7">
                <RHFFileUpload
                  name="image"
                  control={control}
                  rules={{ required: 'Image is required' }}
                  onUploadSuccess={(uploadData) => setValue('image', uploadData.url)}
                />

                <RHFTextInput
                  name="name"
                  control={control}
                  label="Product Name"
                  placeholder="Enter product name"
                  rules={{ required: 'Name is required' }}
                />

                <RHFTextInput
                  name="category"
                  control={control}
                  label="Category"
                  placeholder="Category"
                  rules={{ required: 'Category is required' }}
                />

                <RHFTextInput
                  name="price"
                  control={control}
                  label="Price"
                  placeholder="Price"
                  type="number"
                  rules={{ required: 'Price is required' }}
                />

                <RHFTextarea
                  name="description"
                  control={control}
                  label="Description"
                  placeholder="Enter product description"
                  rows={6}
                  rules={{ required: 'Description is required' }}
                />

                <Button type="submit" color="gray" disabled={mutation.isLoading} className="w-full">
                  {mutation.isLoading ? 'Updating...' : 'Update Product'}
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
          ) : null}
        </main>
      </div>

      <Toaster richColors />
    </>
  );
}

export default UpdateProduct;
