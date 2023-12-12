import React from "react";
import EventsSection from "~/components/admin/EventsSection";
import Section from "~/components/global/Section";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Settings from "./Settings";
import { getServerAuthSession } from "~/server/auth";
import Spline from '@splinetool/react-spline';

export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  const defaultTab = () => {
    const defaultTab = searchParams.t;
    if (defaultTab === "events") return "events";
    if (defaultTab === "analytics") return "analytics";
    if (defaultTab === "users") return "users";
    if (defaultTab === "organizations") return "organizations";
    if (defaultTab === "settings") return "settings";
    return "events";
  };

  return (
    <Section SectionClassName="px-0">
      <Tabs defaultValue={defaultTab()}>
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="mx-4">
            <TabsTrigger value="events">Wydarzenia</TabsTrigger>
            <TabsTrigger value="analytics">Statystyki</TabsTrigger>
            <TabsTrigger value="users">Użytkownicy</TabsTrigger>
            <TabsTrigger value="organizations">Organizacje</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="px-4">
          <TabsContent value="events">
            <EventsSection />
          </TabsContent>
          <TabsContent value="organizations">
            
          </TabsContent>
          <TabsContent value="settings" className="grid grid-cols-1 gap-2">
            <Settings session={session ?? undefined} />
          </TabsContent>
        </div>
      </Tabs>
    </Section>
  );
}
