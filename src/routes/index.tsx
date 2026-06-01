import ProductGridSection from '#/components/custom/ProductGridSection';
import ProductSliderSection from '#/components/custom/ProductSliderSection';
import ImageCarousel from '#/components/HomePageCarousel'
import { getHomepageGroups } from '#/server/homepage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')(
  {
    loader: async () => {
      const groups = await getHomepageGroups();

      return { groups };
    },
    component: App
  }
)

function App() {

  const { groups } = Route.useLoaderData();

  return (
    <main className="">
      <ImageCarousel />
      <section className="mt-8 sm:mt-[-23%] z-20 relative overflow-hidden p-4">
        {groups.map((group) => (
          <GroupRenderer key={group.id} group={group} />
        ))}
      </section>
    </main>
  )
}

function GroupRenderer({ group }: { group: any }) {
  if (!group.sections?.length) return null;

  /*
  |--------------------------------------------------------------------------
  | FULL WIDTH GROUP
  |--------------------------------------------------------------------------
  */

  if (group.isFullWidth) {
    return (
      <div className="w-full">
        {group.sections.map((section: any) => (
          <SectionRenderer
            key={section.id}
            section={section}
            mode="full"
          />
        ))}
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | GRID GROUP
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        mb-8
        flex gap-4 overflow-x-auto px-4
        md:grid md:grid-cols-2 md:gap-6 md:px-0
        lg:grid-cols-4 md:items-stretch
      "
    >
      {group.sections.map((section: any) => (
        <div
          key={section.id}
          className="min-w-[80%] md:min-w-0"
        >
          <SectionRenderer
            section={section}
            mode="grid"
          />
        </div>
      ))}
    </div>
  );
}

function SectionRenderer({
  section,
  mode,
}: {
  section: any;
  mode: "grid" | "full";
}) {
  switch (section.layout) {
    case "horizontal_scroll":
      return <ProductSliderSection section={section} />;

    case "carousel":
      return <ProductSliderSection section={section} />;

    case "grid_2x2":
    case "grid_3x1":
    case "single_grid":
      return <ProductGridSection section={section} mode={mode} />;

    default:
      return null;
  }
}
