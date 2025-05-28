import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useLikedMovies } from "@/queries/useLikedMovies";
import { LikedMoviesPage } from "@/pages";
import { ReactNode } from "react";

// Mock dependent components if needed
vi.mock("@/components/app/MovieCard", () => ({
  MovieCard: ({ title }: { title: string }) => <div>{title}</div>,
}));
vi.mock("@/components/app/MovieCardSkeleton", () => ({
  MovieCardSkeleton: () => <div data-testid="skeleton">Skeleton</div>,
}));
vi.mock("@/components/app/PageContainer", () => ({
  PageContainer: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the data-fetching hook
vi.mock("@/queries/useLikedMovies");

describe("LikedMoviesPage", () => {
  it("renders loading state", () => {
    (useLikedMovies as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<LikedMoviesPage />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(12);
  });

  it("renders error state", () => {
    (useLikedMovies as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<LikedMoviesPage />);
    expect(
      screen.getByText(/failed to load liked movies/i)
    ).toBeInTheDocument();
  });

  it("renders message when no liked movies", () => {
    (useLikedMovies as any).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<LikedMoviesPage />);
    expect(
      screen.getByText(/you haven't liked any movies/i)
    ).toBeInTheDocument();
  });

  it("renders liked movies", () => {
    (useLikedMovies as any).mockReturnValue({
      data: [
        { id: 1, title: "Movie A", poster_path: "/a.jpg", vote_average: 7.8 },
        { id: 2, title: "Movie B", poster_path: "/b.jpg", vote_average: 6.5 },
      ],
      isLoading: false,
      isError: false,
    });

    render(<LikedMoviesPage />);
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Movie B")).toBeInTheDocument();
  });
});
