// src/__test__/MoviePage.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MoviePage } from "@/pages";
import { useGetMovie } from "@/queries/useGetMovie";
import { TMDBMovieDetails } from "@/types";

vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

vi.mock("@/queries/useGetMovie", () => ({
  useGetMovie: vi.fn(),
}));

vi.mock("@/components/app/MovieBackdrop", () => ({
  MovieBackdrop: ({ title }: { title: string }) => <div>Backdrop: {title}</div>,
}));

vi.mock("@/components/app/MovieSynopsis", () => ({
  MovieSynopsis: ({ movie }: { movie: TMDBMovieDetails }) => (
    <div>Synopsis: {movie.title}</div>
  ),
}));

vi.mock("@/components/app/WriteReview", () => ({
  WriteReview: ({ movieId }: { movieId: number }) => (
    <div>Review for ID {movieId}</div>
  ),
}));

vi.mock("@/components/app/PageContainer", () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("MoviePage", () => {
  it("renders loading state", () => {
    (useGetMovie as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<MoviePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders movie data when loaded", () => {
    (useGetMovie as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        id: 1,
        title: "Inception",
        poster_path: "/poster.jpg",
        backdrop_path: "/backdrop.jpg",
        release_date: "2010-07-16",
        credits: { cast: [], crew: [] },
        tagline: "Your mind is the scene of the crime.",
        overview: "A thief who steals corporate secrets...",
        genres: [],
        runtime: 148,
        production_countries: [],
        spoken_languages: [],
        vote_average: 8.8,
      },
      isLoading: false,
    });

    render(<MoviePage />);
    expect(screen.getByText("Backdrop: Inception")).toBeInTheDocument();
    expect(screen.getByText("Synopsis: Inception")).toBeInTheDocument();
    expect(screen.getByText("Review for ID 1")).toBeInTheDocument();
  });
});
