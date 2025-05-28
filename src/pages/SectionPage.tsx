import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  sectionConfig,
  type SectionSlug,
  type SectionResultMap,
} from "@/constants/sectionConfig";
import { useEffect, useRef } from "react";
import { MovieCard, MovieCardSkeleton, PageContainer } from "@/components/app";

export function SectionPage() {
  const { slug } = useParams<{ slug: SectionSlug }>();

  const section = sectionConfig[slug!];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["infinite", slug],
      queryFn: async ({ pageParam = 1 }) => {
        return section.fetcher({ pageParam });
      },
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (status === "pending") {
    return (
      <PageContainer>
        <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
          <p className="text-gray-secondary text-xs mb-2">
            {section.title.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (status === "error" || !slug)
    return <p className="text-white">Failed to load.</p>;

  type ResultType = SectionResultMap[typeof slug];

  return (
    <PageContainer>
      <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
        <p className="text-gray-secondary text-xs mb-2">
          {section.title.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 flex-wrap w-full mx-auto">
        {data?.pages.flatMap((page) =>
          page.results.map((item: ResultType) => (
            <MovieCard
              key={item.id}
              {...item}
              title={"title" in item ? item.title : item.name}
              poster={item.poster_path}
              width="w-[95px]"
              hideLike
            />
          ))
        )}
      </div>
      <div
        ref={loadMoreRef}
        className="h-10 mt-4 flex justify-center items-center"
      >
        {isFetchingNextPage && (
          <div className="flex flex-row gap-2 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={`load-more-${i}`} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
