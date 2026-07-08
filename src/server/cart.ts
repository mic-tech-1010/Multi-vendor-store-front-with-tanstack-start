
import type { CartQuery } from '#/types';
import { api } from './api';

export interface GenericApiResponse {
  message: string;
}

export async function addToCart(input: {
  productId: number;
  skuId: number | null;
  quantity: number;
}): Promise<GenericApiResponse> {

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

export async function mergeCart(): Promise<CartQuery> {
  return api('/public/cart/merge', {
    method: 'POST',
  });
}

export async function removeItemFromCart(itemId: number): Promise<GenericApiResponse> {
  return api(`/public/cart/items/${itemId}`, {
    method: 'DELETE',
  });
}

export async function updateCartItemFunction(params: { itemId: number; quantity: number }): Promise<GenericApiResponse> {
    return api(`/public/cart/items/${params.itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: params.quantity }),
    });
  }