import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BuyTickets from "~/components/BuyTickets";
import NotFound from "~/components/global/404";
import DateString from "~/components/global/DateString";
import { Header, Section } from "~/components/teceerui/layout";
import {
  Description,
  Heading,
} from "~/components/teceerui/typography";
import { db } from "~/server/db";

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
