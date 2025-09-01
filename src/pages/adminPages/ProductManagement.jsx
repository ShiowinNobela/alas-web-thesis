import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, Alert } from 'flowbite-react';
import { PlusCircle, Edit, Package, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const fetchProducts = async () => {
  const res = await axios.get('/api/products');
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

function ProductManagement() {
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

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
            <Link to="/Admin/AddProduct">
              <Button gradientDuoTone="purpleToBlue">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Product
              </Button>
            </Link>
          </div>
        </Card>

        {/* Loading and error states */}
        {isLoading && (
          <div className="py-12 text-center">
            <Spinner size="xl" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {isError && (
          <Alert color="failure" icon={AlertTriangle} className="mb-4">
            Failed to load products. Please try again later.
          </Alert>
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
                <h5 className="text-content line-clamp-2 text-lg font-bold tracking-tight">
                  {product.name}
                </h5>

                <div className="flex items-center justify-between">
                  <Badge
                    color={product.stock_quantity < 11 ? 'failure' : 'success'}
                    className="w-fit"
                  >
                    Stock: {product.stock_quantity}
                  </Badge>
                  <span className="text-content font-semibold">
                    ₱{parseFloat(product.price).toLocaleString()}
                  </span>
                </div>

                <Button
                  onClick={() => navigate(`/Admin/EditProduct/${product.id}`)}
                  className="w-full"
                  gradientDuoTone="cyanToBlue"
                >
                  <Edit className="mr-2 h-5 w-5" />
                  Edit Product
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="relative"></div>

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div className="rounded-lg border-2 border-dashed py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-content mt-2 text-lg font-medium">
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              Get started by adding a new product
            </p>
            <div className="mt-6">
              <Link to="/Admin/AddProduct">
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
