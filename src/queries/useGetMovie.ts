import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { MovieWithCredits } from "@/types";

export const useGetMovie = (id: string) => {
  return useQuery<MovieWithCredits>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const movieRes = await api.get(`/movie/${id}`);
      const creditsRes = await api.get(`/movie/${id}/credits`);

      return {
        ...movieRes.data,
        credits: creditsRes.data,
      };
    },
    enabled: !!id,
  });
};
