import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import BuyTickets from "~/components/BuyTickets";
import DropSection from "~/components/Event/DropSection";
import EventHeader from "~/components/Event/EventHeader";
import ActionBar, { Action } from "~/components/elements/ActionBar";
import NotFound from "~/components/global/404";
import ClientPortal from "~/components/global/ClientPortal";
import DateString from "~/components/global/DateString";
import { H1 } from "~/components/global/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeading,
} from "~/components/teceerui/card";
import { Header, Section } from "~/components/teceerui/layout";
import {
  Description,
  Heading,
  Paragraph,
  Subheading,
} from "~/components/teceerui/typography";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await db.event.findFirst({
    where: {
      id: params.eventId,
    },
    include: {
      Location: true,
      EventSettings: true,
    },
  });

  if (!event) {
    return (
      <Section>
        <NotFound />
      </Section>
    );
  }

  function Fallback() {
    return (
      <section className="h-full grow bg-gradient-to-t from-transparent from-50% to-background to-70%">
        <div className="absolute w-full">
          <div className="relative flex h-40 w-full flex-col items-center justify-end md:h-64">
            <div className="absolute h-full w-full">
              <div className="h-full w-full animate-pulse bg-gradient-to-tr from-accent opacity-70" />
            </div>
          </div>
        </div>
        <Section>
          <div className="flex items-end justify-between gap-4">
            <div className="pb-8 md:pb-12">
              <div className="h-6 w-32 animate-pulse rounded-lg bg-gradient-to-tr from-accent opacity-70" />
            </div>
            <div className="relative aspect-square w-40 shrink-0 animate-pulse rounded-lg bg-gradient-to-tr from-accent opacity-70 md:w-64" />
          </div>
        </Section>
      </section>
    );
  }

  function EventImage() {
    if (event?.image) {
      return (
        <Image
          alt="event image"
          src={event.image}
          fill
          className="object-cover"
        />
      );
    } else {
      return <div className="bg-gradient-to-tr from-accent opacity-70" />;
    }
  }

  return (
    <>
      <Header currentPath={event.title}>{event.title}</Header>
      <Section>
        <div className="relative h-48 overflow-hidden rounded-xl border bg-background">
          <EventImage />
        </div>
        <div>
          <Description>
            <Calendar className="mr-0.5 inline-block pb-0.5" size={16} />
            <DateString date={event.startDateTime} format="PPPP" />
          </Description>
          {event.Location && (
            <Description>
              <MapPin className="mr-0.5 inline-block pb-0.5" size={16} />
              {event.Location.name}, {event.Location.city}
            </Description>
          )}
        </div>
        <BuyTickets eventId={event.id} />
        {event.description && (
          <div className="space-y-1">
            <Heading size="h4">Opis wydarzenia</Heading>
            <Description>{event.description}</Description>
          </div>
        )}
      </Section>
    </>
  );
}
