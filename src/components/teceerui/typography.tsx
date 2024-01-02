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
  size,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const sizeClasses = {
    h1: "text-2xl font-medium tracking-tighter",
    h2: "text-xl font-medium tracking-tighter",
    h3: "text-lg font-medium tracking-tighter",
    h4: "text-base font-medium",
    h5: "text-sm font-medium",
    h6: "text-xs font-medium",
  }[size ?? "h1"];

  return <h1 className={cn(sizeClasses, className)}>{children}</h1>;
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
