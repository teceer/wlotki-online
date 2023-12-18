"use client";

import type { TicketType } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Checkbox } from "~/components/ui/checkbox";
import { Inter } from "~/components/global/Typography";
import DeleteTicketPoolsButton from "./DeleteTicketPoolsButton";

export const columns: ColumnDef<TicketType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex w-max shrink items-center px-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Wybierz wszystko"
          className="flex items-center justify-center"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-max shrink items-center px-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Wybierz wiersz"
          className="flex items-center justify-center"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex w-full items-center justify-between">
        <span className="font-medium">Nazwa</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-full grow items-center">
          <span className="font-medium">{data.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Otwórz menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <Inter>Opcje</Inter>
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Kopiuj ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edytuj typ biletu</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <DeleteTicketPoolsButton idArray={[data.id]}>
                  Usuń typ biletu
                </DeleteTicketPoolsButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
