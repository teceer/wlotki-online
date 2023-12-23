import React, { Suspense } from "react";
import AddNewPool from "~/components/Pool/AddNewPool";
import AddNewTicketType from "~/components/Pool/AddNewTicketType";
import Section from "~/components/global/Section";
import { H1 } from "~/components/global/Typography";
import {
  Dialog,
  DialogContent,
  DialogProvider,
  DialogTrigger,
} from "~/components/ui/dialog";
import Card from "~/components/elements/Card";
import { CalendarClock, Tags, Ticket } from "lucide-react";
import TicketTypeTable, {
  TicketTypeTableSkeleton,
} from "~/components/admin/lists/ticketType/component";
import { api } from "~/trpc/server";
import TicketPoolTable, {
  TicketPoolTableSkeleton,
} from "~/components/admin/lists/ticketPool/component";
import AddNewDrop from "~/components/Drop/AddNewDrop";

export default async function page({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await api.event.findById.query(params.eventId);

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
        <DialogProvider>
          <Dialog>
            <DialogTrigger>
              <Card
                title="Zaplanuj drop"
                icon={<CalendarClock className="text-blue-500" />}
              />
            </DialogTrigger>
            <DialogContent className="autofocus-0 w-[90vw] rounded-xl border">
              <AddNewDrop eventId={event.id} />
            </DialogContent>
          </Dialog>
        </DialogProvider>
      </div>
      <Suspense fallback={<TicketPoolTableSkeleton />}>
        <TicketPoolTable />
      </Suspense>
      <Suspense fallback={<TicketTypeTableSkeleton />}>
        <TicketTypeTable />
      </Suspense>
    </Section>
  );
}
