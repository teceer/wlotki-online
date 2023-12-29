import { Pool } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const poolRouter = createTRPCRouter({
  getByDropId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.pool.findMany({
      where: {
        dropId: input,
      },
      include: {
        TicketType: true,
        _count: {
          select: { Ticket: true },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dropId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        price: z.number(),
        time: z.date().optional(),
        totalTickets: z.number().optional(),
        ticketTypeId: z.string().optional(),
      }) as z.ZodSchema<Pool>,
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.pool.create({
        data: {
          ...input,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.pool.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      await ctx.db.log.create({
        data: {
          action: "delete pools",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
        },
      });

      return input;
    }),
});
