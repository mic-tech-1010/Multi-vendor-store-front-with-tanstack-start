import { Home, MapPin, Package, Shield, User } from "lucide-react"

export type AccountNavItem = {
  label: string
  to: string
  icon: React.ComponentType<{ className?: string }>
}

export const accountNavItems: AccountNavItem[] = [
  {
    label: "Overview",
    to: "/account",
    icon: Home,
  },
  {
    label: "Orders",
    to: "/account/orders",
    icon: Package,
  },
  {
    label: "Addresses",
    to: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Profile",
    to: "/account/profile",
    icon: User,
  },
  {
    label: "Security",
    to: "/account/security",
    icon: Shield,
  },
]