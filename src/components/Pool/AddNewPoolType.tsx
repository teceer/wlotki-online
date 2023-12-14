"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { H2 } from "../global/Typography";
import ColorPicker from "../elements/ColorPicker";

const formSchema = z.object({
  name: z.string().min(2).max(30),
  color: z.string().optional(),
  description: z.string().optional(),
});

export default function AddNewPoolType() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="rounded-xl border bg-background p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <H2>Dodaj nową pulę biletową</H2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa puli biletowej</FormLabel>
                <FormControl>
                  <Input placeholder="Bilet normalny" {...field} />
                </FormControl>
                <FormDescription>
                  Ta nazwa będzie widoczna dla kupujących.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ColorPicker />
          <div className="flex justify-between">
            <Button type="button" variant="outline">
              Anuluj
            </Button>
            <Button type="submit">Zapisz</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
