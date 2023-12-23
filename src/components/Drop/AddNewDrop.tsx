"use client";
import React, { useContext } from "react";
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
// import ColorPicker from "../elements/ColorPicker";
// import type { RGBColor } from "react-color";
import { CardTitle } from "../ui/card";
import { DialogClose, DialogContext } from "../ui/dialog";
import { api } from "~/trpc/react";
import revalidatePath from "~/lib/revalidatePath";
import { toast } from "sonner";

const formSchema = z.object({
  eventId: z.string(),
  startDateTime: z.string(),
  endDateTime: z.string().optional(),
  name: z.string().optional(),
});

export default function AddNewDrop({ eventId }: { eventId: string }) {
  const { mutateAsync } = api.drop.create.useMutation();
  const { setOpen } = useContext(DialogContext);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { eventId },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    toast.promise(mutateAsync(values), {
      loading: "Dodawanie...",
      success: "Dodano!",
      error: "Coś poszło nie tak",
    });
    return revalidatePath(window.location.pathname);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardTitle>Dodaj nowy drop biletów</CardTitle>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa (opcjonalnie)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Ta nazwa będzie widoczna dla kupujących.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rozpoczęcie</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                Data i godzina rozpoczęcia dropu.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zakończenie (opcjonalnie)</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                Data i godzina zakończenia dropu.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kolor</FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      {...field}
                      value={`rgba(${color.color.r}, ${color.color.g}, ${color.color.b}, ${color.color.a})`}
                    />
                  </FormControl>
                  <ColorPicker state={color} setState={setColor} />
                  <FormMessage />
                </FormItem>
              )}
            /> */}
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Anuluj
            </Button>
          </DialogClose>
          <Button type="submit">Zapisz</Button>
        </div>
      </form>
    </Form>
  );
}
