import { Link, useRouterState } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { accountNavItems } from "./AccountNav"

type AccountSidebarProps = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name ?? "User"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email ?? ""}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2">
        <nav className="flex flex-col gap-1">
          {accountNavItems.map((item) => {
            const isActive =
              pathname === item.to 

            const Icon = item.icon

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-foreground!",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}