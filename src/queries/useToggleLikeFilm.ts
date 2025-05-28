import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { TMDBMovie } from "@/types";

export function useToggleLikeFilm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      movieId,
      isLiked,
    }: {
      movieId: number;
      isLiked: boolean;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not logged in");

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("movie_id", movieId);
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from("likes")
          .insert([{ user_id: user.id, movie_id: movieId }])
          .select(); // safe insert
        if (error && error.code !== "23505") throw error;
      }
    },

    onMutate: async ({ movieId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["likes", movieId] });
      await queryClient.cancelQueries({ queryKey: ["likedMovies"] });

      const previousIsLiked = queryClient.getQueryData<boolean>([
        "likes",
        movieId,
      ]);
      const previousLikedMovies =
        queryClient.getQueryData<TMDBMovie[]>(["likedMovies"]) || [];

      queryClient.setQueryData(["likes", movieId], isLiked);

      if (isLiked) {
        // Optimistically remove from likedMovies
        const updated = previousLikedMovies.filter((m) => m.id !== movieId);
        queryClient.setQueryData(["likedMovies"], updated);
      } else {
        // Optimistically add to likedMovies
        try {
          const res = await api.get(`/movie/${movieId}`);
          const movie = res.data as TMDBMovie;
          const updated = [...previousLikedMovies, movie];
          queryClient.setQueryData(["likedMovies"], updated);
        } catch (err: unknown) {
          console.warn("Failed to preload movie into likedMovies");
        }
      }

      return { previousIsLiked, previousLikedMovies };
    },

    onError: (_err, { movieId }, context) => {
      if (context?.previousIsLiked !== undefined) {
        queryClient.setQueryData(["likes", movieId], context.previousIsLiked);
      }
      if (context?.previousLikedMovies) {
        queryClient.setQueryData(["likedMovies"], context.previousLikedMovies);
      }
    },

    onSettled: (_data, _error, { movieId }) => {
      queryClient.invalidateQueries({ queryKey: ["likes", movieId] });
      queryClient.invalidateQueries({ queryKey: ["likedMovies"] });
    },
  });
}
