import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/addresses")({
  component: AddressesPage,
})

function AddressesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Addresses</h1>
      <p className="text-sm text-muted-foreground">
        Your saved addresses will go here.
      </p>
    </div>
  )
}