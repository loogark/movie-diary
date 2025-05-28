import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api"; // Your axios instance

export const fetchPopularTVShows = async () => {
  const res = await api.get("/tv/popular");
  return res.data.results;
};

export const usePopularTVShows = () => {
  return useQuery({
    queryKey: ["popularTVShows"],
    queryFn: fetchPopularTVShows,
  });
};
