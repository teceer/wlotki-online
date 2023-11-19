import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import React from "react";
import AvailabilityIndicator from "./AvailabilityIndicator";
import DateString from "../DateString";
import { type ClassNameValue } from "tailwind-merge";

export default function EventCard({
  isVertical,
  className,
}: {
  isVertical?: boolean;
  className?: ClassNameValue;
}) {
  const availableTotal = Math.random() * 100;
  const eventTitle = "POŁOWINKI";
  const eventSubtitle = "XIV LO & XV LO GDAŃSK";
  const eventLocation = "Hala Olivia, Gdańsk";
  const eventDate = new Date(2023, 10, 10, 20, 0, 0);
  const buyButtonText = "Kup wlotki ->";
  const availableTotalText = "Pozostało:";
  const showAvailabilityIndicator = Math.random() > 0.5;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border shadow-lg",
        className,
        isVertical && "row-span-2",
      )}
    >
      <div className="border-b bg-background grow">
        <div
          className={cn("flex gap-2", isVertical && "flex-col-reverse gap-0 h-full min-h-[280px]")}
        >
          <div className="grow space-y-2 p-4">
            <div className="space-y-1 px-1">
              <div className="flex flex-wrap gap-2 text-xs">
                <p className="leading-none opacity-70">
                  <DateString date={eventDate} format="EEEE, P" />
                </p>
              </div>
              <p className="text-lg font-bold leading-none">{eventTitle}</p>
              <p className="text-sm leading-none opacity-70">{eventSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <p className="rounded-full border px-2 py-1">{eventLocation}</p>
            </div>
          </div>
          <div
            className={cn(
              "relative w-1/4 shrink-0 grow",
              isVertical && "h-full w-full shrink",
            )}
          >
            <Image
              src="/banner-default-bg.jpg"
              fill
              className="object-cover"
              alt=""
              priority
            />
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
        <Button className="shrink-0 rounded-none" size="lg" variant="secondary">
          {buyButtonText}
        </Button>
      </div>
    </div>
  );
}
