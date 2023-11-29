import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import React from "react";
import AvailabilityIndicator from "./AvailabilityIndicator";
import DateString from "../DateString";
import { type ClassNameValue } from "tailwind-merge";
import type { Event, EventSettings } from "@prisma/client";
import { db } from "~/server/db";
import ImageLoader from "../ImageLoader";

export default async function EventCard({
  event,
  isVertical,
  className,
}: {
  event: Event & { EventSettings: EventSettings | null };
  isVertical?: boolean;
  className?: ClassNameValue;
}) {
  const eventTitle = event.title;

  const eventSubtitle = event.subtitle;

  const eventLocation = event.locationId
    ? (
        await db.location.findFirst({
          where: { id: event.locationId },
        })
      )?.name
    : undefined;

  const eventStartDate = event.startDateTime;

  const buyButtonText = event.EventSettings?.buttonText ?? "Kup wlotki ->";

  const availableTotalText =
    event.EventSettings?.remainingTicketsText ?? "Pozostało:";

  const availableTotal =
    event.EventSettings?.availabilityIndicatorOverride ?? 100;

  const showAvailabilityIndicator =
    event.EventSettings?.showAvailabilityIndicator ?? false;

  const image = event.image ?? "/banner-default-bg.jpg";

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border shadow-lg",
        className,
        isVertical && "row-span-2",
      )}
    >
      <div className="grow border-b bg-background">
        <div
          className={cn(
            "flex gap-2 sm:h-full sm:min-h-[280px] sm:flex-col-reverse sm:gap-0",
            isVertical && "h-full min-h-[280px] flex-col-reverse gap-0",
          )}
        >
          <div className="grow space-y-2 p-4">
            <div className="space-y-1 px-1">
              <div className="flex flex-wrap gap-2 text-xs sm:text-base">
                <p className="leading-none opacity-70">
                  <DateString date={eventStartDate} format="EEEE, P" />
                </p>
              </div>
              <p className="text-lg font-semibold leading-none tracking-tighter sm:text-2xl">
                {eventTitle}
              </p>
              <p
                className={cn(
                  "text-sm leading-none opacity-70",
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
                  !eventLocation && "invisible",
                )}
              >
                {eventLocation}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "relative aspect-square w-1/3 shrink-0 grow sm:w-full sm:shrink",
              isVertical && "aspect-square w-full shrink",
            )}
          >
            <ImageLoader />
            <Image src={image} fill className="object-cover" alt="" priority />
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
          className="shrink-0 rounded-none hover:bg-gradient-to-l"
          size="lg"
          variant="secondary"
        >
          {buyButtonText}
        </Button>
      </div>
    </div>
  );
}
