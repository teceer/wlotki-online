import { cn } from "~/lib/utils";
import { type ClassNameValue } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function Badge({
  children,
  className,
  color,
  tooltip,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
  color?: "green" | "red" | "blue" | "yellow" | "violet" | "gray";
  tooltip?: string;
}) {
  const colorClasses = {
    green:
      "border-green-500 bg-green-500 bg-opacity-30 text-green-700 dark:text-green-300",
    red: "border-red-500 bg-red-500 bg-opacity-30 text-red-700 dark:text-red-300",
    blue: "border-blue-500 bg-blue-500 bg-opacity-30 text-blue-700 dark:text-blue-300",
    yellow:
      "border-yellow-500 bg-yellow-500 bg-opacity-30 text-yellow-700 dark:text-yellow-300",
    violet:
      "border-violet-500 bg-violet-500 bg-opacity-30 text-violet-700 dark:text-violet-300",
    gray: "border-gray-500 bg-gray-500 bg-opacity-30 text-gray-700 dark:text-gray-300",
  };

  function Content() {
    return (
      <div
        className={cn(
          "cursor-default rounded-full border px-3 py-1 pb-0.5 text-sm flex items-center justify-center",
          className,
          color && colorClasses[color],
        )}
      >
        {children}
      </div>
    );
  }

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger className="cursor-auto">
            <Content />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <Content />;
}

export function BadgeGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
}
