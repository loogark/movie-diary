import type { TMDBReview } from "@/types";
import { StarRating } from "./StarRating";

interface Props {
  reviews: TMDBReview[];
  movieName: string;
}

export function ReviewCard({ reviews, movieName }: Props) {
  return (
    <div className="flex flex-wrap gap-4 justify-start items-stretch">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col justify-between bg-card-primary my-2 p-5 rounded-md shadow-xl transition-transform duration-150 min-h-[260px] w-full sm:basis-[48%] lg:basis-[32%] flex-grow"
        >
          <div className="flex justify-between text-xs mb-2">
            <p>{review.author}</p>
            <p>{new Date(review.created_at).toLocaleDateString()}</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-start font-semibold">{movieName}</h3>
            <StarRating rating={review.author_details.rating ?? 0} />
          </div>

          <div className="text-sm text-ellipsis overflow-hidden text-start line-clamp-4">
            {review.content}
          </div>

          <div className="mt-2 ml-auto">
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
