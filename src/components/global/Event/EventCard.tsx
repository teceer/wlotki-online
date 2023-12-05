import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import React from "react";
import AvailabilityIndicator from "./AvailabilityIndicator";
import DateString from "../DateString";
import { type ClassNameValue } from "tailwind-merge";
import type { Event, EventSettings, Location } from "@prisma/client";
import ImageLoader from "../ImageLoader";
import { Inter } from "../Typography";
import Link from "next/link";

export default function EventCard({
  event,
  isVertical,
  className,
}: {
  event: Event & {
    EventSettings: EventSettings | null;
    Location: Location | null;
  };
  isVertical?: boolean;
  className?: ClassNameValue;
}) {
  const eventTitle = event.title;

  const eventSubtitle = event.subtitle;

  const eventStartDate = event.startDateTime;

  const buyButtonText = event.EventSettings?.buttonText ?? "Kup wlotki ->";

  const availableTotalText =
    event.EventSettings?.remainingTicketsText ?? "Pozostało:";

  const availableTotal =
    event.EventSettings?.availabilityIndicatorOverride ?? 100;

  const showAvailabilityIndicator =
    event.EventSettings?.showAvailabilityIndicator ?? false;

  const image = event.image ?? "/banner-default-bg.jpg";

  const vertical = isVertical ?? event.EventSettings?.verticalOverride ?? false;

  const location = event.Location?.name;

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border subpixel-antialiased shadow-lg",
        className,
      )}
    >
      <div className="grow border-b bg-background">
        <div
          className={cn(
            "flex gap-1 sm:h-full sm:min-h-[280px] sm:flex-col-reverse sm:gap-0",
            vertical && "h-full min-h-[280px] flex-col-reverse gap-0",
          )}
        >
          <div className="grow space-y-2 p-4">
            <div className="space-y-1 px-1">
              <div className="flex flex-wrap gap-2 text-xs sm:text-base">
                <p className="leading-none opacity-70">
                  <DateString date={eventStartDate} format="EEEE, P" />
                </p>
              </div>
              <Inter className="line-clamp-2 text-lg font-bold leading-tight tracking-tighter sm:text-2xl">
                {eventTitle}
              </Inter>
              <p
                className={cn(
                  "text-xs leading-tight opacity-70 sm:text-base ",
                  !eventSubtitle && "invisible",
                )}
              >
                {eventSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <p
                className={cn(
                  "rounded-full border px-2 py-1",
                  !location && "invisible",
                )}
              >
                {location}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "relative flex aspect-square w-2/5 shrink-0 flex-col sm:w-full sm:shrink",
              vertical && "aspect-square w-full shrink",
            )}
          >
            <Link href={`/event/${event.id}`}>
              <div
                className={cn(
                  "relative z-10 aspect-square h-max w-full shrink-0 sm:w-full sm:shrink",
                  vertical && "aspect-square w-full shrink",
                )}
              >
                <ImageLoader />
                <Image
                  src={image}
                  fill
                  className="object-cover blur"
                  alt=""
                  priority
                />
                <Image
                  src={image}
                  fill
                  className="object-cover"
                  alt=""
                  priority
                />
              </div>
            </Link>
            <div className="relative w-full grow overflow-hidden opacity-30 blur-[1px] dark:opacity-60">
              <Image
                src={image}
                fill
                className="-scale-y-100 object-cover object-bottom"
                alt=""
                priority
              />
              <div className="absolute h-full w-full bg-gradient-to-t from-background from-50% via-transparent via-90% to-background" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end bg-muted">
        {showAvailabilityIndicator && availableTotal && (
          <div className="w-full px-4 ">
            <p className="py-1 text-xs opacity-30">{availableTotalText}</p>
            <AvailabilityIndicator available={availableTotal} />
          </div>
        )}
        <Button
          className="shrink-0 rounded-none group-hover:bg-gradient-to-l"
          size="lg"
          variant="secondary"
          asChild
        >
          <Link href={`/event/${event.id}`}>{buyButtonText}</Link>
        </Button>
      </div>
    </div>
  );
}
