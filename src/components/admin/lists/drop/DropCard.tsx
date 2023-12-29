import type { Drop, Pool } from "@prisma/client";
import { Clock, Plus } from "lucide-react";
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

export default function DropCard({ drop }: { drop: Drop }) {
  return (
    <div className="space-y-4 rounded-xl border bg-background p-4">
      <div className="flex items-center justify-between gap-2 font-mono text-xs leading-none">
        <DateString date={drop.startDateTime} format="P HH:mm" />
        <div className="h-[1px] grow bg-muted-foreground/70" />
        {drop.endDateTime && (
          <DateString date={drop.endDateTime} format="P HH:mm" />
        )}
      </div>
      {drop.name && <p className="text-foreground">{drop.name}</p>}
      <PoolSection drop={drop} />
    </div>
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
