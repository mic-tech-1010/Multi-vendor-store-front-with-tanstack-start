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
    <div className="space-y-5">
      {product.attributes.map(
        (attribute: ProductAttribute) => (
          <div key={attribute.id} className="space-y-3">
            <b className="block text-sm font-semibold uppercase tracking-wide text-foreground/90">
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
                        className="rounded-xl border border-border/70 p-1 transition-colors"
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
                            h-16 w-16 cursor-pointer rounded-lg object-cover transition-all sm:h-20 sm:w-20
                            ${isActive
                              ? 'border-2 border-primary shadow-sm'
                              : 'border border-border/70 hover:border-primary/60'
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
                        className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors
                                    ${isChecked
                            ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
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