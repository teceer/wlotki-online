import React, { Suspense } from "react";
import AddNewPool from "~/components/Pool/AddNewPool";
import Section from "~/components/global/Section";
import { H1 } from "~/components/global/Typography";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await api.event.getCommonData.mutate(params.eventId);
  if (!event) {
    return (
      <Section DivClassName="items-center justify-center">
        <H1>404</H1>
      </Section>
    );
  }
  return (
    <Section>
      <Suspense
        fallback={
          <div className="h-3 w-36 animate-pulse rounded bg-foreground/20" />
        }
      >
        <H1>{event.title}</H1>
      </Suspense>
      <AddNewPool />
    </Section>
  );
}
