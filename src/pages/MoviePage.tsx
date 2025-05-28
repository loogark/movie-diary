import {
  MovieBackdrop,
  MovieSynopsis,
  PageContainer,
  WriteReview,
} from "@/components/app";

import { useGetMovie } from "@/queries/useGetMovie";
import { useParams } from "react-router-dom";

export function MoviePage() {
  const { id } = useParams();
  const { data: movie, isLoading } = useGetMovie(id!);
  console.log(movie, "movie");
  if (isLoading || !movie) return <div className="text-center">Loading...</div>;
  return (
    <div className="w-full">
      <MovieBackdrop backdropUrl={movie?.backdrop_path} title={movie?.title} />

      <PageContainer>
        <div className="flex flex-col px-4 md:mx-auto md:my-0 md:w-[950px]">
          <div className="mt-[-20%] flex flex-col gap-3 md:mt-[-10%] md:flex-row">
            <div className="relative max-w-[300px] w-full aspect-[2/3] md:h-auto max-h-[500px] bg-zinc-900 rounded overflow-hidden shadow-md">
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <MovieSynopsis movie={movie} />
          </div>
        </div>
        <WriteReview movieId={movie?.id} />
      </PageContainer>
    </div>
  );
}
