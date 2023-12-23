import { PrismaClient } from "@prisma/client";
import { dropExtender } from "prisma/extenders";

import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient; // | undefined
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends(dropExtender);

const drop = await db.drop.findFirst({ select: { status: true } });
console.log(drop?.status);

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
