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
import { type formSchema } from "./AddNewPool";

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
    !form.watch(`pools.${index}.type`);

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
        name={`pools.${index}.type`}
        render={({ field }) => (
          <FormItem>
            {isFirst && (
              <FormLabel className="text-xs opacity-70">
                Typ wejściówek
              </FormLabel>
            )}
            <FormControl>
              <Input
                type="text"
                required={!isEmpty}
                {...field}
                className="rounded-none border-0 border-b focus-visible:border-foreground focus-visible:ring-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
