import Image from "next/image";
import React from "react";
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
    <section>
      <div className="relative flex h-40 w-full flex-col items-center justify-end">
        <div className="absolute w-full h-full -z-50">
          {event.image && (
            <Image
              alt=""
              src={event.image}
              fill
              className="-z-50 object-cover"
            />
          )}
          <div className="absolute -z-50 h-full w-full bg-gradient-to-t from-background backdrop-blur-sm" />
        </div>
        <H1 className="w-full max-w-7xl p-4 md:p-8 md:px-0">{event.title}</H1>
      </div>
      <Section>
        <p>test</p>
      </Section>
    </section>
  );
}
