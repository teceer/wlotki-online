import React from "react";
import AddEvent from "../../../components/admin/AddEvent";
import EventThumbnail from "../../../components/admin/EventThumbnail";
import { db } from "~/server/db";

export default async function EventsSection() {
  const events = await db.event.findMany();

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      <AddEvent />
      {events.map((event) => (
        <EventThumbnail key={event.id} event={event} />
      ))}
    </div>
  );
}
