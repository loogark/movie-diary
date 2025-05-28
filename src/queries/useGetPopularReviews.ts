import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "@/lib/api";
import type { TMDBMovie, TMDBReview } from "@/types";

type MovieWithReviews = {
  movie: TMDBMovie;
  reviews: TMDBReview[];
};

export const useGetPopularReviews = (): UseQueryResult<
  MovieWithReviews[],
  Error
> => {
  return useQuery({
    queryKey: ["popularReviews"],
    queryFn: async () => {
      const movies = await api.get("/movie/popular");
      const reviewsPromises = movies.data.results
        .slice(0, 5)
        .map((movie: TMDBMovie) =>
          api.get(`/movie/${movie.id}/reviews`).then((res) => ({
            movie,
            reviews: res.data.results as TMDBReview[],
          }))
        );
      return Promise.all(reviewsPromises);
    },
  });
};
