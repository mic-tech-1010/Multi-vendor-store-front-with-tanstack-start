import {
  Card,
  CardContent,
} from '#/components/ui/card';
import {
  NativeSelect,
  NativeSelectOption,
} from '#/components/ui/native-select';
import { Button }
  from '#/components/ui/button';
import {
  useState,
} from 'react';
import CurrencyFormatter from '#/components/CurrencyFormatter';
import { toast } from 'sonner';
import { useAddToCartMutation } from '#/hooks/useCart';

export default function ProductPriceCard({
  product,
  selectedSku,
}: any) {


  const addToCartMutation = useAddToCartMutation();

  const [quantity, setQuantity] =
    useState(1);

  const currency =
    CurrencyFormatter(
      selectedSku?.price || product.price
    );

  const stock =
    selectedSku?.quantity ||
    product.quantity;

  const handleAddToCart = async () => {

    const response = await addToCartMutation.mutateAsync({
      productId: product.id,
      skuId: selectedSku?.id ?? null,
      quantity: quantity,
    });

    toast.success(response?.message)

  };

  return (
    <Card>

      <CardContent className="space-y-4 pt-6">

        <div className="flex gap-1 items-start">

          <span className="text-xs mt-1">
            {currency.currencySymbol}
          </span>

          <b className="text-2xl">
            {currency.numericalValue}
          </b>

        </div>

        <p className="text-green-600">
          {stock > 0
            ? 'In Stock'
            : 'Out of Stock'}
        </p>

        {stock > 0 && (
          <>
            <NativeSelect
              value={quantity}

              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
            >
              {Array.from({
                length: Math.min(10, stock),
              }).map((_, i) => (
                <NativeSelectOption
                  key={i}
                  value={i + 1}
                >
                  Quantity: {i + 1}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <Button
              onClick={handleAddToCart}
              className="w-full"
            >
              Add To Cart
            </Button>

            <Button
              variant="secondary"
              className="w-full"
            >
              Buy Now
            </Button>
          </>
        )}

      </CardContent>

    </Card>
  );
}