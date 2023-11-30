import React from "react";
import { db } from "~/server/db";
import EventCard from "./EventCard";

export default async function Events() {
  const events = await db.event.findMany({
    where: { status: "PUBLISHED" },
    include: { EventSettings: true, Location: true },
  });
  return (
    <>
      {events.map((event) => {
        return <EventCard event={event} key={event.id} />;
      })}
    </>
  );
}
