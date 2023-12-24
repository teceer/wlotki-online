import { PrismaClient } from "@prisma/client";
import { dropExtender } from "prisma/extenders";

import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient; // | undefined
};

export const db =
  globalForPrisma.prisma.$extends(dropExtender) ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends(dropExtender);

if (env.NODE_ENV !== "production")
  globalForPrisma.prisma = db as unknown as PrismaClient;
