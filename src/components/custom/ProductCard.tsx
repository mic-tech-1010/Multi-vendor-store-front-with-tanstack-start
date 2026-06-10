import { Link } from "@tanstack/react-router";

export default function ProductCard({
  product,
  layout,
}: {
  product: any;
  layout: string;
}) {
  return (
    <Link to="/products/$slug"
      params={{ slug: product.slug }}
      className="h-full flex flex-col"
    >
      <img
        src={product.images?.[0]?.imageUrl}
        className="w-full aspect-square object-cover"
      />

      {layout !== "single_grid" && (
        <p className="text-sm truncate mt-1 text-[#09090b]">
          {product.name}
        </p>
      )}

    </Link>
  );
}