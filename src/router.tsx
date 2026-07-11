import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { routeTree } from "./routeTree.gen"
import { NotFoundComponent } from "./components/not-found"
import { queryClient } from "./lib/query-client"

export function getRouter() {

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
      defaultErrorComponent: ErrorComponent,
      defaultNotFoundComponent: NotFoundComponent,
      context: { queryClient },
    }),
    queryClient,
  )

  if (process.env.LOG_DEBUG) {
    router.subscribe("onBeforeLoad", console.log)
    router.subscribe("onBeforeNavigate", console.log)
    router.subscribe("onBeforeRouteMount", console.log)
    router.subscribe("onLoad", console.log)
    router.subscribe("onRendered", console.log)
    router.subscribe("onResolved", console.log)
  }

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}