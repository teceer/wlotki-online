"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ArrowLeft, ArrowRight, PanelLeftInactive, Plus } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogProvider,
  DialogTrigger,
} from "~/components/ui/dialog";
import DeleteTicketPoolsButton from "./DeleteTicketPoolsButton";
import { type Pool, type TicketType } from "@prisma/client";
import AddNewPool from "~/components/Pool/AddNewPool";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dropId: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  dropId,
}: DataTableProps<TData, TValue>) {
  const [mutationData, setMutationData] = React.useState<
    (Pool & { TicketType: TicketType | null })[]
  >([]);
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ id: false });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setMutationData(
      data as unknown as (Pool & { TicketType: TicketType | null })[],
    );
  }, [data]);

  const table = useReactTable({
    data: isClient ? (mutationData as unknown as TData[]) : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  const filteredSelected = table.getFilteredSelectedRowModel();

  useEffect(() => {
    setSelectedIds(filteredSelected.rows.map((row) => row.getValue("id")));
  }, [filteredSelected, rowSelection]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Input
          placeholder="Szukaj..."
          value={table.getColumn("name")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <PanelLeftInactive />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef?.header?.toString()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogProvider>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="autofocus-0 w-[90vw] rounded-xl border">
              <AddNewPool dropId={dropId} />
            </DialogContent>
          </Dialog>
        </DialogProvider>
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  Brak pul biletowych.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!!selectedIds.length && (
        <DeleteTicketPoolsButton idArray={selectedIds}>
          <Button variant="destructive">Usuń ({selectedIds.length})</Button>
        </DeleteTicketPoolsButton>
      )}
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Wybrano {table.getFilteredSelectedRowModel().rows.length} z{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
