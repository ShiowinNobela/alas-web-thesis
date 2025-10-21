import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'flowbite-react';
import { PlusCircle, Edit, Package } from 'lucide-react';
import ErrorState from '@/components/States/ErrorState';
import { useProducts } from '@/hooks/useProducts';

function ProductManagement() {
  const navigate = useNavigate();

  const { data: products = [], isLoading, isError, refetch } = useProducts();

  return (
    <div className="bg-admin min-h-screen p-4">
      <div className="mx-auto max-w-screen-2xl">
        {/* Header with add product button */}
        <Card className="bg-card mb-4 ring-1">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Package className="h-6 w-6" />
              Product Management
            </h1>
            <Link to="/admin/add-product">
              <Button color="gray">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Product
              </Button>
            </Link>
          </div>
        </Card>

        {/* Loading and error states */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[...Array(10)].map((_, index) => (
              <Card key={index} className="animate-pulse ring-1">
                <div className="h-48 rounded-t-lg bg-gray-300"></div>
                <div className="space-y-3 p-4">
                  <div className="h-6 rounded bg-gray-300"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                    <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                  </div>
                  <div className="h-10 rounded bg-gray-300"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <Card
              key={product.id}
              className="ring-1"
              imgAlt={product.name}
              imgSrc={
                product.image ||
                'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302621/alas_uploads/cjqs0r97a5vfzxh34mos.jpg'
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302621/alas_uploads/cjqs0r97a5vfzxh34mos.jpg';
              }}
            >
              <div className="space-y-2">
                <h5 className="text-content line-clamp-2 text-lg font-bold tracking-tight">{product.name}</h5>

                <div className="flex items-center justify-between">
                  <Badge color={product.stock_quantity < 11 ? 'failure' : 'success'} className="w-fit">
                    Stock: {product.stock_quantity}
                  </Badge>
                  <span className="text-content font-semibold">₱{parseFloat(product.price).toLocaleString()}</span>
                </div>

                <Button onClick={() => navigate(`/admin/edit-product/${product.id}`)} className="c w-full" color="gray">
                  <Edit className="mr-2 h-5 w-5" />
                  Edit Product
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {!isLoading && products.length === 0 && (
          <div className="rounded-lg border-2 border-dashed py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-content mt-2 text-lg font-medium">No products found</h3>
            <p className="text-lighter mt-1">Get started by adding a new product</p>
            <div className="mt-6">
              <Link to="/admin/add-product">
                <Button gradientDuoTone="purpleToBlue">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
