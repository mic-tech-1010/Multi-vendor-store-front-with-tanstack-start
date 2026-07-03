import { createServerFn } from '@tanstack/react-start';
import type { ProductQuery } from '#/types';
import { api } from './api';

export const getProductBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<ProductQuery> => {
    return api<ProductQuery>(`/public/products/${data.slug}`);
  });