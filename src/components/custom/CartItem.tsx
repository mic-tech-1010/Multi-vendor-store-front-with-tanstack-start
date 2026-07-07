import { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { BookmarkPlus, Trash2, MinusIcon, PlusIcon } from "lucide-react"
import type { CartItem as CartItemType } from "#/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "#/server/api"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"

export interface ApiResponse {
  message: string;
}

function CartItem({ cartItem }: { cartItem: CartItemType }) {

  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const { mutateAsync: deleteCartItem, isPending: deleteIsPending } = useMutation({
    mutationFn: async (itemId: number): Promise<ApiResponse> => {
      return api(`/public/cart/items/${itemId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })

  const { mutateAsync: updateCartItem, isPending: updateIsPending } = useMutation({
  mutationFn: async (params: { itemId: number; quantity: number }): Promise<ApiResponse> => {
    return api(`/public/cart/items/${params.itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: params.quantity }),
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  },
})

  const onDeleteClick = async () => {

    const response = await deleteCartItem(cartItem.id)

    toast.success(response?.message)

  }

  const onQuantityChange = async (newQuantity: number) => {
    const previousQuantity = quantity;

    setQuantity(newQuantity);

    try {
     await updateCartItem({
        itemId: cartItem.id,
        quantity: newQuantity,
      });

    } catch (error) {
      setQuantity(previousQuantity);
      toast.error("Failed to update quantity");
    }
  };

  const activeSku = useMemo(() => {
    const selectedId = cartItem.productSkuId

    const match = cartItem.product.skus.filter((sku) => sku.id === selectedId)

    if (match.length > 0) {
      return match[0]
    }

    return null
  }, [cartItem.product.skus, cartItem.productSkuId])

  const activeImage = useMemo(() => {
    if (activeSku) {
      const match = activeSku.attributeValues.filter(
        (attr) => attr?.images && attr.images.length > 0,
      )

      if (match && match.length > 0) {
        return match[0]?.images?.[0]
      }
    }

    if (cartItem.product.images && cartItem.product.images.length > 0) {
      return cartItem.product.images[0]
    }

    return null
  }, [activeSku, cartItem.product.images])

  const activeQuantity = useMemo(() => {
    if (activeSku) {
      return activeSku.quantity
    }

    return cartItem.product.quantity
  }, [activeSku, cartItem.product.quantity])

  return (
    <>
      <Card className="group overflow-hidden border-border/60 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="p-0">

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5">
            <Link
              to="/"
              className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/40 p-2 sm:h-36 sm:w-36"
            >
              <img
                src={activeImage?.imageUrl}
                alt={activeImage?.imageAltText || cartItem.product.name}
                className="h-full w-full object-contain transition duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-foreground">
                    <Link to="/" className="text-foreground! hover:text-foreground/80">
                      {cartItem.product.name}
                    </Link>
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {activeSku?.attributeValues?.length ? (
                    activeSku.attributeValues.map((value, index) => (
                      <div
                        key={value?.id ?? `variant-${index}`}
                      >

                        <span>
                          {value?.productAttribute?.name}:
                        </span>

                        <span
                          className="rounded-full bg-muted/70 px-2.5 py-1 font-medium text-foreground"
                        >
                          {value?.value}
                        </span>

                      </div>

                    ))
                  ) : (
                    <span className="rounded-full bg-muted/70 px-2.5 py-1 text-muted-foreground">
                      Standard option
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                    Qty {quantity}
                  </span>
                  <span>Unit price {CurrencyFormatter(cartItem.price).formatted}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-border/60 pt-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-wrap gap-2">

                  <div>
                    <ButtonGroup>
                      <Button
                        disabled={quantity <= 1 || updateIsPending}
                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                        size="sm"
                        variant="outline"
                      >
                        <MinusIcon />
                      </Button>
                      <ButtonGroupText className="min-w-12 justify-center">
                        {updateIsPending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
                        ) : (
                          quantity
                        )}
                      </ButtonGroupText>
                      <Button
                        disabled={quantity >= activeQuantity || updateIsPending}
                        onClick={() => onQuantityChange(Math.min(activeQuantity, quantity + 1))}
                        size="sm"
                        variant="outline"
                      >
                        <PlusIcon />
                      </Button>
                    </ButtonGroup>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 rounded-full text-foreground hover:bg-muted/70 hover:text-foreground"
                    onClick={() => onDeleteClick()}
                    disabled={deleteIsPending || updateIsPending}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {deleteIsPending ? "Removing..." : "Remove"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 rounded-full text-foreground hover:bg-muted/70 hover:text-foreground"
                  >
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save for later
                  </Button>
                </div>

                <div className="text-right text-base font-semibold text-foreground sm:text-lg nowrap!">
                  {CurrencyFormatter(cartItem.price * quantity).formatted}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card >
      <Separator className="my-4" />
    </>
  )
}

export default CartItem
