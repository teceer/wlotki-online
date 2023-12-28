"use client";
import React, { useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
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
import type { Event } from "@prisma/client";
import { DialogClose, DialogContext } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { RadioGroup } from "~/components/ui/radio-group";
import type { ClassNameValue } from "tailwind-merge";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import revalidatePath from "~/lib/revalidatePath";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  status: z.string(),
});

export default function EventSettingsForm({
  event,
  isDialog,
}: {
  event: Event;
  isDialog?: boolean;
}) {
  const { setOpen } = useContext(DialogContext);
  const { mutateAsync } = api.event.update.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      status: event.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    isDialog && setOpen(false);
    toast.promise(
      mutateAsync({
        id: event.id,
        ...values,
      }),
      {
        loading: "Zapisywanie...",
        success: "Zapisano!",
        error: "Coś poszło nie tak",
      },
    );
    return await revalidatePath(window.location.pathname);
  }

  function RadioGroupItem({
    value,
    text,
    field,
    className,
  }: {
    value: string;
    text: string;
    field: ControllerRenderProps<z.infer<typeof formSchema>, "status">;
    className?: ClassNameValue;
  }) {
    return (
      <RadioGroupPrimitive.Item value={value}>
        <div
          className={cn(
            "rounded-lg border p-2 text-sm",
            field.value === value && "ring ring-blue-500",
            className,
          )}
        >
          {text}
        </div>
      </RadioGroupPrimitive.Item>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa wydarzenia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Nazwa widoczna jest na stronie wydarzenia, biletach oraz na
                materiałach informacyjnych i promocyjnych.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status wydarzenia</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="DRAFT"
                        field={field}
                        text="Szkic"
                        className="ring-neutral-500"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="PUBLISHED"
                        field={field}
                        text="Opublikowany"
                        className="ring-green-500"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="HIDDEN"
                        field={field}
                        text="Zarchiwizowany"
                        className="ring-red-500"
                      />
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={cn("flex justify-end", isDialog && "justify-between")}>
          {isDialog && (
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Anuluj
              </Button>
            </DialogClose>
          )}
          <Button type="submit">Zapisz</Button>
        </div>
      </form>
    </Form>
  );
}
