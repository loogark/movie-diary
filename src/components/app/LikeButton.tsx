import { useIsLiked } from "@/queries/useIsLiked";
import { useToggleLikeFilm } from "@/queries/useToggleLikeFilm";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function LikeButton({ movieId }: { movieId: number }) {
  const { data: isLiked, isLoading } = useIsLiked(movieId);
  const { mutate: toggleLike, isPending } = useToggleLikeFilm();

  const [localLiked, setLocalLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (isLiked !== undefined) setLocalLiked(isLiked);
  }, [isLiked]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (localLiked === undefined) return;

    setLocalLiked(!localLiked);

    toggleLike({ movieId, isLiked: localLiked });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending || localLiked === undefined || isLoading}
      variant="default"
      size="icon"
      className="p-0 w-[14px] h-[14px] cursor-pointer ml-auto"
    >
      <Heart
        className={clsx(
          "mt-2 transition-all",
          localLiked ? "fill-orange-400 stroke-orange-400" : "stroke-gray-600"
        )}
      />
    </Button>
  );
}
