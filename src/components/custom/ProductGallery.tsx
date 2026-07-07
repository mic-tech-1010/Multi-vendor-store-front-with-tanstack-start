import Carousel from '#/components/custom/ProductDetailCarousel';

export default function ProductGallery({
  images,
}: {
  images: any[];
}) {

  return (
    <Carousel
      images={images}
      thumbNails={images}
    />
  );
}