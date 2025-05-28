import { render, screen } from "@testing-library/react";
import { Section } from "@/components/app/Section";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock dependencies
vi.mock("@/components/app/MovieCard", () => ({
  MovieCard: ({ title }: { title: string }) => (
    <div data-testid="movie-card">{title}</div>
  ),
}));

vi.mock("@/components/app/MovieCardSkeleton", () => ({
  MovieCardSkeleton: () => <div data-testid="skeleton" />,
}));

// Mock data (fill all TMDBMovie required fields)
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/inception.jpg",
    vote_average: 8.8,
    overview: "",
    backdrop_path: "",
    release_date: "2023-01-01",
    genre_ids: [],
    popularity: 0,
    video: false,
    adult: false,
    original_language: "en",
    vote_count: 9,
  },
];

describe("Section", () => {
  const renderWithRouter = (ui: React.ReactNode) =>
    render(<BrowserRouter>{ui}</BrowserRouter>);

  it("renders title and more link", () => {
    renderWithRouter(
      <Section
        title="Trending"
        toNav="/trending"
        movies={[]}
        isLoading={false}
      />
    );
    expect(screen.getByText("TRENDING")).toBeInTheDocument();
    expect(screen.getByText("MORE")).toHaveAttribute("href", "/trending");
  });

  it("shows loading skeletons when loading", () => {
    renderWithRouter(
      <Section
        title="Trending"
        toNav="/trending"
        movies={[]}
        isLoading={true}
      />
    );
    expect(screen.getAllByTestId("skeleton")).toHaveLength(6);
  });

  it("renders MovieCard for each movie", () => {
    renderWithRouter(
      <Section
        title="Trending"
        toNav="/trending"
        movies={mockMovies}
        isLoading={false}
      />
    );
    expect(screen.getAllByTestId("movie-card")).toHaveLength(1);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });
});
