interface Props {
  rating: number;
}

export function StarRating({ rating }: Props) {
  const stars = Math.round(rating * 2) / 2 / 2;

  return (
    <div className="flex gap-0.5 mt-2 text-gray-secondary text-sm leading-none">
      {[1, 2, 3, 4, 5].map((star) => {
        if (stars >= star) return <span key={star}>★</span>;
        if (stars + 0.5 === star) return <span key={star}>½</span>;
        return null;
      })}
    </div>
  );
}
