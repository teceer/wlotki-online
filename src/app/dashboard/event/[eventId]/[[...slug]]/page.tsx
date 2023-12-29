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
            <TabsTrigger value="analytics">Statystyki</TabsTrigger>
            <TabsTrigger value="drops">Dropy</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="px-4">
          <TabsContent value="analytics">
            <EventAnalytics eventId={params.eventId} />
          </TabsContent>
          <TabsContent value="drops" className="space-y-2">
            {data?.map((drop) => <DropCard drop={drop} key={drop.id} />)}
            <Suspense fallback={<DropTableSkeleton />}>
              <DropTable eventId={params.eventId} />
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
