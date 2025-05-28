import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { SectionPage } from "@/pages";

vi.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "popular" }),
}));

vi.mock("@/constants/sectionConfig", () => ({
  sectionConfig: {
    popular: {
      title: "Popular",
      fetcher: vi.fn(),
    },
  },
}));

vi.mock("@tanstack/react-query", async () => {
  const actual: any = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useInfiniteQuery: vi.fn(),
  };
});

vi.mock("@/components/app/PageContainer", () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/app/MovieCard", () => ({
  MovieCard: ({ title }: { title: string }) => <div>MovieCard: {title}</div>,
}));

vi.mock("@/components/app/MovieCardSkeleton", () => ({
  MovieCardSkeleton: () => <div>Skeleton</div>,
}));

import { useInfiniteQuery } from "@tanstack/react-query";

describe("SectionPage", () => {
  it("renders loading state", () => {
    (useInfiniteQuery as any).mockReturnValue({
      data: undefined,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: "pending",
    });

    render(<SectionPage />);
    expect(screen.getByText("POPULAR")).toBeInTheDocument();
    expect(screen.getAllByText("Skeleton")).toHaveLength(12);
  });

  it("renders loaded movies", () => {
    (useInfiniteQuery as any).mockReturnValue({
      data: {
        pages: [
          {
            page: 1,
            total_pages: 1,
            results: [
              { id: 1, title: "Inception", poster_path: "/inception.jpg" },
              {
                id: 2,
                title: "Interstellar",
                poster_path: "/interstellar.jpg",
              },
            ],
          },
        ],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "success",
    });

    render(<SectionPage />);
    expect(screen.getByText("MovieCard: Inception")).toBeInTheDocument();
    expect(screen.getByText("MovieCard: Interstellar")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useInfiniteQuery as any).mockReturnValue({
      data: undefined,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "error",
    });

    render(<SectionPage />);
    expect(screen.getByText("Failed to load.")).toBeInTheDocument();
  });
});
