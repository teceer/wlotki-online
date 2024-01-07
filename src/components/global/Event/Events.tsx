import React from "react";
import EventCard from "./EventCard";
import { api } from "~/trpc/server";

export default async function Events() {
  const events = await api.event.getAll.query();
  return (
    <>
      {events.map((event) => {
        return <EventCard event={event} key={event.id} />;
      })}
    </>
  );
}
