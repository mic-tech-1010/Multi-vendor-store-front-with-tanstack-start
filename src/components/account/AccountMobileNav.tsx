import { Link, useRouterState } from "@tanstack/react-router"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { accountNavItems } from "./AccountNav"

type AccountMobileNavProps = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function AccountMobileNav({ user }: AccountMobileNavProps) {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open account navigation</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="border-b px-4 py-4 text-left">
          <SheetTitle>My Account</SheetTitle>
        </SheetHeader>

        <div className="border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
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
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {accountNavItems.map((item) => {
            const isActive =
              pathname === item.to || pathname.startsWith(`${item.to}/`)

            const Icon = item.icon

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}