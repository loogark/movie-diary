// src/components/MovieCard.tsx
import { useNavigate } from "react-router-dom";
import { StarRating } from "./StarRating";
import clsx from "clsx";
import { LikeButton } from "./LikeButton";
import { useAuth } from "@/queries/useAuth";

interface Props {
  id: number;
  title: string;
  poster: string | null;
  rating?: number;
  width: string;
  hideLike?: boolean;
}

export function MovieCard({
  id,
  title,
  poster,
  rating,
  width,
  hideLike = false,
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div
      className="w-fit h-fit cursor-pointer rounded overflow-hidden transition border-2 border-transparent hover:border-hoverg-primary p-1"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <div
        className={clsx(
          "relative aspect-[2/3] bg-zinc-900 rounded overflow-hidden",
          width
        )}
      >
        {" "}
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="w-full h-fit flex flex-row justify-between items-center">
        {rating && <StarRating rating={rating} />}
        {user && !hideLike && <LikeButton movieId={id} />}
      </div>
    </div>
  );
}
