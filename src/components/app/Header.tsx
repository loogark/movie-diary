import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "./AuthModal";
import { useAuth } from "@/queries/useAuth";
import { UserMenu } from "./UserMenu";

export function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="w-full py-6 text-white">
      <div className="max-w-[950px] mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">
          <Link to="/">Movie Diary</Link>
        </h1>

        {user ? (
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        ) : (
          <>
            <Button
              variant="secondary"
              className="py-[2px] px-2 cursor-pointer font-extrabold bg-hoverg-primary hover:bg-hoverg-primary hover:opacity-90 rounded-sm text-amber-50"
              onClick={() => setAuthOpen(true)}
            >
              Log In
            </Button>
            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
          </>
        )}
      </div>
    </header>
  );
}
