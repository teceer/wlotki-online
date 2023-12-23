import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "~/server/api/routers/event";
import { ticketTypeRouter } from "~/server/api/routers/ticketType";
import { ticketPoolRouter } from "./routers/ticketPool";
import { dropRouter } from "./routers/drop";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  event: eventRouter,
  ticketType: ticketTypeRouter,
  ticketPool: ticketPoolRouter,
  drop: dropRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
