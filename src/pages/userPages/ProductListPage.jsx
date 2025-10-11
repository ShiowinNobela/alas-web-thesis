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

  const { data: products = [], isLoading, isError, refetch } = useQuery({
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
    <div className="min-h-screen bg-neutral">
      <div className="flex flex-col pb-20">
        <div className="relative flex-1">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 px-4 py-6 md:flex-row md:items-center md:gap-0 md:px-20">
            <div>
              <h1 className="text-2xl font-semibold font-heading text-content md:text-4xl">
                Alas Menu and Spices <span className="text-primary">( {products?.length} )</span>
              </h1>
              <p className="mt-2 text-lighter">From mild to wild - find your perfect heat level</p>
            </div>

            <div className="flex flex-row w-full gap-2 sm:items-center sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="flex justify-center py-4 w-1/8 sm:py-7 sm:w-auto"
              >
                <Filter className="size-6 sm:size-8" />
              </Button>
              <Input
                type="text"
                placeholder="Search products..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full py-4 bg-red-100 border-primary sm:w-64 rounded-2xl sm:py-6"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="px-4 pb-20 md:px-20">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <ErrorState
                error={isError}
                onRetry={refetch}
                title="Failed to load Products"
                retryText="Retry Request"
              />
            ) : (
              <div
                className={
                  isLoggedIn
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
                    : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
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

