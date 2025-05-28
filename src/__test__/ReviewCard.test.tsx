import { render, screen } from "@testing-library/react";
import { ReviewCard } from "@/components/app/ReviewCard";
import { vi } from "vitest";
import { TMDBReview } from "@/types";

// 🔧 Mock StarRating
vi.mock("@/components/app/StarRating", () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{rating}</div>
  ),
}));

vi.mock("@/components/app/StarRating", () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{rating}</div>
  ),
}));

describe("ReviewCard", () => {
  const mockReviews = [
    {
      id: "1",
      author: "Alice",
      content: "Great film, loved the pacing and visuals.",
      created_at: "2024-05-01T12:00:00Z",
      updated_at: "2024-05-01T12:00:00Z",
      url: "https://example.com/review/1",
      author_details: {
        name: "Alice",
        username: "alice123",
        avatar_path: null,
        rating: 8,
      },
    },
    {
      id: "2",
      author: "Bob",
      content: "Too slow for my taste.",
      created_at: "2024-05-02T12:00:00Z",
      updated_at: "2024-05-02T12:00:00Z",
      url: "https://example.com/review/2",
      author_details: {
        name: "Bob",
        username: "bob456",
        avatar_path: null,
        rating: 9,
      },
    },
  ] satisfies TMDBReview[];

  it("renders author and date", () => {
    render(<ReviewCard reviews={mockReviews} movieName="Inception" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getAllByText("Inception")).toHaveLength(2);
    expect(screen.getByText("5/1/2024")).toBeInTheDocument();
    expect(screen.getByText("5/2/2024")).toBeInTheDocument();
  });

  it("renders StarRating with correct values", () => {
    render(<ReviewCard reviews={mockReviews} movieName="Inception" />);
    const ratings = screen.getAllByTestId("star-rating");
    expect(ratings[0]).toHaveTextContent("8");
    expect(ratings[1]).toHaveTextContent("9");
  });

  it("renders review content", () => {
    render(<ReviewCard reviews={mockReviews} movieName="Inception" />);
    expect(screen.getByText(/great film/i)).toBeInTheDocument();
    expect(screen.getByText(/too slow/i)).toBeInTheDocument();
  });

  it('renders both "Read more" links with correct hrefs', () => {
    render(<ReviewCard reviews={mockReviews} movieName="Inception" />);
    const links = screen.getAllByText(/read more/i);

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://example.com/review/1");
    expect(links[1]).toHaveAttribute("href", "https://example.com/review/2");
  });
});
