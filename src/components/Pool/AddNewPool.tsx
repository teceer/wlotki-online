"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import PoolAdder from "./PoolAdder";

export const formSchema = z.object({
  pools: z.array(
    z.object({
      price: z.number(),
      time: z.string(),
      type: z.string(),
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
    ?.filter((pool) => pool.price || pool.time || pool.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dodaj pule biletowe</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <PoolAdder isFirst index={0} key={0} form={form} />
            {!!poolsArray?.length &&
              poolsArray.map((_, i) => (
                <PoolAdder key={i + 1} index={i + 1} form={form} />
              ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
