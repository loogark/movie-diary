import type { MovieWithCredits } from "@/types";
import { MovieCast } from "./MovieCast";

interface Props {
  movie: MovieWithCredits;
}

export function MovieSynopsis({ movie }: Props) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const director =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ??
    null;

  return (
    <div className="flex flex-col md:w-1/2 md:pl-10">
      {/* Title + Year + Director */}
      <div className="flex flex-wrap items-baseline text-start gap-2">
        <h1 className="text-p-white  text-4xl/[2.25rem] font-bold">
          {movie.title}
        </h1>

        <div className="flex gap-1 items-start text-start text-sm">
          {year && <p className="text-p-white cursor-default">{year}</p>}
          {director && (
            <>
              <p className="text-gray-secondary ml-2">Directed by</p>
              <p className="text-p-white cursor-default underline">
                {director}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Tagline + Overview + Cast */}
      <div className="flex flex-col mt-4">
        {movie.tagline && (
          <p className="text-gray-secondary py-3 font-['Graphik'] text-md text-start uppercase">
            {movie.tagline}
          </p>
        )}
        {movie.overview && (
          <p className="text-gray-secondary mb-3 max-w-sm text-md text-start tracking-wide">
            {movie.overview}
          </p>
        )}
        {movie.credits?.cast?.length > 0 && (
          <MovieCast cast={movie.credits.cast} />
        )}
      </div>
    </div>
  );
}
