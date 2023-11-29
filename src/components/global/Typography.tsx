import React from "react";
import { type ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";
import { Inter as InterFont } from "next/font/google";
const inter = InterFont({ subsets: ["latin"] });

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
    <div className={cn("text-xl font-medium tracking-tighter", className)}>
      {children}
    </div>
  );
}

export function Inter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return <div className={cn(inter.className, className)}>{children}</div>;
}
