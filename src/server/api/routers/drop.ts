import { z } from "zod";
import { env } from "~/env.mjs";

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
});
