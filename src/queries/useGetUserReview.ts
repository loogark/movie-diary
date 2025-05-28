import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useGetUserReview(movieId: number) {
  return useQuery({
    queryKey: ["userReview", movieId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      return data || null;
    },
  });
}
