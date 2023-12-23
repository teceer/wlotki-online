import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";
import { CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { PanelLeftInactive, Plus } from "lucide-react";

export default async function DropTable({ eventId }: { eventId: string }) {
  const data = await api.drop.getByEventId.query(eventId);

  return (
    <div className="space-y-4 rounded-xl border bg-background/70 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <CardTitle>Dropy</CardTitle>
      </div>
      <DataTable columns={columns} data={data} eventId={eventId} />
    </div>
  );
}

export function DropTableSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border bg-background/70 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <CardTitle>Dropy</CardTitle>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Input placeholder="Szukaj..." className="max-w-sm" disabled />
        <Button variant="outline" className="ml-auto" disabled>
          <PanelLeftInactive />
        </Button>
        <Button variant="gradient" disabled>
          <Plus />
        </Button>
      </div>
      <div className="animate-pulse divide-y divide-foreground/20 overflow-hidden rounded-md border border-foreground/20 bg-gradient-to-tr from-secondary/30">
        <div className="h-9 w-full" />
        <div className="h-11 w-full" />
        <div className="h-11 w-full" />
        <div className="h-11 w-full" />
      </div>
    </div>
  );
}

//TODO: TRPC Having problems on the production server with this component
