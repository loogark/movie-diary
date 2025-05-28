import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const fetchOnAirTVShows = async () => {
  const res = await api.get("/tv/on_the_air");
  return res.data.results;
};

export const useGetOnAirTVShows = () => {
  return useQuery({
    queryKey: ["onAirTVShows"],
    queryFn: fetchOnAirTVShows,
  });
};
