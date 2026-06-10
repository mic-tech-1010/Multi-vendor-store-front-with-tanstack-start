
import { api } from './api';

export async function addToCart(input: {
  productId: number;
  skuId: number | null;
  quantity: number;
}) {

  return api('/public/cart', {
    method: 'POST',

    body: JSON.stringify(input),
  });
}