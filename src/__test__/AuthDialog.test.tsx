import { AuthDialog } from "@/components/app/AuthModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("@/lib/supabase", () => {
  const mockSignInWithOtp = vi.fn();
  const mockSignInWithOAuth = vi.fn().mockResolvedValue({ error: null }); // ✅ FIX

  Object.assign(globalThis, {
    mockSignInWithOtp,
    mockSignInWithOAuth,
  });

  return {
    supabase: {
      auth: {
        signInWithOtp: mockSignInWithOtp,
        signInWithOAuth: mockSignInWithOAuth,
      },
    },
  };
});

vi.stubGlobal("alert", vi.fn());

describe("AuthDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dialog content", () => {
    render(<AuthDialog open={true} onOpenChange={() => {}} />);
    expect(screen.getByText(/welcome to movielog/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
  });

  it("calls signInWithOAuth on Google login", async () => {
    render(<AuthDialog open={true} onOpenChange={() => {}} />);
    const googleButton = screen.getByText(/continue with google/i);
    await userEvent.click(googleButton);

    expect(globalThis.mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
    });
  });

  it("sends magic link and shows alert on success", async () => {
    globalThis.mockSignInWithOtp.mockResolvedValueOnce({ error: null });

    render(<AuthDialog open={true} onOpenChange={() => {}} />);
    await userEvent.type(
      screen.getByPlaceholderText(/you@example.com/i),
      "user@example.com"
    );
    await userEvent.click(screen.getByText(/send magic link/i));

    expect(globalThis.mockSignInWithOtp).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(alert).toHaveBeenCalledWith("Check your email for the magic link!");
  });

  it("shows alert on error during magic link request", async () => {
    globalThis.mockSignInWithOtp.mockResolvedValueOnce({
      error: { message: "Invalid email" },
    });

    render(<AuthDialog open={true} onOpenChange={() => {}} />);
    await userEvent.type(
      screen.getByPlaceholderText(/you@example.com/i),
      "fail@example.com"
    );
    await userEvent.click(screen.getByText(/send magic link/i));

    expect(alert).toHaveBeenCalledWith("Invalid email");
  });
});
