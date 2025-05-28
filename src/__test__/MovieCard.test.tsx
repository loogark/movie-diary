import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { ComponentProps } from "react";
import { MovieCard } from "@/components/app/MovieCard";

type MovieCardProps = ComponentProps<typeof MovieCard>;

const baseProps: MovieCardProps = {
  id: 1,
  title: "Inception",
  poster: "/inception.jpg",
  width: "w-32",
};

vi.mock("@/queries/useAuth", () => ({
  useAuth: () => ({ user: { id: "123" } }),
}));

vi.mock("@/components/app/LikeButton", () => ({
  LikeButton: () => <div data-testid="like-button" />,
}));

vi.mock("@/components/app/StarRating", () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">Rating: {rating}</div>
  ),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MovieCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders image with correct src and alt", () => {
    render(<MovieCard {...baseProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/inception.jpg"
    );
    expect(img).toHaveAttribute("alt", "Inception");
  });

  it("navigates to movie page on card click", async () => {
    render(<MovieCard {...baseProps} />);
    const img = screen.getByRole("img");
    const clickableCard = img.closest("div"); // outer clickable div
    await userEvent.click(clickableCard!);
    expect(mockNavigate).toHaveBeenCalledWith("/movie/1");
  });

  it("shows star rating if provided", () => {
    render(<MovieCard {...baseProps} rating={4.5} />);
    expect(screen.getByTestId("star-rating")).toHaveTextContent("4.5");
  });

  it("renders LikeButton when user exists and hideLike is false", () => {
    render(<MovieCard {...baseProps} />);
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
  });

  it("does not render LikeButton when hideLike is true", () => {
    render(<MovieCard {...baseProps} hideLike />);
    expect(screen.queryByTestId("like-button")).not.toBeInTheDocument();
  });
});
