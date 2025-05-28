import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useDeleteReview(reviewId?: string) {
  return useMutation({
    mutationFn: async () => {
      if (!reviewId) throw new Error("Missing review ID");

      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;
    },
  });
}
