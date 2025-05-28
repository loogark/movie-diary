import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getWeekRange = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const format = (d: Date) => d.toISOString().split("T")[0];
  return { from: format(weekAgo), to: format(today) };
};

export const fetchWeeklyReleases = async () => {
  const { from, to } = getWeekRange();
  const res = await api.get("/discover/movie", {
    params: {
      "primary_release_date.gte": from,
      "primary_release_date.lte": to,
      sort_by: "popularity.desc",
    },
  });
  return res.data.results;
};

export const useWeeklyReleases = () => {
  return useQuery({
    queryKey: ["weeklyReleases"],
    queryFn: fetchWeeklyReleases,
  });
};
