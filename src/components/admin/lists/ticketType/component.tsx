import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";
import { H2 } from "~/components/global/Typography";

export default async function TicketTypeTable() {
  const data = await api.ticketType.getAll.query();

  return (
    <div className="space-y-4 rounded-xl border p-4 backdrop-blur bg-background/70">
      <div className="flex items-center justify-between">
        <H2>Typy biletów</H2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

//TODO: TRPC Having problems on the production server with this component
