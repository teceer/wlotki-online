import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dropRouter = createTRPCRouter({
  getByEventId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.drop.findMany({
      where: {
        eventId: input,
      },
      orderBy: [
        {
          startDateTime: "asc",
        },
        {
          endDateTime: "asc",
        },
      ],
    });
  }),

  buyTickets: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.drop.findMany({
      where: {
        eventId: input,
      },
      orderBy: [
        {
          startDateTime: "asc",
        },
        {
          endDateTime: "asc",
        },
      ],
      include: {
        Pool: {
          include: { TicketType: true, Drop: { include: { Event: true } } },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        name: z.string().optional(),
        startDateTime: z.string().optional(),
        endDateTime: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.drop.create({
        data: {
          ...input,
          startDateTime: input.startDateTime
            ? new Date(input.startDateTime)
            : null,
          endDateTime: input.endDateTime ? new Date(input.endDateTime) : null,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.drop.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      await ctx.db.log.create({
        data: {
          action: "delete Drops",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
        },
      });

      return input;
    }),

  isLimited: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const pools = await ctx.db.pool.findMany({
        where: {
          dropId: input,
          totalTickets: {
            gt: 0,
          },
        },
      });

      return pools.length > 0;
    }),
});
