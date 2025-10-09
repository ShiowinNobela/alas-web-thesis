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
    <div className="bg-neutral h-full">
      <div className="flex pb-40">
        <div className="relative h-full flex-1">
          {/* Header */}
          <div className="flex items-center justify-between py-8 pr-4 pl-6 md:px-20">
            <div>
              <h1 className="font-heading text-content text-3xl font-semibold md:text-4xl">
                Alas Menu and Spices <span className="text-primary">( {products?.length} )</span>
              </h1>
              <p className="text-lighter my-2">From mild to wild - find your perfect heat level</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="lg" className="py-7">
                <Filter className="size-8" />
              </Button>
              <Input
                type="text"
                placeholder="Search products..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="border-primary w-xs rounded-2xl bg-red-100 py-6"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="pr-4 pb-20 pl-6 md:px-20">
            {isLoading ? (
              <div className={isLoggedIn ? 'grid grid-cols-2 gap-6' : 'grid grid-cols-3 gap-6'}>
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
            ) : (
              <div
                className={
                  isLoggedIn
                    ? 'grid grid-cols-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4'
                    : 'grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-4'
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
