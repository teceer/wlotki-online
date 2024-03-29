"use client";
import React from "react";
import { Button, type ButtonProps } from "../ui/button";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export default function ActionBar({
  children,
  variant = "circle",
  className,
}: {
  children: React.ReactNode;
  variant?: "circle" | "bar";
  className?: ClassNameValue;
}) {
  if (variant === "bar") {
    return (
      <div className="sticky bottom-0 left-0 z-50 w-full p-4 pt-0 duration-300 ease-in-out animate-in slide-in-from-bottom-full">
        <div className={cn(className)}>{children}</div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 pt-0 duration-500 ease-in-out animate-in slide-in-from-right-full">
      <div
        className={cn(
          "rounded-full border border-primary/30 bg-secondary/70 p-4 backdrop-blur transition-all",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Action({
  children,
  variant,
  className,
  onClick,
  disabled,
  asChild,
}: {
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  className?: ClassNameValue;
  onClick?: () => void;
  disabled?: boolean;
  asChild?: boolean;
}) {
  return (
    <Button
      variant={variant}
      className={cn("w-full rounded-full px-8 py-6 transition-all", className)}
      onClick={onClick}
      disabled={disabled}
      asChild={asChild}
    >
      {children}
    </Button>
  );
}

export function ActionGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <div
      className={cn(
        "relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all",
        className,
      )}
    >
      {children}
    </div>
  );
}
