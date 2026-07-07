import { createFileRoute } from '@tanstack/react-router';
import ProductGallery from '#/components/custom/ProductGallery';
import ProductVariationSelector from '#/components/custom/ProductVariationSelector';
import ProductPriceCard from '#/components/custom/ProductPriceCard';
import {
  getProductBySlug,
} from '#/server/products';
import {
  useMemo,
  useState,
} from 'react';
import { ProductDetailBreadcrumb } from '#/components/custom/ProductDetailBreadcrumb';
import type { Image, ProductAttributeValue } from '#/types';

export const Route = createFileRoute(
  '/products/$slug'
)({

  loader: async ({ params }) => {

    const productQuery = await getProductBySlug({ data: { slug: params.slug } });

    return {
      product: productQuery.data,
    };

  },

  component: ProductDetailsPage,
});

function ProductDetailsPage() {

  const { product } =
    Route.useLoaderData();

  const [selectedOptions, setSelectedOptions] =
    useState<Record<number, ProductAttributeValue>>(() => {
      const defaults: Record<number, ProductAttributeValue> = {};

      if (product?.attributes?.length) {
        product.attributes.forEach((attr) => {
          if (attr.values?.length) {
            defaults[attr.id] = attr.values[0];
          }
        });
      };

      return defaults
    });

  const [previewImages, setPreviewImages] =
    useState<Image[] | null>(null);

  /*
  |--------------------------------------------------------------------------
  | SKU MATCHING
  |--------------------------------------------------------------------------
  */

  const selectedSku = useMemo(() => {

    const selectedIds =
      Object.values(selectedOptions)
        .map((option) => option.id)
        .sort();

    for (const sku of product?.skus) {

      const skuIds =
        sku.attributeValues
          .map((value) => value.id)
          .sort();

      const matches =
        selectedIds.length === skuIds.length &&
        skuIds.every(
          (id, i) => id === selectedIds[i]
        );

      if (matches) {
        return sku;
      }
    }

    return null;

  }, [selectedOptions, product]);

  /*
  |--------------------------------------------------------------------------
  | ACTIVE OPTION IMAGES
  |--------------------------------------------------------------------------
  */

  const activeOptionImages = useMemo(() => {

    for (const attribute of product.attributes) {

      const selectedValueId =
        selectedOptions[attribute.id].id;

      const selectedValue =
        attribute.values.find(
          (v: any) => v.id === selectedValueId
        );

      if (selectedValue?.images?.length) {
        return selectedValue.images;
      }
    }

    return null;

  }, [selectedOptions, product]);

  /*
  |--------------------------------------------------------------------------
  | IMAGES
  |--------------------------------------------------------------------------
  */

  const images = useMemo(() => {

    if (previewImages) {
      return previewImages;
    }

    if (activeOptionImages) {
      return activeOptionImages;
    }

    return product.images;

  }, [
    previewImages,
    activeOptionImages,
    product,
  ]);

  /*
  |--------------------------------------------------------------------------
  | SELECT OPTION
  |--------------------------------------------------------------------------
  */

  const chooseOption = (
    attributeId: number,
    value: ProductAttributeValue
  ) => {

    setPreviewImages(null);

    setSelectedOptions((prev) => {

      const updated = {
        ...prev,
        [attributeId]: value,
      };

      return updated;
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <ProductDetailBreadcrumb product={product} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-5 xl:col-span-7">
          <ProductGallery images={images} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {product.name}
            </h1>
          </div>

          {product?.attributes?.length > 0 ?
            (
              <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6">
                <ProductVariationSelector
                  product={product}
                  selectedOptions={selectedOptions}
                  chooseOption={chooseOption}
                  setPreviewImages={setPreviewImages}
                />
              </div>
            ) : null
          }

          <div
            className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml,
            }}
          />
        </div>

        <div className="lg:col-span-3 xl:col-span-2">
          <ProductPriceCard product={product} selectedSku={selectedSku} />
        </div>
        
      </div>

    </main>

  );
}
