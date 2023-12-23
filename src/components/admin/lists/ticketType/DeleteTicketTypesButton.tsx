"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "~/components/ui/form";
import revalidatePath from "~/lib/revalidatePath";
import { api } from "~/trpc/react";

export default function DeleteTicketTypesButton({
  idArray,
  children,
}: {
  idArray: string[];
  children: React.ReactNode;
}) {
  const formSchema = z.object({
    ids: z.string(),
    path: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      path: window.location.pathname,
    },
  });

  useEffect(() => {
    form.setValue("ids", JSON.stringify(idArray));
  }, [idArray, form]);

  const { mutateAsync } = api.ticketType.deleteMany.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { ids, path } = values;
    // return console.log(JSON.parse(ids));
    toast.promise(mutateAsync(JSON.parse(ids) as string[]), {
      loading: "Dodawanie...",
      success: "Dodano!",
      error: "Coś poszło nie tak",
    });
    return await revalidatePath(path);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <button type="submit">{children}</button>
      </form>
    </Form>
  );
}
