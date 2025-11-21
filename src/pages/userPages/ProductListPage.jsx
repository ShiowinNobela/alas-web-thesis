import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import ProductCard from '@/components/cards/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorState from '@/components/States/ErrorState';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';
import { Filter, ChevronDown, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ProductPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [spiceLevelFilter, setSpiceLevelFilter] = useState(null); // null = no filter

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

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'includesString',
  });

  const showProducts = table
    .getRowModel()
    .rows.map((row) => row.original)
    .filter((product) => {
      if (spiceLevelFilter === null) return true; // no filter
      return product.spice_level === spiceLevelFilter;
    });

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  };

  const handleSortChange = (criteria) => {
    switch (criteria) {
      case 'priceDesc':
        setSorting([{ id: 'price', desc: true }]);
        break;
      case 'priceAsc':
        setSorting([{ id: 'price', desc: false }]);
        break;
      case 'nameAsc':
        setSorting([{ id: 'name', desc: false }]);
        break;
      default:
        setSorting([]);
    }
    setShowDropdown(false);
  };

  return (
    <div className="bg-neutral min-h-screen py-5">
      <div className="flex flex-col pb-20">
        <div className="relative flex-1">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 px-4 py-6 md:flex-row md:items-center md:gap-0 md:px-20">
            <div>
              <h1 className="font-heading text-content text-2xl font-semibold md:text-3xl">Alas Menu and Spices</h1>
              <p className="text-lighter">From mild to wild - find your perfect heat level</p>
            </div>

            <div className="flex w-full flex-row gap-2 sm:w-auto sm:items-center">
              {/* Spice level filter */}
              <div className="ring-primary flex items-center gap-2 rounded-xl p-4 ring-1">
                <span className="text-primary text-sm">Spice Level:</span>
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevelFilter(level)}
                    className="rounded-md border bg-transparent p-1 focus:outline-none"
                    aria-label={`Filter by spice level ${level}`}
                  >
                    <Flame
                      size={16}
                      className={spiceLevelFilter >= level ? 'text-red-500' : 'text-lighter'}
                      fill={spiceLevelFilter >= level ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
                {spiceLevelFilter !== null && (
                  <button
                    type="button"
                    onClick={() => setSpiceLevelFilter(null)}
                    className="bg-secondary rounded-md border px-2 py-1 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Dropdown Filter */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex w-1/8 justify-center py-4 sm:w-auto sm:py-7"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Filter className="size-6 sm:size-7" />
                  <span>Sort</span>
                  <ChevronDown className="size-5" />
                </Button>
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border bg-white text-black shadow-md">
                    <button
                      onClick={() => handleSortChange('priceDesc')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      Highest to Lowest
                    </button>
                    <button
                      onClick={() => handleSortChange('priceAsc')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      Lowest to Highest
                    </button>
                    <button
                      onClick={() => handleSortChange('nameAsc')}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      Alphabetical (A–Z)
                    </button>
                  </div>
                )}
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="border-primary w-full rounded-2xl bg-red-100 py-4 sm:w-64 sm:py-6"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-4 px-4 pb-20 md:px-20">
            {isLoading ? (
              <div
                className={
                  isLoggedIn
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }
              >
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
            ) : showProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Flame size={32} className="mb-4 text-red-500" />
                <p className="text-lg font-medium">No products found for the selected spice level.</p>
                <p className="text-sm">Try changing the spice filter or search term.</p>
              </div>
            ) : (
              <div
                className={
                  isLoggedIn
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }
              >
                {showProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                  </motion.div>
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
