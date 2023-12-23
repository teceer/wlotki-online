"use client";

import type { Drop } from "@prisma/client";
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
import DeleteTicketPoolsButton from "./DeleteDropsButton";
import DateString from "~/components/global/DateString";
import price from "~/components/global/price";
import DeleteDropsButton from "./DeleteDropsButton";

export const columns: ColumnDef<Drop>[] = [
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
    header: "Nazwa",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-full grow items-center">
          <span className="font-medium">
            {data.name ?? <div className="h-[1px] w-8 bg-foreground/30" />}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDateTime",
    header: "Rozpoczęcie",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-full grow items-center">
          <span className="font-medium">
            {data.startDateTime ? (
              <DateString date={data.startDateTime} format="P H:m" />
            ) : (
              <div className="h-[1px] w-8 bg-foreground/30" />
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endDateTime",
    header: "Zakończenie",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-full grow items-center">
          <span className="font-medium">
            {data.endDateTime ? (
              <DateString date={data.endDateTime} format="P H:m" />
            ) : (
              <div className="h-[1px] w-8 bg-foreground/30" />
            )}
          </span>
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
              <DropdownMenuItem>Edytuj drop</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <DeleteDropsButton idArray={[data.id]}>
                  Usuń drop
                </DeleteDropsButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
