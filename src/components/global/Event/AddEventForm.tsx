"use client";
import * as z from "zod";
import { NewEventForm } from "../NewEventForm";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "react-toastify";

const eventSchema = z.object({
  image: z.string({ required_error: "Wymagane" }),
  title: z.string({ required_error: "Wymagane" }).min(2, {
    message: "Nazwa wydarzenia musi mieć co najmniej 2 znaki.",
  }),
  subtitle: z.string().optional(),
  startDateTime: z.string({ required_error: "Wymagane" }),
  endDateTime: z.string({ required_error: "Wymagane" }),
  description: z.string().optional(),
});

const fieldConfig = {
  image: {
    displayName: "Zdjęcie wydarzenia",
    placeholder: "Dodaj zdjęcie wydarzenia",
    type: "image",
  },
  title: {
    displayName: "Nazwa wydarzenia",
    placeholder: "Wprowadź nazwę wydarzenia",
    description: "Nazwa wydarzenia powinna być krótka i zwięzła.",
  },
  subtitle: {
    displayName: "Podtytuł wydarzenia (opcjonalnie)",
    placeholder: "Wprowadź podtytuł wydarzenia",
    description:
      "Jeżeli tytuł wydarzenia jest zbyt długi, możesz przenieść część informacji do podtytułu.",
  },
  startDateTime: {
    displayName: "Data rozpoczęcia",
    placeholder: "Wybierz datę rozpoczęcia",
    description: "Data rozpoczęcia wydarzenia.",
    type: "datetime-local",
  },
  endDateTime: {
    displayName: "Data zakończenia",
    placeholder: "Wybierz datę zakończenia",
    description: "Data zakończenia wydarzenia.",
    type: "datetime-local",
  },
  description: {
    displayName: "Opis wydarzenia (opcjonalnie)",
    placeholder: "Wprowadź opis wydarzenia",
    type: "textarea",
  },
};

export default function AddEventForm() {
  const router = useRouter();

  const eventAction = api.event.create.useMutation({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: z.infer<typeof eventSchema>) => {
    const eventData = {
      title: values.title,
      subtitle: values.subtitle,
      startDateTime: new Date(values.startDateTime),
      endDateTime: new Date(values.endDateTime),
      description: values.description,
      image: values.image,
    };
    toast
      .promise(
        eventAction.mutateAsync(eventData),
        {
          pending: "Dodawanie wydarzenia...",
          success: "Wydarzenie dodane!",
          error: "Nie udało się dodać wydarzenia.",
        },
        { autoClose: 2000 },
      )
      .then((data) => {
        router.push("/event/" + data.id + "/edit");
      })
      .catch(() => {
        toast.error(eventAction.error?.message);
      });
  };

  return (
    <NewEventForm
      schema={eventSchema}
      onSubmit={onSubmit}
      loading={eventAction.isLoading}
      defaultValues={
        {
          // image:
          //   "https://utfs.io/f/54fe5eea-739a-4dc2-a625-eb1fb3dc699b-8mzy81.png",
          // title: "Test",
          // subtitle: "Test",
          // startDateTime: "2021-10-20T10:00",
          // endDateTime: "2021-10-20T12:00",
          // description: "Test",
        }
      }
      fieldConfig={fieldConfig}
      submitButtonText="Przejdź dalej ->"
    />
  );
}
