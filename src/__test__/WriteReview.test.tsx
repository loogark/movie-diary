import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WriteReview } from "@/components/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

interface StarRatingInputProps {
  rating: number;
  setRating: (value: number) => void;
}

vi.mock("@/queries", () => {
  return {
    useGetUserReview: () => ({ data: undefined, isLoading: false }),
    useWriteReview: () => ({
      isPending: false,
      mutate: vi.fn((_, { onSuccess }) => onSuccess()),
    }),
    useUpdateReview: () => ({
      isPending: false,
      mutate: vi.fn((_, { onSuccess }) => onSuccess()),
    }),
    useDeleteReview: () => ({
      mutate: vi.fn((_args, { onSuccess }) => onSuccess()),
    }),
  };
});

vi.mock("@/components/app/StarRatingInput", () => ({
  StarRatingInput: ({ rating, setRating }: StarRatingInputProps) => (
    <button onClick={() => setRating(4)}>MockRating-{rating}</button>
  ),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("WriteReview", () => {
  it("renders review form when no existing review", () => {
    renderWithClient(<WriteReview movieId={1} />);
    expect(
      screen.getByPlaceholderText(/what did you think/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/add review/i)).toBeInTheDocument();
  });

  it("shows validation error if content is empty", async () => {
    renderWithClient(<WriteReview movieId={1} />);
    fireEvent.click(screen.getByText(/mockrating/i));
    fireEvent.click(screen.getByText(/add review/i));
    await waitFor(() => {
      expect(screen.getByText(/review cannot be empty/i)).toBeInTheDocument();
    });
  });

  it("shows validation error if rating is missing", async () => {
    renderWithClient(<WriteReview movieId={1} />);
    fireEvent.change(screen.getByPlaceholderText(/what did you think/i), {
      target: { value: "Great movie!" },
    });
    fireEvent.click(screen.getByText(/add review/i));
    await waitFor(() => {
      expect(screen.getByText(/please select a rating/i)).toBeInTheDocument();
    });
  });

  it("submits review successfully", async () => {
    renderWithClient(<WriteReview movieId={1} />);
    fireEvent.change(screen.getByPlaceholderText(/what did you think/i), {
      target: { value: "Nice movie!" },
    });
    fireEvent.click(screen.getByText(/mockrating/i));
    fireEvent.click(screen.getByText(/add review/i));
    await waitFor(() => {
      expect(
        screen.queryByText(/review cannot be empty/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/please select a rating/i)
      ).not.toBeInTheDocument();
    });
  });
});
