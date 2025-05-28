import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUpdateReview(reviewId?: string) {
  return useMutation({
    mutationFn: async ({
      content,
      rating,
    }: {
      content: string;
      rating: number;
    }) => {
      if (!reviewId) throw new Error("Missing review ID");

      const { error } = await supabase
        .from("reviews")
        .update({ content, rating })
        .eq("id", reviewId);

      if (error) throw error;
    },
  });
}
