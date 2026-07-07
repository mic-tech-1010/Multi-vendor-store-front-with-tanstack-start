import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCardIcon } from 'lucide-react';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import CartItem from '@/components/custom/CartItem';
import { useCartQuery } from '@/hooks/useCart';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  const [mounted, setMounted] = useState(false);


  // this helps to keep server and client rendering in sync, preventing hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useCartQuery(mounted);

  if (!mounted) {
    return (
      <main className="mx-auto p-8">
        <div className="space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="h-32 rounded bg-slate-200 animate-pulse" />
          <div className="h-32 rounded bg-slate-200 animate-pulse" />
        </div>
      </main>
    );
  }

  const cartItems = data?.data?.items;

  if (isLoading) {
    return (
      <main className="mx-auto p-8">
        <div className="space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="h-32 rounded bg-slate-200 animate-pulse" />
          <div className="h-32 rounded bg-slate-200 animate-pulse" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="mx-auto p-8 flex flex-col lg:flex-row gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>

        <CardContent>
          {cartItems?.length === 0 && (
            <div className="py-2 text-gray-500 text-center">
              You don't have any items in the cart yet.
            </div>
          )}

          {cartItems?.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          Subtotal ({data?.data.itemCount ?? 0} products): &nbsp;
          {CurrencyFormatter(Number(data?.data.subtotal ?? 0)).formatted}

          <form action="" method="post">
            <Button variant="default">
              <CreditCardIcon />
              Proceed to checkout
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}