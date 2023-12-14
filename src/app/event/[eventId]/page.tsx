import Image from "next/image";
import React, { Suspense } from "react";
import NotFound from "~/components/global/404";
import Section from "~/components/global/Section";
import { H1 } from "~/components/global/Typography";
import { db } from "~/server/db";

export default async function page({
  params,
}: {
  params: { eventId: string };
}) {
  // const event = await api.event.findById.mutate(params.eventId);
  const event = await db.event.findFirst({
    where: { id: params.eventId },
  });

  if (!event) {
    return (
      <Section DivClassName="items-center justify-center">
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
        <Section DivClassName="z-10">
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

  return (
    <Suspense fallback={<Fallback />}>
      <section className="h-full grow bg-gradient-to-t from-transparent from-50% to-background to-70%">
        <div className="absolute w-full">
          <div className="relative flex h-40 w-full flex-col items-center justify-end md:h-64">
            <div className="absolute h-full w-full">
              {event.image && (
                <Image alt="" src={event.image} fill className="object-cover" />
              )}
              <div className="absolute h-full w-full bg-gradient-to-t from-background backdrop-blur-sm" />
            </div>
          </div>
        </div>
        <Section DivClassName="z-10">
          <div className="flex items-end justify-between gap-4">
            <H1 className="pb-8 md:pb-12">{event.title}</H1>
            <div className="relative aspect-square w-40 shrink-0 md:w-64">
              {event.image && (
                <>
                  <Image
                    alt=""
                    src={event.image}
                    fill
                    className="rounded-lg object-cover blur"
                  />
                  <Image
                    alt=""
                    src={event.image}
                    fill
                    className="rounded-lg object-cover"
                  />
                </>
              )}
            </div>
          </div>
        </Section>
      </section>
    </Suspense>
  );
}
