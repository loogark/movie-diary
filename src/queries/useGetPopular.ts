// src/queries/movies/usePopularThisWeek.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const fetchPopularMovies = async () => {
  const res = await api.get("/movie/popular", {
    params: {
      page: 1,
    },
  });
  return res.data.results;
};

export const useGetPopular = () => {
  return useQuery({
    queryKey: ["popularThisWeek"],
    queryFn: fetchPopularMovies,
  });
};
