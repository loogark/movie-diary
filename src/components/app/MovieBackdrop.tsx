export function MovieBackdrop({
  backdropUrl,
  title,
}: {
  backdropUrl: string | null;
  title: string;
}) {
  if (!backdropUrl) return null;

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden movie-backdrop-before z-[0]">
      <img
        src={`https://image.tmdb.org/t/p/original${backdropUrl}`}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
