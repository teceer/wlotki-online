import React, { Suspense } from "react";
import DropTable, {
  DropTableSkeleton,
} from "~/components/admin/lists/drop/component";
import Section from "~/components/global/Section";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getServerAuthSession } from "~/server/auth";
import EventAnalytics from "./EventAnalytics";
import EventSettings from "./EventSettings";
import { api } from "~/trpc/server";
import DropCard from "~/components/admin/lists/drop/DropCard";
import TicketPoolTable from "~/components/admin/lists/ticketPool/component";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ActionBar from "~/components/elements/ActionBar";
import AddNewDrop from "~/components/Drop/AddNewDrop";
import {
  Dialog,
  DialogContent,
  DialogProvider,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Plus } from "lucide-react";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  params: { eventId: string };
}) {
  const session = await getServerAuthSession();

  const defaultTab = () => {
    return searchParams.t ? searchParams.t.toString() : "settings";
  };

  const data = await api.drop.getByEventId.query(params.eventId);

  return (
    <Section SectionClassName="px-0">
      <Tabs defaultValue={defaultTab()}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="mx-4">
            <TabsTrigger value="analytics" className="router-link">
              Statystyki
            </TabsTrigger>
            <TabsTrigger value="drops" className="router-link">
              Dropy
            </TabsTrigger>
            <TabsTrigger value="settings" className="router-link">
              Ustawienia
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="px-4">
          <TabsContent value="analytics">
            <EventAnalytics eventId={params.eventId} />
          </TabsContent>
          <TabsContent value="drops" className="space-y-2">
            <ActionBar>
              <DialogProvider>
                <Dialog>
                  <DialogTrigger asChild>
                    <Plus />
                  </DialogTrigger>
                  <DialogContent className="autofocus-0 w-[90vw] rounded-xl border">
                    <AddNewDrop eventId={params.eventId} />
                  </DialogContent>
                </Dialog>
              </DialogProvider>
            </ActionBar>
            <Suspense>
              {data?.map((drop, index) => (
                <DropCard drop={drop} key={drop.id} index={index} />
              ))}
            </Suspense>
          </TabsContent>
          <TabsContent
            value="settings"
            className="grid grid-cols-1 gap-2 md:grid-cols-2"
          >
            <EventSettings eventId={params.eventId} />
          </TabsContent>
        </div>
      </Tabs>
    </Section>
  );
}
