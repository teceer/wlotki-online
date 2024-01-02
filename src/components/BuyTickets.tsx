"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import price from "./global/price";

export default function BuyTickets({ eventId }: { eventId: string }) {
  const { data: drops } = api.drop.buyTickets.useQuery(eventId);
  const defaultValue =
    drops?.find((drop) => drop.status === "ACTIVE")?.id ?? // select the first ACTIVE drop
    drops?.find((drop) => drop.status === "UPCOMING")?.id ?? // select the first UPCOMING drop
    drops?.[drops.length - 1]?.id; // select the last drop

  const [selectedDropId, setSelectedDropId] = React.useState<
    string | undefined
  >(undefined);

  if (!drops?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        onValueChange={(value) => setSelectedDropId(value)}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="bg-background">
          <SelectValue placeholder="Wybierz pulę" />
        </SelectTrigger>
        <SelectContent>
          {drops.map((drop, index) => (
            <SelectItem
              value={drop.id}
              key={drop.id}
              disabled={drop.status === "ENDED"}
            >
              {drop.name ?? "DROP " + (index + 1)}
              {drop.status === "ENDED" ? " - SOLDOUT" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Tabs
        defaultValue={defaultValue}
        value={selectedDropId}
        className="w-full"
      >
        {drops.map((drop) => (
          <TabsContent value={drop.id} key={drop.id}>
            <div className="flex flex-wrap gap-2">
              {drop.Pool.map((pool) => (
                <div
                  key={pool.id}
                  className="min-w-[150px] grow rounded-xl border bg-background p-3"
                >
                  <p>{pool.TicketType?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {price(pool.price)}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
