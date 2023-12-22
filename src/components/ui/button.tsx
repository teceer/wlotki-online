import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        styled:
          "bg-blue-500/20 dark:border-blue-500 border-blue-500 border dark:text-white/70 text-blue-500/70 hover:bg-blue-500/20 dark:bg-blue-500/30 dark:drop-shadow",
        blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-500/80 shadow-sm hover:to-blue-600",
        gradient:
          "bg-gradient-to-tr border to-background from-accent text-primary hover:from-background hover:to-background shadow-sm transition-all",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "styled")
      return (
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 top-0 -z-10 blur-sm dark:opacity-100">
            <Comp
              className={cn(
                buttonVariants({ variant, size, className }),
                "bg-transparent",
              )}
              ref={ref}
              {...props}
            />
          </div>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </div>
      );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
