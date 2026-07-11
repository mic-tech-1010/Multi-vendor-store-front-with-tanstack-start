import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/security")({
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Security</h1>
      <p className="text-sm text-muted-foreground">
        Security settings will go here.
      </p>
    </div>
  )
}