import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useIsLiked = (movieId: number) => {
  return useQuery({
    queryKey: ["likes", movieId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("movie_id", movieId)
        .maybeSingle();

      if (error) {
        console.error("useIsLiked error", error);
        return false;
      }

      return !!data;
    },
    enabled: !!movieId,
  });
};
