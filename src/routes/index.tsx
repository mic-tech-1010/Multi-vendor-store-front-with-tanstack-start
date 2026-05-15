import ImageCarousel from '#/components/HomePageCarousel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="">
      <ImageCarousel />
    </main>
  )
}
