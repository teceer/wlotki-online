import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";
import NextBreadcrumb from "../elements/breadcrumbs";
import { Home } from "lucide-react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <section className={cn("space-y-4 p-4", className)}>{children}</section>
  );
};

const Main = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return <main className={cn("space-y-4", className)}>{children}</main>;
};

const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <div
      className={cn(
        "border-b bg-gradient-to-t from-background p-4 text-2xl font-medium tracking-tighter",
        className,
      )}
    >
      <NextBreadcrumb
        homeElement={<Home size={16} className="pb-0.5"/>}
        separator={<span className="text-muted-foreground"> / </span>}
        activeClasses="text-blue-500"
        containerClasses="flex text-sm font-normal tracking-tight gap-1 items-center"
        listClasses="hover:underline"
        capitalizeLinks
      />
      <header>{children}</header>
    </div>
  );
};

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
};

export { Section, Container, Main, Header };
