import { PageContainer, ReviewCard, Section } from "@/components/app";

import {
  useWeeklyReleases,
  useGetPopular,
  useGetPopularReviews,
  useGetOnAirTVShows,
  usePopularTVShows,
} from "@/queries";

export function HomePage() {
  const { data: newReleases, isLoading: isNewReleasesLoading } =
    useWeeklyReleases();
  const { data: popular, isLoading: isPopularLoading } = useGetPopular();
  const { data: onAirShows, isLoading: isOnAirLoading } = useGetOnAirTVShows();
  const { data: popularShows, isLoading: isOnPopularLoading } =
    usePopularTVShows();
  const { data: popularReviews } = useGetPopularReviews();

  return (
    <PageContainer>
      <h1 className="text-8xl font-bold text-white my-40">
        Hey, ragool 👋 What you have been watching ?
      </h1>
      <div className="w-full h-fit my-4">
        <Section
          title={"releasing this week"}
          toNav={"/new-releases"}
          movies={newReleases?.slice(0, 6) || []}
          isLoading={isNewReleasesLoading}
        />
      </div>
      <div className="w-full h-fit my-4">
        <Section
          title={"popular movies"}
          toNav={"/popular"}
          movies={popular?.slice(0, 6) || []}
          isLoading={isPopularLoading}
        />
      </div>
      <div className="w-full h-fit my-4">
        <Section
          title={"on-air shows"}
          toNav={"/on-air-shows"}
          movies={onAirShows?.slice(0, 6) || []}
          isLoading={isOnAirLoading}
        />
      </div>
      <div className="w-full h-fit my-4">
        <Section
          title={"popular shows"}
          toNav={"/popular-shows"}
          movies={popularShows?.slice(0, 6) || []}
          isLoading={isOnPopularLoading}
        />
      </div>
      <div className="w-full h-fit my-8">
        <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
          <p className="text-gray-secondary text-xs mb-2">
            {"Popular reviews".toUpperCase()}
          </p>
        </div>
        {popularReviews?.map((r) => {
          return (
            <ReviewCard
              key={r.movie.id}
              reviews={r.reviews}
              movieName={r.movie.title}
            />
          );
        })}
      </div>
    </PageContainer>
  );
}
