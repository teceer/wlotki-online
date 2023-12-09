import Image from "next/image";
import React from "react";
import { type ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export default function Card(props: {
  title: string;
  description?: string;
  image?: string;
  className?: ClassNameValue;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[80px] overflow-hidden rounded-xl border bg-background shadow transition-all hover:border-foreground/30",
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
      <div className="absolute h-full w-full bg-gradient-to-tr" />
      {/* <div className="absolute h-full w-full bg-gradient-to-t from-background via-transparent to-background" /> */}
      <div className="z-10 flex grow flex-col justify-end">
        <div className="flex flex-col justify-end bg-background px-4 py-2">
          <p className="text-sm font-medium">{props.title}</p>
        </div>
      </div>
    </div>
  );
}
