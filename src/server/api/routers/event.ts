import { EventStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

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

  productPage: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const data = ctx.db.event.findFirst({
      where: {
        id: input,
      },
    });
    return data;
  }),

  findById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const data = ctx.db.event.findFirst({
      where: {
        id: input,
      },
    });
    return data;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string({ required_error: "Wymagane" }).optional(),
        title: z
          .string({ required_error: "Wymagane" })
          .min(2, {
            message: "Nazwa wydarzenia musi mieć co najmniej 2 znaki.",
          })
          .optional(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          status: input.status as EventStatus,
        },
      });

      await ctx.db.log.create({
        data: {
          action: "update Event",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
          eventId: input.id,
        },
      });

      return data;
    }),
});
