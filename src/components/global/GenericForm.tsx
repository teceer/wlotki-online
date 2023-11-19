/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// Create a generic form component that takes a schema and a submit callback
import { type DefaultValues, type Path, useForm } from "react-hook-form";
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
import type * as z from "zod";
import { type HTMLInputTypeAttribute, useState } from "react";
import { Textarea } from "../ui/textarea";

type FieldConfig<T extends z.ZodType<any, any, any>> = {
  [key in keyof z.infer<T>]: {
    displayName: string;
    placeholder: string;
    description?: string;
    type?: HTMLInputTypeAttribute | "textarea";
    inputMode?:
      | "email"
      | "search"
      | "tel"
      | "text"
      | "url"
      | "none"
      | "numeric"
      | "decimal";
  };
};

export function GenericForm<T extends z.ZodType<any, any, any>>({
  children,
  schema,
  onSubmit,
  fieldConfig = {} as FieldConfig<T>,
  defaultValues = {} as DefaultValues<z.infer<T>>,
  submitButtonText = "Zatwierdź",
}: {
  children?: React.ReactNode;
  schema: T;
  onSubmit: (values: z.infer<T>) => void;
  fieldConfig?: FieldConfig<T>;
  defaultValues?: DefaultValues<z.infer<T>>;
  submitButtonText?: string;
}) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const shape = (schema as unknown as z.ZodObject<any, any, any>).shape; // Access the shape property

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
        {Object.keys(shape).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as Path<z.TypeOf<T>>}
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full flex-col space-y-1">
                  <FormLabel className="leading-none">
                    {fieldConfig[fieldName]?.displayName}
                  </FormLabel>
                  <FormControl>
                    {fieldConfig[fieldName]?.type === "textarea" ? (
                      <Textarea
                        placeholder={fieldConfig[fieldName]?.placeholder}
                        {...field}
                      />
                    ) : (
                      <Input
                        placeholder={fieldConfig[fieldName]?.placeholder}
                        {...field}
                        type={fieldConfig[fieldName]?.type}
                        inputMode={fieldConfig[fieldName]?.inputMode}
                      />
                    )}
                  </FormControl>
                  <FormDescription>
                    {fieldConfig[fieldName]?.description}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        ))}
        <div className="text-right">
          <Button type="submit">{submitButtonText}</Button>
        </div>
      </form>
    </Form>
  );
}
