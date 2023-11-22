import React from "react";
import AddEvent from "./AddEvent";
import EventThumbnail from "./EventThumbnail";

export default function EventsSection() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      <AddEvent />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
      <EventThumbnail />
    </div>
  );
}
