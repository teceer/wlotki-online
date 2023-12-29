import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ticketPoolRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createMany: protectedProcedure
    .input(
      z.array(
        z
          .object({
            price: z.string().min(1),
            time: z.string().optional(),
            name: z.string().optional(),
            typeId: z.string().min(1),
            dropId: z.string().min(1),
          })
          .optional(),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const data = input.map((pool) => {
        if (pool?.price && pool?.typeId && (pool?.time ?? pool?.name)) {
          const newData = {
            price: +pool.price,
            time: pool.time
              ? new Date(
                  new Date(`2000-01-01T${pool.time}:00.000Z`).setHours(
                    new Date(`2000-01-01T${pool.time}:00.000Z`).getHours() -
                      +env.TZ_OFFSET,
                  ),
                )
              : null,
            name: pool.name ? pool.name : null,
            typeId: pool.typeId,
            dropId: pool.dropId,
          };
          console.log(newData);
          return newData;
        }
        throw new Error("Invalid input");
      });
      const ticketPool = await ctx.db.pool.createMany({
        data: data.map((pool) => ({
          price: pool.price,
          time: pool.time,
          name: pool.name,
          ticketTypeId: pool.typeId,
          dropId: pool.dropId,
        })),
      });

      await ctx.db.log.create({
        data: {
          action: "create TicketPools",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
        },
      });

      return ticketPool;
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
    const ticketPools = ctx.db.pool.findMany({ include: { TicketType: true } });
    console.log(ticketPools);
    return ticketPools;
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
          action: "delete TicketPools",
          userId: ctx.session.user.id,
          data: JSON.stringify(input),
        },
      });

      return input;
    }),
});
