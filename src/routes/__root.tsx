import { QueryClientProvider } from '@tanstack/react-query'
import {
  HeadContent,
  Scripts,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '#/components/Header'
import Footer from '#/components/Footer'
import { Toaster } from '#/components/ui/sonner'
import { queryClient } from '#/lib/query-client'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { authQueries } from '#/services/queries'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({

  beforeLoad: async ({ context }) => {

   const userSession = await context.queryClient.fetchQuery(authQueries.user())

    return { userSession }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Amazon clone app',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument() {

  const { userSession } = Route.useRouteContext()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>

      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        <QueryClientProvider client={queryClient}>
          <Header session={userSession}/>
          <Outlet />
          <Footer />
          <Toaster />

          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  )
}