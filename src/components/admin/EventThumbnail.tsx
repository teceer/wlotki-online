import type { Event } from "@prisma/client";
import { AlertTriangle, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "../elements/Badge";

export default function EventThumbnail({ event }: { event: Event }) {
  const isSelling = Math.random() > 0.5;
  const isCountdown = Math.random() > 0.5;
  const status = event.status;
  const sellingStatus = () => {
    if (isSelling) return "selling";
    if (isCountdown) return "countdown";
    return "soldout";
  };
  const color = () => {
    if (isSelling) return "bg-green-500";
    if (isCountdown) return "bg-blue-500 animate-pulse";
    return "bg-red-500";
  };

  function StatusBadge() {
    switch (status) {
      case "DRAFT":
        return (
          <Badge className="h-max text-[10px]" color="gray">
            DRAFT
          </Badge>
        );
      case "PUBLISHED":
        return (
          <Badge className="h-max text-[10px]" color="green">
            WIDOCZNY
          </Badge>
        );
      case "HIDDEN":
        return (
          <Badge className="h-max text-[10px]" color="yellow">
            UKRYTY
          </Badge>
        );
    }
  }

  return (
    <Link href={`/dashboard/event/${event.id}`}>
      <div className="group relative flex min-h-[180px] overflow-hidden rounded-xl border shadow transition-all hover:border-foreground/30">
        {event.image && (
          <Image
            alt=""
            src={event.image}
            fill
            className="absolute z-0 object-cover"
          />
        )}
        <div className="absolute h-full w-full from-background via-transparent to-background dark:bg-gradient-to-t" />
        <div className="z-10 flex grow flex-col justify-between">
          <div className="flex w-full flex-wrap justify-between gap-2 bg-white from-black/70 px-4 pb-2 backdrop-blur dark:bg-transparent dark:bg-gradient-to-b">
            <div className="flex flex-col items-center gap-1 text-white">
              <div className={cn("h-4 w-1 rounded-b-full", color())} />
              {sellingStatus() === "selling" && (
                <DollarSign className="h-4 w-4 text-green-500 opacity-70" />
              )}
              {sellingStatus() === "countdown" && (
                <Clock className="h-4 w-4 text-blue-500 opacity-70" />
              )}
              {sellingStatus() === "soldout" && (
                <AlertTriangle className="h-4 w-4 text-red-500 opacity-70" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-end bg-background px-4 py-2">
            <p className="text-sm font-medium">{event.title}</p>
          </div>
        </div>
        <div className="absolute right-2 top-2 z-10">
          <StatusBadge />
        </div>
      </div>
    </Link>
  );
}
