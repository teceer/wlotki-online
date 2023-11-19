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
        "flex w-full flex-col items-center gap-4 p-4",
        SectionClassName,
      )}
    >
      <div
        className={cn("flex w-full max-w-4xl flex-col space-y-2", DivClassName)}
      >
        {children}
      </div>
    </section>
  );
}
