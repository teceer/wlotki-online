import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        image: z.string({ required_error: "Wymagane" }),
        title: z.string({ required_error: "Wymagane" }).min(2, {
          message: "Nazwa wydarzenia musi mieć co najmniej 2 znaki.",
        }),
        subtitle: z.string().optional(),
        startDateTime: z.date({ required_error: "Wymagane" }),
        endDateTime: z.date({ required_error: "Wymagane" }),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          title: input.title,
          subtitle: input.subtitle,
          image: input.image,
          startDateTime: input.startDateTime,
          endDateTime: input.endDateTime,
          description: input.description,
        },
      });
    }),

  findById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const events = ctx.db.event.findUnique({
      where: {
        id: input,
      },
    });
    console.log(events);
    return events;
  }),
});
