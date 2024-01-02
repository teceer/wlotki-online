import { cn } from "~/lib/utils";
import React from "react";
import type { ClassNameValue } from "tailwind-merge";

export default function AvailabilityIndicator({
  available,
  className,
}: {
  available: number;
  className?: ClassNameValue;
}) {
  const availableTotal = available;

  const color = () => {
    if (availableTotal <= 10) return "bg-red-500";
    if (availableTotal <= 30) return "bg-orange-500";
    if (availableTotal <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex gap-2 space-y-1">
      <p className="text-xs text-muted-foreground">Pozostało:</p>
      <div className={cn("flex h-2 w-full select-none gap-[1px]", className)}>
        {Array.from({ length: availableTotal / 2 + 1 }).map((_, i) => (
          <div
            key={i}
            className={cn("w-full rounded-full opacity-70", color())}
          />
        ))}
        {Array.from({ length: 50 - availableTotal / 2 - 1 }).map((_, i) => (
          <div key={i} className="w-full rounded-full bg-foreground/10" />
        ))}
      </div>
    </div>
  );
}
