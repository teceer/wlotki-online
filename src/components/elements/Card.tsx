import Image from "next/image";
import React from "react";
import { type ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export default function Card(props: {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  className?: ClassNameValue;
  iconClassName?: ClassNameValue;
  loadingClassName?: ClassNameValue;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="relative min-h-[80px] cursor-pointer">
      {props.loading && (
        <div className="absolute flex h-full w-full items-center justify-center overflow-hidden rounded-xl opacity-70 blur-sm animate-pulse">
          <div className="relative aspect-square w-full scale-110">
            <div className={cn("duration-2000 absolute h-full w-full animate-spin rounded-full bg-gradient-to-bl from-transparent from-50% to-white to-50%", props.loadingClassName)} />
          </div>
          <div className="absolute h-full w-full backdrop-blur-xl" />
        </div>
      )}
      <div
        className={cn(
          "group relative flex overflow-hidden rounded-xl border bg-background shadow transition-all hover:border-foreground/30",
          props.className,
        )}
        onClick={props.onClick}
      >
        {props.image && (
          <Image
            alt=""
            src={props.image}
            fill
            className="absolute z-0 object-cover"
          />
        )}
        <div className="z-10 flex grow flex-col justify-end">
          {props.icon && (
            <div className={cn("relative h-16 w-full", props.iconClassName)}>
              <div className="absolute -z-10 h-full w-full bg-gradient-to-tr from-secondary to-background" />
              <div className="absolute h-full w-full">
                <div
                  className={cn(
                    "flex h-full w-full items-center p-4",
                    props.loading && "animate-pulse",
                  )}
                >
                  {props.icon}
                </div>
              </div>
              <div className="absolute h-full w-full">
                <div
                  className={cn(
                    "flex h-full w-full items-center p-4 opacity-70 blur",
                    props.loading && "animate-pulse",
                  )}
                >
                  {props.icon}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-end bg-background px-4 py-2">
            <p className="text-sm font-medium">{props.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
