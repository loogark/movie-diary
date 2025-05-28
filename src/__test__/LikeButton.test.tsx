import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LikeButton } from "@/components/app/LikeButton";
import { vi } from "vitest";

// ✅ Put mocks inside the vi.mock factory and attach to globalThis
vi.mock("@/queries/useIsLiked", () => {
  const useIsLiked = vi.fn();
  Object.assign(globalThis, { useIsLikedMock: useIsLiked });
  return { useIsLiked };
});

vi.mock("@/queries/useToggleLikeFilm", () => {
  const useToggleLikeFilm = vi.fn();
  Object.assign(globalThis, { useToggleLikeFilmMock: useToggleLikeFilm });
  return { useToggleLikeFilm };
});

describe("LikeButton", () => {
  const movieId = 42;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("disables button while loading", () => {
    globalThis.useIsLikedMock.mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    globalThis.useToggleLikeFilmMock.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    render(<LikeButton movieId={movieId} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("toggles from unliked to liked on click", async () => {
    const toggleFn = vi.fn();
    globalThis.useIsLikedMock.mockReturnValue({
      data: false,
      isLoading: false,
    });
    globalThis.useToggleLikeFilmMock.mockReturnValue({
      mutate: toggleFn,
      isPending: false,
    });

    render(<LikeButton movieId={movieId} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(toggleFn).toHaveBeenCalledWith({ movieId, isLiked: false });
  });

  it("toggles from liked to unliked on click", async () => {
    const toggleFn = vi.fn();
    globalThis.useIsLikedMock.mockReturnValue({ data: true, isLoading: false });
    globalThis.useToggleLikeFilmMock.mockReturnValue({
      mutate: toggleFn,
      isPending: false,
    });

    render(<LikeButton movieId={movieId} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(toggleFn).toHaveBeenCalledWith({ movieId, isLiked: true });
  });

  it("disables button while mutation is pending", () => {
    globalThis.useIsLikedMock.mockReturnValue({ data: true, isLoading: false });
    globalThis.useToggleLikeFilmMock.mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<LikeButton movieId={movieId} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
