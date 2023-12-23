import React from "react";
import Section from "../global/Section";
import { api } from "~/trpc/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default async function DropSection({ eventId }: { eventId: string }) {
  const data = await api.drop.getByEventId.query(eventId);

  const soldoutClass = (index: number) => {
    const x = index % 4;
    if (x === 0) return "bottom-1 left-1 rotate-[12deg]";
    if (x === 1) return "top-1 left-1 rotate-[-9deg]";
    if (x === 2) return "bottom-1 rotate-[2deg]";
    if (x === 3) return "bottom-1 left-1 rotate-[-10deg]";
  };

  if (!data.length)
    return (
      <Section SectionClassName="px-0 pt-0">
        <Tabs defaultValue="no_data">
          <div className="flex">
            <ScrollArea className="whitespace-nowrap" dir="ltr">
              <TabsList className="mx-4">
                <TabsTrigger value="no_data">
                  Brak dostępnych pul biletowych.
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </Tabs>
      </Section>
    );

  return (
    <Section SectionClassName="px-0 pt-0">
      <Tabs
        defaultValue={
          data?.find((drop) => drop.status === "ACTIVE")?.id ?? // select the first ACTIVE drop
          data?.find((drop) => drop.status === "UPCOMING")?.id ?? // select the first UPCOMING drop
          data?.[data.length - 1]?.id // select the last drop
        }
      >
        <div className="flex">
          <ScrollArea className="whitespace-nowrap" dir="rtl">
            <TabsList className="mx-4">
              {data?.reverse().map((drop, index) => (
                <TabsTrigger
                  key={drop.id}
                  value={drop.id}
                  className={cn(
                    "relative",
                    drop.status === "ENDED" && "text-opacity-70",
                    drop.status === "ACTIVE" &&
                      "_text-green-500 data-[state=active]:text-muted-foreground",
                    drop.status === "UPCOMING" && "opacity-70",
                  )}
                  //   disabled={drop.status != "ACTIVE"}
                >
                  {drop.status === "ENDED" && (
                    <div
                      className={cn(
                        soldoutClass(index),
                        "absolute rounded-full bg-red-500 px-1 py-0.5 text-[8px] leading-none text-white",
                      )}
                    >
                      SOLDOUT
                    </div>
                  )}
                  {drop.name ?? "DROP " + (data.length - index)}
                  {drop.status === "ACTIVE" && (
                    <>
                      {/* <div className="absolute h-full w-full animate-pulse rounded blur-sm data-[state=active]:border-2 data-[state=active]:border-green-400" /> */}
                      <div className="absolute right-1.5 top-1 h-1 w-1 animate-ping rounded-full bg-green-500" />
                      <div className="absolute right-1.5 top-1 h-1 w-1 animate-pulse rounded-full bg-green-500" />
                    </>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
        {data?.map((drop) => (
          <TabsContent key={drop.id} value={drop.id}>
            {drop.name ?? "DROP " + drop.status}
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
