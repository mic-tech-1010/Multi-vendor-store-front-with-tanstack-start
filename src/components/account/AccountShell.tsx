import type { ReactNode } from "react"
import { AccountSidebar } from "./AccountSidebar"
import { AccountMobileNav } from "./AccountMobileNav"

type AccountShellProps = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  children: ReactNode
}

export function AccountShell({ user, children }: AccountShellProps) {
  return (
    <div className="container py-6 md:py-8 px-2 md:py-4">
      <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
        <div>
          <h1 className="text-xl font-semibold">My Account</h1>
          <p className="text-sm text-muted-foreground">
            Manage your orders, addresses and profile
          </p>
        </div>

        <AccountMobileNav user={user} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] auto-rows-fr">
        <div className="hidden lg:block">
          <AccountSidebar user={user} />
        </div>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}