import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, Alert } from 'flowbite-react';
import { PlusCircle, Edit, Package, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import ErrorState from '@/components/States/ErrorState';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';


const fetchProducts = async () => {
  const res = await axios.get('/api/products/admin/list');
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

function ProductManagement() {
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return (
    <ErrorBoundary>

    <div className="min-h-screen p-4 bg-admin">
      <div className="mx-auto max-w-screen-2xl">
        {/* Header with add product button */}
        <Card className="mb-4 bg-card ring-1">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Package className="w-6 h-6" />
              Product Management
            </h1>
            <Link to="/Admin/AddProduct">
              <Button gradientDuoTone="purpleToBlue">
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </Card>

        {/* Loading and error states */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[...Array(10)].map((_, index) => (
              <Card key={index} className="ring-1 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                    <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <ErrorState
            error={isError}
            onRetry={refetch}
            title="Failed to load Products"
            retryText="Retry Request"
          />
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
                <h5 className="text-lg font-bold tracking-tight text-content line-clamp-2">{product.name}</h5>

                <div className="flex items-center justify-between">
                  <Badge color={product.stock_quantity < 11 ? 'failure' : 'success'} className="w-fit">
                    Stock: {product.stock_quantity}
                  </Badge>
                  <span className="font-semibold text-content">₱{parseFloat(product.price).toLocaleString()}</span>
                </div>

                <Button
                  onClick={() => navigate(`/Admin/EditProduct/${product.id}`)}
                  className="w-full"
                  gradientDuoTone="cyanToBlue"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Product
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="relative"></div>

        {!isLoading && products.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed rounded-lg">
            <Package className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-content">No products found</h3>
            <p className="mt-1 text-gray-500">Get started by adding a new product</p>
            <div className="mt-6">
              <Link to="/Admin/AddProduct">
                <Button gradientDuoTone="purpleToBlue">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
    </ErrorBoundary>
  );
}

export default ProductManagement;
