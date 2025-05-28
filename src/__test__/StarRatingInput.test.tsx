import { fireEvent, render, screen } from "@testing-library/react";
import { StarRatingInput } from "@/components/app";
import { vi } from "vitest";
import { useState } from "react";

describe("StarRatingInput – Unit Tests", () => {
  it("renders 5 clickable stars", () => {
    const setRating = vi.fn();
    const { container } = render(
      <StarRatingInput rating={0} setRating={setRating} />
    );
    const starDivs = container.querySelectorAll(".cursor-pointer");
    expect(starDivs.length).toBe(5);
  });

  it("calls setRating with full star value", async () => {
    const setRating = vi.fn();
    const { container } = render(
      <StarRatingInput rating={0} setRating={setRating} />
    );
    const starDivs = container.querySelectorAll(".cursor-pointer");

    fireEvent.click(starDivs[2], { clientX: 50 }); // Click full star 3
    expect(setRating).toHaveBeenCalledWith(3);
  });

  it("calls setRating with half star value", async () => {
    const setRating = vi.fn();
    const { container } = render(
      <StarRatingInput rating={0} setRating={setRating} />
    );
    const starDivs = container.querySelectorAll(".cursor-pointer");

    fireEvent.click(starDivs[3], { clientX: 1 }); // Click left half of star 4
    expect(setRating).toHaveBeenCalledWith(4);
  });
});

describe("StarRatingInput – Integration Tests", () => {
  function Wrapper() {
    const [rating, setRating] = useState(0);
    return (
      <>
        <StarRatingInput rating={rating} setRating={setRating} />
        <p data-testid="rating-output">{rating}</p>{" "}
      </>
    );
  }

  it("updates rating on full star click", async () => {
    const { container } = render(<Wrapper />);
    const starDivs = container.querySelectorAll(".cursor-pointer");

    fireEvent.click(starDivs[4], { clientX: 50 });
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("updates rating on half star click", async () => {
    const { container } = render(<Wrapper />);
    const starDivs = container.querySelectorAll(".cursor-pointer");

    fireEvent.click(starDivs[3], { clientX: 1 });
    expect(screen.getByTestId("rating-output")).toHaveTextContent("4");
  });
});
