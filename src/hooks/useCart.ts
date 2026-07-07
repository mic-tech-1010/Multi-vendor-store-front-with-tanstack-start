import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCartSummary } from '#/server/cart';

export function useCartQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartSummary,
    enabled,
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