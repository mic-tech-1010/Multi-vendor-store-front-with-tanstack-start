import { Button }
  from '#/components/ui/button';

import { Input }
  from '#/components/ui/input';
import type { Product, ProductAttribute } from '#/types';

export default function ProductVariationSelector({
  product,
  selectedOptions,
  chooseOption,
  setPreviewImages,
}: {
  product: Product,
  selectedOptions: any,
  chooseOption: any,
  setPreviewImages: any
}) {

  return (
    <div className="space-y-6">

      {product.attributes.map(
        (attribute: ProductAttribute) => (

          <div key={attribute.id}>

            <b className="block mb-3">
              {attribute.name}
            </b>

            {/* IMAGE TYPE */}

            {attribute.type === 'image' && (
              <div className="flex flex-wrap gap-2">

                {attribute.values.map(
                  (value: any) => {

                    const isActive =
                      selectedOptions[
                      attribute.id
                      ].id === value.id;

                    return (
                      <div
                        key={value.id}

                        onClick={() =>
                          chooseOption(
                            attribute.id,
                            value
                          )
                        }

                        onMouseEnter={() => {

                          if (value.images?.length) {
                            setPreviewImages(
                              value.images
                            );
                          }
                        }}

                        onMouseLeave={() =>
                          setPreviewImages(null)
                        }
                      >
                        <img
                          src={
                            value.images[0]
                              .imageUrl
                          }

                          alt={value.value}

                          className={`
                            w-16 border-2 cursor-pointer
                            ${isActive
                              ? 'border-blue-500'
                              : 'border-gray-300'
                            }
                          `}
                        />
                      </div>
                    );
                  }
                )}

              </div>
            )}

            {/* RADIO TYPE */}

            {attribute.type === 'text' && (
              <div className="flex flex-wrap gap-2">

                {attribute.values.map(
                  (value: any) => {

                    const isChecked =
                      selectedOptions[
                      attribute.id
                      ].id === value.id;

                    return (
                      <Button
                        variant={"default"}
                        key={value.id}
                        tabIndex={0}
                        className={`relative rounded-none border
                                    ${isChecked
                            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-500"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        {value.value}
                        <Input
                          onChange={() =>
                            chooseOption(attribute.id, value)
                          }
                          className="absolute opacity-0 h-full w-full"
                          value={value.id}
                          type="radio"
                          checked={isChecked}
                          name={"variation_type_" + attribute.id}
                          aria-label={value.value}
                        />
                      </Button>
                    );
                  }
                )}

              </div>
            )}

          </div>
        )
      )}

    </div>
  );
}