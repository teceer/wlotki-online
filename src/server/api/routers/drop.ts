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

  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        name: z.string().optional(),
        startDateTime: z.string(),
        endDateTime: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.drop.create({
        data: {
          ...input,
          startDateTime: new Date(input.startDateTime),
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
});
