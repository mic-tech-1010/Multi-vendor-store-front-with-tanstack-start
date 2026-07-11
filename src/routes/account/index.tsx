import { createFileRoute } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/account/")({
  component: AccountOverviewPage,
})

function AccountOverviewPage() {
  const { user } = Route.useRouteContext()

  return (
    <div className="space-y-6">
      <div className="hidden lg:block">
        <h1 className="text-2xl font-semibold">My Account</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back{user.name ? `, ${user.name}` : ""}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-2xl">0</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="text-2xl">0</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saved Addresses</CardDescription>
            <CardTitle className="text-2xl">0</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Profile Status</CardDescription>
            <CardTitle className="text-base">Complete</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Your recent orders will appear here once you start ordering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            No orders yet.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}