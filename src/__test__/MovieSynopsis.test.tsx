import { render, screen } from "@testing-library/react";
import { MovieSynopsis } from "@/components/app/MovieSynopsis";
import { vi } from "vitest";
import { MovieWithCredits } from "@/types";

// 🔧 Mock MovieCast to isolate logic
vi.mock("@/components/app/MovieCast", () => ({
  MovieCast: () => <div data-testid="mock-cast" />,
}));

describe("MovieSynopsis", () => {
  const baseMovie = {
    title: "Inception",
    release_date: "2010-07-16",
    tagline: "Your mind is the scene of the crime.",
    overview: "A thief who steals corporate secrets through dream-sharing...",
    credits: {
      crew: [{ id: 1, job: "Director", name: "Christopher Nolan" }],
      cast: [{ id: 1, name: "Leonardo DiCaprio" }],
    },
  } as unknown as MovieWithCredits;

  it("renders the title", () => {
    render(<MovieSynopsis movie={baseMovie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the release year from release_date", () => {
    render(<MovieSynopsis movie={baseMovie} />);
    expect(screen.getByText("2010")).toBeInTheDocument();
  });

  it("renders the director name when present", () => {
    render(<MovieSynopsis movie={baseMovie} />);
    expect(screen.getByText("Directed by")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  });

  it("renders tagline and overview if present", () => {
    render(<MovieSynopsis movie={baseMovie} />);
    expect(
      screen.getByText(/your mind is the scene of the crime/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a thief who steals corporate secrets/i)
    ).toBeInTheDocument();
  });

  it("renders MovieCast if cast is present", () => {
    render(<MovieSynopsis movie={baseMovie} />);
    expect(screen.getByTestId("mock-cast")).toBeInTheDocument();
  });

  it("does not crash when crew is empty or missing", () => {
    const movie = {
      ...baseMovie,
      credits: { ...baseMovie.credits, crew: [] },
    };
    render(<MovieSynopsis movie={movie} />);
    expect(screen.queryByText("Directed by")).not.toBeInTheDocument();
  });

  it("does not render cast if credits.cast is empty", () => {
    const movie = {
      ...baseMovie,
      credits: { crew: [], cast: [] },
    } as MovieWithCredits;

    render(<MovieSynopsis movie={movie} />);
    expect(screen.queryByTestId("mock-cast")).not.toBeInTheDocument();
  });
});
