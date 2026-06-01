export default function CategoryCard({ category }: { category: any }) {
  return (
    <a href={`/category/${category.slug}`} className="h-full flex flex-col">
      <img
        src={category.bannerUrl}
        className="w-full aspect-square object-cover"
      />
      <p className="text-sm mt-1 text-[#09090b]">
        {category.name}
      </p>
    </a>
  );
}