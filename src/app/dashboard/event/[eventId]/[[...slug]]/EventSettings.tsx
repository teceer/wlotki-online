import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import EventSettingsForm from "./EventSettingsForm";
import { api } from "~/trpc/server";

export default async function EventSettings({ eventId }: { eventId: string }) {
  const event = await api.event.findById.query(eventId);

  if (!event) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustawienia</CardTitle>
      </CardHeader>
      <CardContent>
        <EventSettingsForm event={event} />
      </CardContent>
    </Card>
  );
}
