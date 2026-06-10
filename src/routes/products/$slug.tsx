import { createFileRoute } from '@tanstack/react-router';
import ProductGallery from '#/components/custom/ProductGallery';
import ProductVariationSelector from '#/components/custom/ProductVariationSelector';
import ProductPriceCard from '#/components/custom/ProductPriceCard';
import {
  getProductBySlug,
} from '#/server/products';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProductDetailBreadcrumb } from '#/components/custom/ProductDetailBreadcrumb';
import type { Image, ProductAttributeValue } from '#/types';

export const Route = createFileRoute(
  '/products/$slug'
)({
  loader: async ({ params }) => {

    const productQuery =
      await getProductBySlug(params.slug);

    return {
      product: productQuery.data,
    };
  },

  component: ProductDetailsPage,
});

function ProductDetailsPage() {

  const { product } =
    Route.useLoaderData();

  const navigate =
    Route.useNavigate();

  const [selectedOptions, setSelectedOptions] =
    useState<Record<number, ProductAttributeValue>>({});

  const [previewImages, setPreviewImages] =
    useState<Image[] | null>(null);

  /*
  |--------------------------------------------------------------------------
  | AUTO SELECT FIRST OPTIONS
  |--------------------------------------------------------------------------
  */

  // useEffect(() => {

  //   if (!product?.attributes?.length) {
  //     return;
  //   }

  //   setSelectedOptions((prev) => {
  //     // don't override if already selected
  //     if (Object.keys(prev).length > 0) return prev;

  //     const defaults: Record<number, ProductAttributeValue> = {};

  //     product.attributes.forEach((attr) => {
  //       if (attr.values?.length) {
  //         defaults[attr.id] = attr.values[0];
  //       }
  //     });

  //     return defaults;
  //   });

  // }, [product]);

  /*
  |--------------------------------------------------------------------------
  | SKU MATCHING
  |--------------------------------------------------------------------------
  */

  const selectedSku = useMemo(() => {

    const selectedIds =
      Object.values(selectedOptions).sort();

    for (const sku of product?.skus) {

      const skuIds =
        sku.attributeValues
          .map((v: any) => v.id)
          .sort();

      const matches =
        selectedIds.length === skuIds.length &&
        selectedIds.every(
          (id, i) => id === skuIds[i]
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
        selectedOptions[attribute.id];
 
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
    valueId: number
  ) => {

    setPreviewImages(null);

    setSelectedOptions((prev) => {

      const updated = {
        ...prev,
        [attributeId]: valueId,
      };

      navigate({
        search: {
          options: updated,
        },

        replace: true,
      });

      return updated;
    });
  };

  return (
    <main className="container mx-auto px-0 py-6">

      <ProductDetailBreadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-6">
          <ProductGallery
            images={images}
          />
        </div>

        <div className="lg:col-span-4">

          <h1 className="text-3xl font-semibold mb-4">
            {product.name}
          </h1>

          <ProductVariationSelector
            product={product}
            selectedOptions={selectedOptions}
            chooseOption={chooseOption}
            setPreviewImages={setPreviewImages}
          />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml
            }}
          />

        </div>

        <div className="lg:col-span-2">

          <ProductPriceCard
            product={product}
            selectedSku={selectedSku}
          />

        </div>

      </div>

    </main>
  );
}
