
export default function ProductDescription({
  description,
}: {
  description: string;
}) {

  return (
    <div className="mt-8">

      <h2 className="text-xl font-semibold mb-4">
        About the Item
      </h2>

      <div
        className="ck-content-output"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />

    </div>
  );
}