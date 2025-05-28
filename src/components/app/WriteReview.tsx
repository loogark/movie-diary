import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExistingReview } from "@/components/app";

import { useQueryClient } from "@tanstack/react-query";
import {
  useGetUserReview,
  useWriteReview,
  useUpdateReview,
  useDeleteReview,
} from "@/queries";
import { StarRatingInput } from "./StarRatingInput";

export function WriteReview({ movieId }: { movieId: number }) {
  const queryClient = useQueryClient();
  const { data: existingReview, isLoading: isLoadingReview } =
    useGetUserReview(movieId);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const write = useWriteReview(movieId);
  const update = useUpdateReview(existingReview?.id);
  const del = useDeleteReview(existingReview?.id);

  const isPending = write.isPending || update.isPending;

  const resetState = () => {
    setEditing(false);
    setContent("");
    setRating(0);
    setError("");
    queryClient.invalidateQueries({ queryKey: ["userReview", movieId] });
  };

  const handleAdd = () => {
    setError("");
    if (!content.trim()) return setError("Review cannot be empty");
    if (!rating) return setError("Please select a rating");

    write.mutate(
      { content, rating },
      {
        onSuccess: resetState,
        onError: (err: Error) => setError(err.message),
      }
    );
  };

  const handleEdit = () => {
    setError("");
    update.mutate(
      { content, rating },
      {
        onSuccess: resetState,
        onError: (err: Error) => setError(err.message),
      }
    );
  };

  const handleDelete = () => {
    del.mutate(undefined, {
      onSuccess: resetState,
      onError: (err: Error) => setError(err.message),
    });
  };

  const handleSubmit = existingReview ? handleEdit : handleAdd;

  if (isLoadingReview) return null;

  return (
    <div className="w-full flex flex-col gap-4 p-4  rounded shadow-md">
      {existingReview && !editing ? (
        <ExistingReview
          content={existingReview.content}
          rating={existingReview.rating}
          onEdit={() => {
            setEditing(true);
            setContent(existingReview.content);
            setRating(existingReview.rating);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <div
          aria-label="write-review"
          className="w-full h-fit flex flex-col gap-4 p-4 rounded-md shadow-md my-4"
        >
          <div className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-gray-primary mb-2">
            <p className="text-gray-secondary text-xs mb-2">
              Write your review here 👇
            </p>
          </div>

          <Textarea
            placeholder="What did you think of the movie?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] bg-gray-600"
          />

          <div className="flex items-center justify-between">
            <StarRatingInput rating={rating} setRating={setRating} />

            <div className="flex flex-row gap-2">
              {existingReview && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setContent("");
                    setRating(0);
                    setError("");
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-gray-600"
              >
                {isPending
                  ? "Posting..."
                  : existingReview
                  ? "Update Review"
                  : "Add Review!"}
              </Button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}
