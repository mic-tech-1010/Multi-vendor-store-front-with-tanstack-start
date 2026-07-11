import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AccountShell } from '@/components/account/AccountShell'

type AccountRouteContext = {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const Route = createFileRoute('/account')({
  beforeLoad: ({ context, location }) => {
    const user = context.userSession?.user

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    } satisfies AccountRouteContext
  },

  component: AccountLayoutRoute,
})

function AccountLayoutRoute() {
  const { user } = Route.useRouteContext()

  return (
    <AccountShell user={user}>
      <Outlet />
    </AccountShell>
  )
}