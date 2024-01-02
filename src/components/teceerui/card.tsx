import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";
import { Subheading } from "./typography";
import Image from "next/image";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <div className={cn("rounded-xl border bg-background shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
};

const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <div
      className={cn(
        "p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return <div className={cn("space-y-4 p-4 pt-0", className)}>{children}</div>;
};

const CardHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return <Subheading className={className}>{children}</Subheading>;
};

const CardCover = ({
  className,
  src,
  alt,
  children,
}: {
  className?: ClassNameValue;
  src: string;
  alt?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative h-32", className)}>
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        className="rounded-t-xl object-cover"
      />
      {children}
    </div>
  );
};

const CardCoverImage = ({
  className,
  children,
}: {
  className?: ClassNameValue;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("absolute -bottom-8 right-8", className)}>
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardHeading,
  CardContent,
  CardCover,
  CardCoverImage,
};
