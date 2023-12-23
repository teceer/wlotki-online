"use client";
import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import PoolAdder from "./PoolAdder";
import { Button } from "../ui/button";
import { DialogClose, DialogContext } from "../ui/dialog";
import { api } from "~/trpc/react";
import revalidatePath from "~/lib/revalidatePath";
import { toast } from "sonner";

export const formSchema = z.object({
  // allow the pool array to be empty
  pools: z.array(
    z.object({
      price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/)
        .optional(), // optional price field in 0.00 format
      time: z.string().optional(),
      typeId: z.string().optional(),
    }),
  ),
});

export default function AddNewPool() {
  const { mutateAsync } = api.ticketPool.createMany.useMutation();
  const { setOpen } = useContext(DialogContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    const data = values.pools
      .map((pool) => {
        if (pool.price && pool.typeId) {
          return {
            price: (+pool.price * 100).toString(),
            time: pool.time,
            typeId: pool.typeId,
          };
        }
      })
      .filter((pool) => pool?.price && pool?.typeId);
    toast.promise(mutateAsync(data), {
      loading: "Dodawanie...",
      success: "Dodano!",
      error: "Coś poszło nie tak",
    });
    return revalidatePath(window.location.pathname);
  }

  const poolsArray = form
    .watch("pools")
    ?.filter((pool) => pool.price ?? pool.time);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardTitle>Dodaj pule biletowe</CardTitle>
        <div className="space-y-2">
          <PoolAdder isFirst index={0} key={0} form={form} />
          {!!poolsArray?.length &&
            poolsArray.map((_, i) => (
              <PoolAdder key={i + 1} index={i + 1} form={form} />
            ))}
        </div>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Anuluj
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={
              form.watch("pools")?.filter((pool) => pool.price && pool.typeId)
                .length === 0
            }
          >
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
}
