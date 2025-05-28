// src/constants/sectionConfig.ts
import api from "@/lib/api";
import type { TMDBMovie, TMDBShow } from "@/types";

type SectionDefinition<T> = {
  title: string;
  fetcher: (args: { pageParam: number }) => Promise<{
    results: T[];
    page: number;
    total_pages: number;
  }>;
};

export type SectionResultMap = {
  popular: TMDBMovie;
  "new-releases": TMDBMovie;
  "popular-shows": TMDBShow;
  "on-air-shows": TMDBShow;
};

export const sectionConfig = {
  popular: {
    title: "Popular Movies",
    fetcher: async ({ pageParam }) => {
      const res = await api.get("/movie/popular", {
        params: { page: pageParam },
      });
      return {
        results: res.data.results as TMDBMovie[],
        page: res.data.page,
        total_pages: res.data.total_pages,
      };
    },
  } satisfies SectionDefinition<TMDBMovie>,

  "popular-shows": {
    title: "Popular TV Shows",
    fetcher: async ({ pageParam }) => {
      const res = await api.get("/tv/popular", { params: { page: pageParam } });
      return {
        results: res.data.results as TMDBShow[],
        page: res.data.page,
        total_pages: res.data.total_pages,
      };
    },
  } satisfies SectionDefinition<TMDBShow>,

  "on-air-shows": {
    title: "On-Air TV Shows",
    fetcher: async ({ pageParam }) => {
      const res = await api.get("/tv/on_the_air", {
        params: { page: pageParam },
      });
      return {
        results: res.data.results as TMDBShow[],
        page: res.data.page,
        total_pages: res.data.total_pages,
      };
    },
  } satisfies SectionDefinition<TMDBShow>,

  "new-releases": {
    title: "New Releases This Week",
    fetcher: async ({ pageParam }) => {
      const res = await api.get("/discover/movie", {
        params: {
          sort_by: "popularity.desc",
          "primary_release_date.gte": getOneWeekAgo(),
          "primary_release_date.lte": getToday(),
          page: pageParam,
        },
      });
      return {
        results: res.data.results as TMDBMovie[],
        page: res.data.page,
        total_pages: res.data.total_pages,
      };
    },
  } satisfies SectionDefinition<TMDBMovie>,
} as const;

export type SectionSlug = keyof typeof sectionConfig;

// Helpers
function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getOneWeekAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().split("T")[0];
}
