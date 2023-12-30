import type { Drop } from "@prisma/client";
import { Edit, Plus } from "lucide-react";
import React from "react";
import AddNewPool from "~/components/Pool/AddNewPool";
import DateString from "~/components/global/DateString";
import price from "~/components/global/price";
import {
  Dialog,
  DialogContent,
  DialogProvider,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/server";
import TicketPoolTable from "../ticketPool/component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

export default async function DropCard({
  drop,
  index,
}: {
  drop: Drop;
  index?: number;
}) {
  function StartIndicatorFactory() {
    if (drop.startDateTime) {
      return <DateString date={drop.startDateTime} format="HH:mm P" />;
    } else {
      return <p className="text-blue-500">automatycznie</p>;
    }
  }

  async function EndIndicatorFactory() {
    const isLimited = await api.drop.isLimited.query(drop.id);
    if (drop.endDateTime) {
      return <DateString date={drop.endDateTime} format="HH:mm P" />;
    } else if (drop.totalTickets || isLimited) {
      return <p className="text-blue-500">do wyczerpania</p>;
    } else {
      return (
        <p className="text-orange-500 dark:text-yellow-500">bezterminowo</p>
      );
    }
  }

  const pools = await api.pool.getByDropId.query(drop.id);

  const totalTickets = pools?.reduce((acc, pool) => {
    return acc + pool._count.Ticket;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-2 pb-2">
          <p>{drop.name ?? "Drop " + (index! + 1)}</p>
          <Edit size={16} className="opacity-70" />
        </CardTitle>
        <div className="text-muted-foreground text-sm">
          <div className="flex items-baseline justify-between gap-2">
            <p>Start: </p>
            <Separator className="w-fit grow" />
            <StartIndicatorFactory />
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <p>Koniec: </p>
            <Separator className="w-fit grow" />
            <EndIndicatorFactory />
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <p>Limit biletów:</p>
            <Separator className="w-fit grow" />
            <p>{drop.totalTickets ?? "bez limitu"}</p>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <p>Wygenerowanych biletów:</p>
            <Separator className="w-fit grow" />
            <p>{totalTickets}</p>
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className={cn(!pools.length && "text-red-500")}>
              Pule biletowe: {pools.length}
            </AccordionTrigger>
            <AccordionContent>
              <TicketPoolTable dropId={drop.id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>
    </Card>
  );
}

async function PoolSection({ drop }: { drop: Drop }) {
  const pools = await api.pool.getByDropId.query(drop.id);

  function PoolCard({ pool }: { pool: (typeof pools)[0] }) {
    return (
      <div className="rounded-lg border bg-muted p-3 text-sm">
        {!!pool.name && (
          <div>
            <p className="text-xs text-muted-foreground">Nazwa</p>
            <p>{pool.name}</p>
          </div>
        )}
        {!!pool.time && (
          <div>
            <p className="text-xs text-muted-foreground">Godzina</p>
            <DateString date={pool.time} format="HH:mm" />
          </div>
        )}
        <div>
          <p className="text-xs text-muted-foreground">Cena</p>
          <p>{price(pool.price)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Typ</p>
          <p>{pool.TicketType?.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <DialogProvider>
        <Dialog>
          <DialogTrigger>
            <div className="flex h-full items-center justify-center rounded-lg border p-2">
              <Plus />
            </div>
          </DialogTrigger>
          <DialogContent>
            <AddNewPool dropId={drop.id} />
          </DialogContent>
        </Dialog>
      </DialogProvider>
      {!!pools.length &&
        pools.map((pool) => <PoolCard key={pool.id} pool={pool} />)}
    </div>
  );
}
