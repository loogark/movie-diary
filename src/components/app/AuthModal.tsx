import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the magic link!");
    setLoading(false);
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error.message);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-gray-500 border-none">
        <DialogHeader>
          <DialogTitle>Welcome to MovieLog</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Button variant="outline" onClick={handleGoogle}>
            Continue with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            or sign in with email
          </div>

          <Input
            type="email"
            placeholder="you@example.com"
            className="text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleMagicLink}
            disabled={loading}
            className="bg-hover-secondary cursor-pointer hover:bg-hover-secondary hover-opacity-75"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
