import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import ProductCard from '@/components/cards/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorState from '@/components/States/ErrorState';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ProductPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const [globalFilter, setGlobalFilter] = useState('');

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('/api/products');
      return res.data;
    },
  });

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/LoginPage');
      return;
    }
  };

  // TanStack Table setup, seems big but they said as it gets bigger this becomes more scalable
  const columnHelper = createColumnHelper();
  const columns = [columnHelper.accessor('name', { cell: (info) => info.getValue() })];

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  });

  const filteredProducts = table.getRowModel().rows.map((row) => row.original);

  return (
    <div className="h-full bg-neutral">
      <div className="flex pb-20 md:pb-40">
        <div className="relative flex-1 h-full">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 md:px-20">
            <div>
              <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl font-heading text-content ">Alas Menu and Spices</h1>
              <p className="my-2 text-sm text-lighter sm:text-base">From mild to wild - find your perfect heat level</p>
            </div>
            <div className="flex flex-col items-center w-full gap-3 sm:flex-row sm:w-auto">
              <Input
                type="text"
                placeholder="Search products..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full py-3 text-sm bg-red-100 border-primary sm:w-48 rounded-2xl"
              />
              <Button variant="outline" size="lg" className="w-full py-3 sm:w-auto">
                <Filter className="size-6" />
                <span className='ml-2 sm:hidden'>Filter</span>
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 pb-20 sm:px-6 md:px-20">
            {isLoading ? (
              <div className={isLoggedIn ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'}>
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
            ) : (
              <div
                className={
                  isLoggedIn ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
