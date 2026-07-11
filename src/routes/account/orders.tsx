import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/orders")({
  component: OrdersPage,
})

function OrdersPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="text-sm text-muted-foreground">
        Your orders page will go here.
      </p>
    </div>
  )
}