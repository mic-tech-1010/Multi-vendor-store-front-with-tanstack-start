import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCartSummary } from '#/server/cart';

export function useCartQuery() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartSummary,

    // important for your setup:
    // only fetch in the browser, not during SSR
    enabled: typeof window !== 'undefined',
  });
}

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
}