import { cn } from "~/lib/utils";
import React from "react";
import { type ClassNameValue } from "tailwind-merge";

export default function Section({
  children,
  SectionClassName,
  DivClassName,
}: {
  children: React.ReactNode;
  SectionClassName?: ClassNameValue;
  DivClassName?: ClassNameValue;
}) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center gap-4 p-4 md:gap-8 md:p-8",
        SectionClassName,
      )}
    >
      <div
        className={cn("flex w-full max-w-7xl flex-col space-y-4", DivClassName)}
      >
        {children}
      </div>
    </section>
  );
}
