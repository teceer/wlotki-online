import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

const Paragraph = ({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
}) => {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }[size ?? "base"];

  return (
    <p className={cn("text-base tracking-tight", sizeClasses, className)}>
      {children}
    </p>
  );
};

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <h1 className={cn("text-2xl font-medium tracking-tighter", className)}>
      {children}
    </h1>
  );
};

const Subheading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <h2 className={cn("text-xl font-medium tracking-tight", className)}>
      {children}
    </h2>
  );
};

const Description = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

export { Paragraph, Heading, Subheading, Description };
