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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "~/lib/utils";
import ClientPortal from "./global/ClientPortal";
import ActionBar, { Action } from "./elements/ActionBar";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Pool } from "@prisma/client";
import { toast } from "sonner";

export default function BuyTickets({ eventId }: { eventId: string }) {
  const { data: drops } = api.drop.buyTickets.useQuery(eventId);
  const defaultValue =
    drops?.find((drop) => drop.status === "ACTIVE")?.id ?? // select the first ACTIVE drop
    drops?.find((drop) => drop.status === "UPCOMING")?.id ?? // select the first UPCOMING drop
    drops?.[drops.length - 1]?.id; // select the last drop

  const [selectedDropId, setSelectedDropId] = React.useState<
    string | undefined
  >(undefined);

  const [selectedPoolId, setSelectedPoolId] = React.useState<
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
        <SelectTrigger className="w-1/2 bg-background">
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
            <RadioGroup
              className="flex flex-wrap gap-2"
              onValueChange={(value) => setSelectedPoolId(value)}
            >
              {drop.Pool.map((pool) => (
                <RadioGroupItem
                  value={pool.id}
                  key={pool.id}
                  className={cn(
                    "min-w-[150px] grow rounded-xl border bg-background p-3",
                    pool.id === selectedPoolId && "ring-1 ring-blue-500",
                  )}
                >
                  <p>{pool.TicketType?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {price(pool.price)}
                  </p>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </TabsContent>
        ))}
      </Tabs>
      {selectedPoolId && (
        <ClientPortal selector="actionbar">
          <ActionBar variant="bar" className="space-y-1">
            <SelectCount
              pool={drops
                ?.find((drop) => drop.id === (selectedDropId ?? defaultValue))
                ?.Pool.find((pool) => pool.id === selectedPoolId)}
            />
            <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
              <Action variant="ghost">Dodaj do koszyka</Action>
              <Action variant="blue">Kup teraz</Action>
            </div>
          </ActionBar>
        </ClientPortal>
      )}
    </div>
  );
}

function SelectCount({ pool }: { pool?: Pool }) {
  const [count, setCount] = React.useState(1);

  return (
    <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
      <div className="flex grow items-center justify-center px-4 text-sm font-medium">
        Suma: {price((pool?.price ?? 0) * count)}
      </div>
      <div className="flex grow justify-end gap-2">
        <Button
          variant="secondary"
          className="w-max rounded-full rounded-r-none px-3 py-6 transition-all"
          onClick={() => setCount(count - 1 > 0 ? count - 1 : 1)}
        >
          <Minus />
        </Button>
        <div className="flex w-max items-center justify-center px-3">
          <p className="text-lg font-bold">{count}</p>
        </div>
        <Button
          variant="secondary"
          className="w-max rounded-full rounded-l-none px-3 py-6 transition-all"
          onClick={() => setCount(count + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
