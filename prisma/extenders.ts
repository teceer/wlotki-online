import type { Drop } from "@prisma/client";

//LINK - https://www.prisma.io/docs/orm/prisma-client/client-extensions/result#add-a-custom-field-to-query-results

export const dropExtender = {
  result: {
    drop: {
      status: {
        needs: { startDateTime: true, endDateTime: true },
        compute(drop: Drop) {
          // return status UPCOMING, ACTIVE, ENDED based on startDateTime and endDateTime
          const now = new Date();
          if (drop.startDateTime! > now) return "UPCOMING";
          if (drop.startDateTime! <= now && !drop.endDateTime) return "ACTIVE";
          if (drop.startDateTime! <= now && drop.endDateTime! >= now)
            return "ACTIVE";
          if (drop.endDateTime! < now) return "ENDED";
          return "ACTIVE";
        },
      },
    },
  },
};
