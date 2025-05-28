// src/pages/LikedMoviesPage.tsx
import { useLikedMovies } from "@/queries/useLikedMovies";
import { MovieCard, MovieCardSkeleton, PageContainer } from "@/components/app";

export function LikedMoviesPage() {
  const { data, isLoading, isError } = useLikedMovies();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="w-full flex justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
          <p className="text-gray-secondary text-xs mb-2">LIKED MOVIES</p>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return <p className="text-white">Failed to load liked movies.</p>;
  }

  console.log(data, "data");

  return (
    <PageContainer>
      <div className="w-full flex justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
        <p className="text-gray-secondary text-xs mb-2">LIKED MOVIES</p>
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {data?.length ? (
          data?.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              poster={movie.poster_path}
              width="w-[135px]"
            />
          ))
        ) : (
          <div className="w-full mt-24 flex justify-center items-center">
            <p className="text-white font-extrabold">
              You haven't liked any movies 😢
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
