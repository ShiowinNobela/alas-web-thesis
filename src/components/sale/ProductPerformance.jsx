import { Card } from 'flowbite-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ProductList = ({ products, type }) => {
  if (!products?.length) return null;

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-card flex items-center justify-between rounded-lg p-4 ring-1">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quantity sold: {product.quantitySold} | Price: ₱{product.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 dark:text-white">₱{product.revenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductPerformance = ({ products, period, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="animate-pulse dark:bg-gray-800">
          <div className="h-48 rounded bg-gray-200 dark:bg-gray-700"></div>
        </Card>
        <Card className="animate-pulse dark:bg-gray-800">
          <div className="h-48 rounded bg-gray-200 dark:bg-gray-700"></div>
        </Card>
      </div>
    );
  }

  if (!products) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="ring-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Best Selling Products</h2>
          <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
        </div>
        <ProductList products={products.bestSelling} type="best" />
      </Card>

      <Card className="ring-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Least Selling Products</h2>
          <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-400" />
        </div>
        <ProductList products={products.leastSelling} type="least" />
      </Card>
    </div>
  );
};

export default ProductPerformance;
