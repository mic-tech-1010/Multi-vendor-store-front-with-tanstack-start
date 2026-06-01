import CategoryCard from "./CategoryCard";
import ProductCard from "./ProductCard";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ProductGridSection({
    section,
}: {
    section: any;
    mode: "grid" | "full";
}) {
    const gridClasses = getGridClasses(section.layout);

    return (
        <Card
            className="bg-white h-full grid rounded-none py-3 max-h-max">
            <CardHeader>
                <CardTitle>
                    <h2 className=" text-[clamp(1.1rem,0.79rem+1.103vw,1.5rem)] leading-[1.2] text-[#09090b]">
                        {section.title}
                    </h2>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 grid">
                <ul className={gridClasses}>
                    {section.items.map((item: any) => (
                        <li key={item.id} className="h-full">
                            <GridItem item={item} layout={section.layout} />
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                {section.ctaText}
            </CardFooter>
        </Card >
    );
}

function GridItem({ item, layout }: { item: any; layout: string }) {
    if (item.product) {
        return <ProductCard product={item.product} layout={layout} />;
    }

    if (item.category) {
        return <CategoryCard category={item.category} />;
    }

    //   if (item.imageUrl) {
    //     return <ImageCard src={item.imageUrl} />;
    //   }

    return null;
}

function getGridClasses(layout: string) {
    switch (layout) {
        case "grid_2x2":
            return "grid grid-cols-2 gap-2 auto-rows-fr";

        case "grid_3x1":
            return "grid grid-cols-3 gap-2 [&>li:first-child]:col-span-3";

        case "single_grid":
            return "grid grid-cols-1 gap-3";

        default:
            return "";
    }
}