"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import PoolAdder from "./PoolAdder";
import { Button } from "../ui/button";

export const formSchema = z.object({
  // allow the pool array to be empty
  pools: z.array(
    z.object({
      price: z.string().optional(),
      time: z.string().optional(),
      type: z.string().optional(),
    }),
  ),
});

export default function AddNewPool() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const poolsArray = form
    .watch("pools")
    ?.filter((pool) => pool.price ?? pool.time ?? pool.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dodaj pule biletowe</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {JSON.stringify(form.watch(), null, 2)}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <PoolAdder isFirst index={0} key={0} form={form} />
              {!!poolsArray?.length &&
                poolsArray.map((_, i) => (
                  <PoolAdder key={i + 1} index={i + 1} form={form} />
                ))}
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline">
                Anuluj
              </Button>
              <Button type="submit">Zapisz</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
