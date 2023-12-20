import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ticketTypeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        description: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ticketType = await ctx.db.ticketType.create({
        data: {
          name: input.name,
          description: input.description,
          color: input.color,
        },
      });

      await ctx.db.log.create({
        data: {
          action: "create TicketType",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
          ticketTypeId: ticketType.id,
        },
      });

      return ticketType;
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const ticketTypes = ctx.db.ticketType.findMany();
    console.log(ticketTypes);
    return ticketTypes;
  }),

  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.ticketType.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      await ctx.db.log.create({
        data: {
          action: "delete TicketType",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
        },
      });

      return input;
    }),
});
