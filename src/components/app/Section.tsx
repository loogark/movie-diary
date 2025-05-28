import type { TMDBMovie } from "@/types";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

interface Props {
  title: string;
  toNav: string;
  movies: TMDBMovie[];
  isLoading: boolean;
}

export function Section({ title, toNav, movies, isLoading }: Props) {
  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
        <p className="text-gray-secondary text-xs mb-2">
          {title.toUpperCase()}
        </p>
        <Link
          to={{ pathname: toNav }}
          className="text-xs text-gray-secondary hover:text-hover-primary tracking-wide mb-2 cursor-pointer"
        >
          {"More".toUpperCase()}
        </Link>
      </div>
      <div className="w-full flex flex-row justify-start gap-2 items-center tracking-wide overflow-hidden my-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton
                key={`skeleton-${i}`}
                width="w-[135px]"
                aspectRatio="aspect-[2/3]"
              />
            ))
          : movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                width="w-[135px]"
              />
            ))}
      </div>
    </div>
  );
}
