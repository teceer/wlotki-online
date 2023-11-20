import React, { Suspense } from "react";
import Section from "~/components/global/Section";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await api.event.findById.mutate(params.eventId);
  return (
    <Section>
      <Suspense
        fallback={
          <div className="h-3 w-36 animate-pulse rounded bg-foreground/20" />
        }
      >
        {event?.title}
      </Suspense>
    </Section>
  );
}
