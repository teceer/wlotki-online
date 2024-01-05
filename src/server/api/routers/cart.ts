import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        poolId: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.cart.upsert({
        create: {
          id: input.cartId,
          userId: ctx.session?.user.id,
          items: {
            create: {
              poolId: input.poolId,
              quantity: input.quantity,
            },
          },
        },
        update: {
          items: {
            upsert: {
              where: {
                cartId_poolId: {
                  cartId: input.cartId,
                  poolId: input.poolId,
                },
              },
              create: {
                poolId: input.poolId,
                quantity: input.quantity,
              },
              update: {
                quantity: {
                  increment: input.quantity,
                },
              },
            },
          },
        },
        where: {
          id: input.cartId,
        },
        include: {
          items: {
            include: {
              Pool: {
                include: {
                  TicketType: true,
                },
              },
            },
          },
        },
      });
    }),

  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    if (!input) {
      return null;
    }
    const cart = ctx.db.cart.findFirst({
      orderBy: { createdAt: "desc" },
      where: { OR: [{ id: input }, { userId: ctx.session?.user.id }] },
      include: {
        items: {
          include: {
            Pool: {
              include: {
                TicketType: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return cart;
  }),
});
