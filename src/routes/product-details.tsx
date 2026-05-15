import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product-details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>this from the product detail page</div>
}
