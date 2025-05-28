import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieCast } from "@/components/app/MovieCast";

const generateCast = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Actor ${i + 1}`,
    character: `Actor ${i + 1}`,
    profile_path: "/profile.png",
  }));

describe("MovieCast", () => {
  it("renders message when cast is empty", () => {
    render(<MovieCast cast={[]} />);
    expect(
      screen.getByText(/the cast for this movie remains a mystery/i)
    ).toBeInTheDocument();
  });

  it("renders up to 15 cast members by default", () => {
    const cast = generateCast(20);
    render(<MovieCast cast={cast} />);

    for (let i = 1; i <= 15; i++) {
      expect(screen.getByText(`Actor ${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText("Actor 16")).not.toBeInTheDocument();
  });

  it("shows all cast members when expanded", async () => {
    const cast = generateCast(20);
    render(<MovieCast cast={cast} />);

    const toggleButton = screen.getByText(/show more/i);
    await userEvent.click(toggleButton);

    expect(screen.getByText("Actor 20")).toBeInTheDocument();
    expect(screen.getByText(/show less/i)).toBeInTheDocument();
  });

  it('collapses cast back to 15 when clicking "Show Less"', async () => {
    const cast = generateCast(20);
    render(<MovieCast cast={cast} />);

    const button = screen.getByText(/show more/i);
    await userEvent.click(button);
    await userEvent.click(screen.getByText(/show less/i));

    expect(screen.queryByText("Actor 20")).not.toBeInTheDocument();
    expect(screen.getByText(/show more/i)).toBeInTheDocument();
  });

  it("does not show toggle if cast is 15 or fewer", () => {
    const cast = generateCast(10);
    render(<MovieCast cast={cast} />);
    expect(screen.queryByText(/show more/i)).not.toBeInTheDocument();
  });
});
