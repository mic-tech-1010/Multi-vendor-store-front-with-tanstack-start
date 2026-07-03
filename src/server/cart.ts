
import type { CartQuery } from '#/types';
import { api } from './api';

export interface AddToCartResponse {
  message: string;
}

export async function addToCart(input: {
  productId: number;
  skuId: number | null;
  quantity: number;
}): Promise<AddToCartResponse> {

  return api('/public/cart/items', {
    method: 'POST',

    body: JSON.stringify(input),
  });
}

export async function getCartSummary
 (): Promise<CartQuery>    
{
  return api('/public/cart', {
    method: 'GET',
  });
}