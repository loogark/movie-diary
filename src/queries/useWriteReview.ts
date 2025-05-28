import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useWriteReview(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rating,
      content,
    }: {
      rating: number;
      content: string;
    }) => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) throw new Error("You must be logged in to post a review.");

      const { error } = await supabase.from("reviews").insert({
        movie_id: movieId,
        rating,
        content,
        user_id: userId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
    },
  });
}
