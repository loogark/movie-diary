import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi, expect } from "vitest";
import { HomePage } from "@/pages";

// ✅ Full TMDBMovie mock (matching your types)
const mockMovie = {
  id: 1,
  title: "Mock Movie",
  poster_path: "/mock-poster.jpg",
  vote_average: 8,
  overview: "A great movie",
  backdrop_path: "/mock-backdrop.jpg",
  release_date: "2024-01-01",
  genre_ids: [18],
  original_language: "en",
  original_title: "Mock Movie",
  popularity: 100,
  video: false,
  adult: false,
};

// ✅ TMDBReview mock
const mockReview = {
  id: "1",
  author: "Alice",
  content: "Loved the cinematography!",
  created_at: "2024-05-01",
  updated_at: "2024-05-01",
  url: "https://example.com/review/1",
  author_details: {
    rating: 9,
  },
};

// ✅ Mock all query hooks
vi.mock("@/queries", () => ({
  useWeeklyReleases: () => ({
    data: [mockMovie],
    isLoading: false,
  }),
  useGetPopular: () => ({
    data: [mockMovie],
    isLoading: false,
  }),
  useGetOnAirTVShows: () => ({
    data: [{ ...mockMovie, name: "Mock Show" }],
    isLoading: false,
  }),
  usePopularTVShows: () => ({
    data: [{ ...mockMovie, name: "Popular Show" }],
    isLoading: false,
  }),
  useGetPopularReviews: () => ({
    data: [
      {
        movie: mockMovie,
        reviews: [mockReview],
      },
    ],
    isLoading: false,
  }),
}));

describe("HomePage", () => {
  it("renders all sections and review cards", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Heading
    expect(
      screen.getByText(/hello, ragool 👋 what you have been watching/i)
    ).toBeInTheDocument();

    // Sections
    expect(screen.getByText(/releasing this week/i)).toBeInTheDocument();
    expect(screen.getByText(/popular movies/i)).toBeInTheDocument();
    expect(screen.getByText(/on-air shows/i)).toBeInTheDocument();
    expect(screen.getByText(/popular shows/i)).toBeInTheDocument();

    // Review content
    expect(screen.getByText(/loved the cinematography/i)).toBeInTheDocument();
    expect(screen.getByText(/read more/i)).toHaveAttribute(
      "href",
      "https://example.com/review/1"
    );
  });
});
