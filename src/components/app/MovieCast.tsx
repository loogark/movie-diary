import { useState } from "react";
import type { TmdbCredits } from "@/types";

interface Props {
  cast: TmdbCredits["cast"];
}

export function MovieCast({ cast }: Props) {
  const [expanded, setExpanded] = useState(false);
  const displayCount = 15;

  const visibleCast = expanded ? cast : cast.slice(0, displayCount);

  if (!cast || cast.length === 0) {
    return (
      <div className="flex flex-col gap-2 cursor-default">
        <p className="text-gray-secondary border-b border-solid border-b-grey pb-2 text-sm">
          CAST
        </p>
        <p className="text-gray-secondary max-w-full rounded p-1 text-center text-sm">
          The cast for this movie remains a mystery...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 cursor-default text-start">
      <p className="text-gray-secondary border-b border-solid border-gray-secondary pb-2 text-sm">
        CAST
      </p>

      <div className="flex flex-wrap gap-1">
        {visibleCast.map((actor) => (
          <p
            key={actor.id}
            className="bg-border-gray-primary text-gray-primary rounded p-1 text-center text-xs max-w-full"
          >
            {actor.name}
          </p>
        ))}
      </div>

      {cast.length > displayCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-secondary mt-2 hover:text-hover-primary self-start underline"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
