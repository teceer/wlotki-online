import React, { Suspense } from "react";
import AddNewPool from "~/components/Pool/AddNewPool";
import AddNewTicketType from "~/components/Pool/AddNewTicketType";
import Section from "~/components/global/Section";
import { H1 } from "~/components/global/Typography";
import { db } from "~/server/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Card from "~/components/elements/Card";
import { Tags, Ticket } from "lucide-react";

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
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
        <DialogProvider>
          <Dialog>
            <DialogTrigger>
              <Card
                title="Dodaj typ biletów"
                icon={<Tags className="text-blue-500" />}
              />
            </DialogTrigger>
            <DialogContent className="autofocus-0 w-[90vw] rounded-xl border">
              <AddNewTicketType />
            </DialogContent>
          </Dialog>
        </DialogProvider>
        <DialogProvider>
          <Dialog>
            <DialogTrigger>
              <Card
                title="Dodaj pule biletowe"
                icon={<Ticket className="text-blue-500" />}
              />
            </DialogTrigger>
            <DialogContent className="autofocus-0 w-[90vw] rounded-xl border">
              <AddNewPool />
            </DialogContent>
          </Dialog>
        </DialogProvider>
      </div>
    </Section>
  );
}
