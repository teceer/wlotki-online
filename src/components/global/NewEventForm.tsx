/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// Create a generic form component that takes a schema and a submit callback
import autoAnimate from "@formkit/auto-animate";
import {
  type DefaultValues,
  type Path,
  useForm,
  type PathValue,
} from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
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
import * as z from "zod";
import {
  type HTMLInputTypeAttribute,
  useState,
  useRef,
  useEffect,
} from "react";
import { Textarea } from "../ui/textarea";
import { UploadButton, UploadDropzone } from "~/lib/uploadthing";
import Image from "next/image";
import { cn } from "~/lib/utils";

type FieldConfig<T extends z.ZodType<any, any, any>> = {
  [key in keyof z.infer<T>]: {
    displayName: string;
    placeholder: string;
    description?: string;
    type?: HTMLInputTypeAttribute | "textarea" | "custom";
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

export function NewEventForm<T extends z.ZodType<any, any, any>>({
  schema,
  onSubmit,
  loading,
  fieldConfig = {} as FieldConfig<T>,
  defaultValues = {} as DefaultValues<z.infer<T>>,
  submitButtonText = "Zatwierdź",
}: {
  schema: T;
  onSubmit: (values: z.infer<T>) => void;
  loading?: boolean;
  fieldConfig?: FieldConfig<T>;
  defaultValues?: DefaultValues<z.infer<T>>;
  submitButtonText?: string;
}) {
  const parent = useRef(null);
  const form = useForm<z.infer<T>>({
    resolver: zodResolver({ ...schema, image: z.string().optional() }),
    defaultValues,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const shape = (schema as unknown as z.ZodObject<any, any, any>).shape; // Access the shape property

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
        {Object.keys(shape).map((fieldName) => {
          if (fieldConfig[fieldName]?.type === "image")
            return (
              <div key={fieldName}>
                <FormField
                  control={form.control}
                  name={fieldName as Path<z.TypeOf<T>>}
                  render={({ field }) => (
                    <FormItem ref={parent}>
                      <FormLabel className="leading-none">
                        {fieldConfig[fieldName]?.displayName}
                      </FormLabel>
                      <FormMessage />
                      <div className="hidden w-full flex-col space-y-1">
                        <FormControl>
                          <Input {...field} value={imageUrl ?? ""} />
                        </FormControl>
                      </div>
                      {!imageUrl && (
                        <div className="flex flex-col space-y-2">
                          <UploadDropzone
                            config={{
                              mode: "auto",
                            }}
                            content={{
                              label: fieldConfig[fieldName]?.placeholder,
                              button({ ready, isUploading, uploadProgress }) {
                                if (isUploading) return <div>Wysyłanie...</div>;
                                if (uploadProgress)
                                  return <div>Wysyłanie...</div>;
                                if (ready) return <div>Wyślij zdjęcie</div>;

                                return "Ładowanie...";
                              },
                            }}
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              if (res && res.length > 0 && res[0]?.url) {
                                setImageUrl(res[0]?.url);
                                form.setValue(
                                  fieldName as Path<z.TypeOf<T>>,
                                  res[0]?.url as PathValue<z.TypeOf<T>, any>,
                                );
                              }
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        </div>
                      )}
                      {imageUrl && (
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-col space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2 ">
                              <EventCardPlaceholder
                                imageUrl={imageUrl}
                                isVertical
                              />
                              <EventCardPlaceholder imageUrl={imageUrl} />
                            </div>
                            <UploadButton
                              content={{
                                button({ ready }) {
                                  if (ready) return <div>Zmień zdjęcie</div>;
                                  return "Ładowanie...";
                                },
                              }}
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log("Files: ", res);
                                if (res && res.length > 0 && res[0]?.url) {
                                  setImageUrl(res[0]?.url);
                                  form.setValue(
                                    fieldName as Path<z.TypeOf<T>>,
                                    res[0]?.url as PathValue<z.TypeOf<T>, any>,
                                  );
                                }
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            );
          return (
            <div key={fieldName}>
              <FormField
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
            </div>
          );
        })}
        <div className="text-right">
          <Button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden"
          >
            {loading && (
              <div className=" absolute flex h-full w-full items-center justify-center bg-foreground">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="1rem"
                  visible={true}
                />
              </div>
            )}
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function EventCardPlaceholder({
  isVertical,
  imageUrl,
}: {
  isVertical?: boolean;
  imageUrl: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border shadow-lg",
        isVertical && "row-span-2",
      )}
    >
      <div className="grow border-b bg-background">
        <div
          className={cn(
            "flex gap-2",
            isVertical && "h-full min-h-[280px] flex-col-reverse gap-0",
          )}
        >
          <div className="grow space-y-2 p-4">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="leading-none opacity-70">
                  <div className="h-3 w-16 rounded bg-foreground/20" />
                </div>
              </div>
              <div className="h-4 w-28 rounded bg-foreground/20" />
              <div className="h-3 w-20 rounded bg-foreground/20 opacity-70" />
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="h-4 w-8 rounded-full border" />
              <div className="h-4 w-8 rounded-full border" />
            </div>
          </div>
          <div
            className={cn(
              "relative w-1/4 shrink-0 grow",
              isVertical && "h-full w-full shrink",
            )}
          >
            {!isLoaded && (
              <div className="absolute h-full w-full animate-pulse bg-gradient-to-tr from-foreground/20 to-transparent" />
            )}
            <Image
              src={imageUrl}
              fill
              className="object-cover"
              alt=""
              priority
              onLoadingComplete={() => setIsLoaded(true)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end bg-muted">
        <div className="w-full px-4 ">
          <div className="py-2 text-xs opacity-30">
            <div className="h-2 w-16 rounded bg-foreground/20" />
          </div>
          <div className="h-2 w-full rounded bg-foreground/20" />
        </div>
        <Button
          className="shrink-0 rounded-none"
          size="lg"
          variant="secondary"
          type="button"
        >
          Kup wlotkę {"->"}
        </Button>
      </div>
    </div>
  );
}
