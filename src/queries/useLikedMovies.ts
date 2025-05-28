// src/queries/useLikedMovies.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { TMDBMovie } from "@/types";
import api from "@/lib/api";

export const useLikedMovies = () => {
  return useQuery({
    queryKey: ["likedMovies"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      const { data: likes, error } = await supabase
        .from("likes")
        .select("movie_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase error in useLikedMovies:", error);
        throw error;
      }

      if (!likes || likes.length === 0) return [];

      const results = await Promise.allSettled(
        likes.map((like) =>
          api
            .get(`/movie/${like.movie_id}`)
            .then((res) => res.data as TMDBMovie)
        )
      );

      // Filter out failed requests
      return results
        .filter(
          (result): result is PromiseFulfilledResult<TMDBMovie> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value);
    },
    staleTime: 1000 * 60 * 2, // optional: cache for 2 mins
  });
};
