import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, getCartSummary, removeItemFromCart, updateCartItemFunction } from '#/server/cart';

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

export function useDeleteCartItemMutation() {
 const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
}

export function useUpdateCartItemMutation() {
 const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
}