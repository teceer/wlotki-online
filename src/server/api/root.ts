import { postRouter } from "./routers/post";
import { createTRPCRouter } from "./trpc";
import { eventRouter } from "./routers/event";
import { ticketTypeRouter } from "./routers/ticketType";
import { ticketPoolRouter } from "./routers/ticketPool";
import { dropRouter } from "./routers/drop";
import { poolRouter } from "./routers/pool";

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
  pool: poolRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
