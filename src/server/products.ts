
import type { ProductQuery } from '#/types';
import { api } from './api';

export async function getProductBySlug(
  slug: string
): Promise<ProductQuery> {

  return api(`/public/products/${slug}`);
}