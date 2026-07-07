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

  const loading = addToCartMutation.isPending

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
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-start gap-1">
            <span className="mt-1 text-sm text-muted-foreground">
              {currency.currencySymbol}
            </span>

            <b className="text-3xl font-semibold tracking-tight text-foreground">
              {currency.numericalValue}
            </b>
          </div>

          <p className={stock > 0 ? 'text-sm font-medium text-emerald-600 dark:text-emerald-400' : 'text-sm font-medium text-muted-foreground'}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>

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
              className="w-full rounded-full"
              disabled={loading}
            >
              Add To Cart
            </Button>

            <Button
              variant="secondary"
              className="w-full rounded-full"
            >
              Buy Now
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}