import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return <div className={cn("text-xl font-bold", className)}>{children}</div>;
}

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <div className={cn("text-xl font-medium tracking-tighter", className)}>{children}</div>
  );
}
