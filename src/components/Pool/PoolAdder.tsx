"use client";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import type * as z from "zod";
import { type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type formSchema } from "./AddNewPool";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";

export default function PoolAdder({
  index,
  isFirst,
  form,
}: {
  index: number;
  isFirst?: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}) {
  const isEmpty =
    !isFirst &&
    !form.watch(`pools.${index}.price`) &&
    !form.watch(`pools.${index}.time`) &&
    !form.watch(`pools.${index}.typeId`);

  const { data, isLoading } = api.ticketType.getAll.useQuery();

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-1",
        !isFirst && isEmpty && "opacity-30",
      )}
    >
      <FormField
        control={form.control}
        name={`pools.${index}.price`}
        render={({ field }) => (
          <FormItem>
            {isFirst && (
              <FormLabel className="text-xs opacity-70">Cena</FormLabel>
            )}
            <FormControl>
              <Input
                type="number"
                inputMode="decimal"
                required={!isEmpty}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  console.log(form.getValues());
                }}
                className="rounded-none border-0 border-b focus-visible:border-foreground focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`pools.${index}.time`}
        render={({ field }) => (
          <FormItem>
            {isFirst && (
              <FormLabel className="text-xs opacity-70">Godzina</FormLabel>
            )}
            <FormControl>
              <Input
                type="time"
                required={!isEmpty}
                {...field}
                className="rounded-none border-0 border-b text-left focus-visible:border-foreground focus-visible:ring-0"
                defaultValue={
                  !isFirst &&
                  form.watch(`pools.0.time`) &&
                  form.watch(`pools.${index}.price`)
                    ? new Date(
                        new Date(
                          "2000-01-01T" +
                            form.watch(`pools.0.time`) +
                            ":00.000",
                        ).getTime() +
                          60 * 60 * 1000 * (index + 1),
                      )
                        .toISOString()
                        ?.split("T")[1]
                        ?.split(".")[0]
                        ?.slice(0, 5)
                    : undefined
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`pools.${index}.typeId`}
        render={({ field }) => (
          <FormItem>
            {isFirst && (
              <FormLabel className="text-xs opacity-70">
                Typ wejściówek
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={isLoading}
                    className={cn(
                      "w-full items-center justify-between overflow-hidden rounded-none border-0 border-b transition-all focus-visible:border-foreground focus-visible:ring-0",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {!isLoading && data
                      ? field.value
                        ? data.find((data) => data.id === field.value)?.name
                        : "Wybierz"
                      : "Wybierz"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Szukaj..." className="h-9" />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {!isLoading &&
                      data?.map((ticketType) => (
                        <CommandItem
                          value={ticketType.id}
                          key={ticketType.id}
                          onSelect={() => {
                            form.setValue(
                              `pools.${index}.typeId`,
                              ticketType.id,
                            );
                          }}
                        >
                          {ticketType.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              ticketType.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
