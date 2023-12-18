"use client";
import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
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
import { toast } from "react-toastify";
import revalidatePath from "~/lib/revalidatePath";

const formSchema = z.object({
  name: z.string().min(2).max(30),
  color: z.string().optional(),
  description: z.string().optional(),
});

export default function AddNewTicketType() {
  const { mutateAsync } = api.ticketType.create.useMutation();
  const { setOpen } = useContext(DialogContext);
  // const [color, setColor] = useState<{
  //   displayColorPicker: boolean;
  //   color: RGBColor;
  // }>({
  //   displayColorPicker: false,
  //   color: {
  //     r: 0,
  //     g: 0,
  //     b: 0,
  //     a: 0,
  //   },
  // });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    await toast.promise(
      mutateAsync(values),
      {
        pending: "Dodawanie...",
        success: "Dodano!",
        error: "Coś poszło nie tak",
      },
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      },
    );
    return revalidatePath(window.location.pathname);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardTitle>Dodaj nowy typ biletów</CardTitle>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis (opcjonalnie)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ten bilet uprawnia do ..."
                  className="_resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ten opis będzie widoczny dla kupujących.
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
