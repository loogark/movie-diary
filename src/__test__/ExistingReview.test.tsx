import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExistingReview } from "@/components/app/ExistingReview";
import { vi } from "vitest";

describe("ExistingReview", () => {
  const content = "This movie was amazing.\nI’d watch it again!";
  const rating = 4.5;

  it("renders the content and rating", () => {
    render(
      <ExistingReview
        content={content}
        rating={rating}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText(/your review/i)).toBeInTheDocument();
    expect(screen.getByText(/this movie was amazing/i)).toBeInTheDocument();
    expect(screen.getByText(/I’d watch it again/i)).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    render(
      <ExistingReview
        content={content}
        rating={rating}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    const editButton = screen.getAllByRole("button")[0]; // first is edit
    await userEvent.click(editButton);

    expect(onEdit).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(
      <ExistingReview
        content={content}
        rating={rating}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getAllByRole("button")[1]; // second is delete
    await userEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalled();
  });
});
