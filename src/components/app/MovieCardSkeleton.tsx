// src/components/app/MovieCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton({
  width = "w-[135px]",
  aspectRatio = "aspect-[2/3]",
}: {
  width?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={`p-1 ${width}`}>
      <div className={`relative bg-black rounded ${width} ${aspectRatio}`}>
        <Skeleton className="w-full h-full bg-slate-900 rounded" />
      </div>
      <div className="w-full mt-2">
        <Skeleton className="h-4 w-1/2  bg-slate-900" />
      </div>
    </div>
  );
}
