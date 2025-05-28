import { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  setRating: (value: number) => void;
}

export function StarRatingInput({ rating, setRating }: Props) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    const value = isHalf ? index - 0.5 : index;
    setRating(value);
  };

  const getFillType = (index: number) => {
    const value = hoverValue ?? rating;
    if (value >= index) return "full";
    if (value >= index - 0.5) return "half";
    return "empty";
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => {
        const fill = getFillType(index);

        return (
          <div
            key={index}
            className="relative w-6 h-6 cursor-pointer"
            onClick={(e) => handleClick(e, index)}
            onMouseEnter={() => setHoverValue(index)}
            onMouseLeave={() => setHoverValue(null)}
          >
            <Star className="absolute w-6 h-6 text-gray-400 opacity-30" />

            {fill !== "empty" && (
              <Star
                className="absolute w-6 h-6 text-gray-400"
                fill="currentColor"
                style={{
                  clipPath:
                    fill === "half" ? "inset(0 50% 0 0)" : "inset(0 0 0 0)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
