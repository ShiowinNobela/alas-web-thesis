import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, toggleProductStatus, updateStockPrice } from '@/api/products';

// Query: Get all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}

// Mutation: Toggle product status
export function useToggleProductStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleProductStatus,
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
}

// Mutation: Update stock & price
export function useUpdateStockPrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStockPrice,
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
}
