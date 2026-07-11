import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/profile")({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-sm text-muted-foreground">
        Your profile settings will go here.
      </p>
    </div>
  )
}