import { AlertTriangle, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "~/lib/utils";

export default function EventThumbnail() {
  const isSelling = Math.random() > 0.5;
  const isCountdown = Math.random() > 0.5;
  const status = () => {
    if (isSelling) return "selling";
    if (isCountdown) return "countdown";
    return "soldout";
  };
  const color = () => {
    if (isSelling) return "bg-green-500";
    if (isCountdown) return "bg-blue-500 animate-pulse";
    return "bg-red-500";
  };
  return (
    <div className="group relative flex min-h-[128px] overflow-hidden rounded-xl border shadow transition-all hover:border-foreground/30">
      <Image
        alt=""
        src="/banner-default-bg.jpg"
        fill
        className="absolute z-0 object-cover"
      />
      {/* <div className="absolute h-full w-full bg-gradient-to-t from-background via-transparent to-background" /> */}
      <div className="z-10 flex grow flex-col justify-between">
        <div className="flex w-full flex-wrap gap-2  px-4 pb-2 backdrop-blur">
          <div className="flex flex-col items-center gap-1 text-white">
            <div className={cn("h-4 w-1 rounded-b-full", color())} />
            {status() === "selling" && (
              <DollarSign className="h-4 w-4 opacity-70" />
            )}
            {status() === "countdown" && (
              <Clock className="h-4 w-4 opacity-70" />
            )}
            {status() === "soldout" && (
              <AlertTriangle className="h-4 w-4 opacity-70" />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-end bg-background px-4 py-2">
          <p className="text-sm font-medium">Event Name</p>
        </div>
      </div>
    </div>
  );
}
