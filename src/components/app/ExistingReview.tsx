import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/app";
import { Pen, Trash2 } from "lucide-react";

interface Props {
  content: string;
  rating: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function ExistingReview({ content, rating, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-3 text-start">
      <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
        <p className="text-gray-secondary text-xs mb-2">
          {"Your Review".toUpperCase()}
        </p>
        <div className="flex flex-row justify-center items-center mb-2">
          <Button
            variant="default"
            aria-label="edit-review"
            size="icon"
            className="rounded-full cursor-pointer hover:text-white text-gray-600 transition-colors"
            onClick={onEdit}
          >
            <Pen />
          </Button>
          <Button
            variant="default"
            aria-label="delete-review"
            className="rounded-full cursor-pointer text-gray-600  hover:text-red-400 transition-colors"
            size="icon"
            onClick={onDelete}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-2 w-full">
        <div className="text-sm text-p-white whitespace-pre-wrap flex-grow">
          {content}
        </div>
        <div className="flex-shrink-0">
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
}
