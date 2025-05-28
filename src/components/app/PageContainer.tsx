import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[950px] mx-auto px-4 py-6 min-h-screen">
      {children}
    </div>
  );
}
