/* eslint-disable @typescript-eslint/require-await */
export const dynamic = "force-dynamic";
import type { NextRequest } from "next/server";
import requestIp, { type Request } from "request-ip";

export function GET(req: NextRequest) {
  try {
    // const detectedIp = requestIp.getClientIp(req);
    const detectedIp = req.headers.get("x-forwarded-for");
    if (!detectedIp) return Response.json({ error: "No IP detected" });
    const ip = detectedIp.replace("::ffff:", "");
    if (ip.includes("::")) return Response.json({ error: "Invalid IP" });
    return Response.json({ ip });
  } catch (error) {
    return Response.json({ error });
  }
}

// export function GET(req: Request) {
//   try {
//     // const detectedIp = requestIp.getClientIp(req);
//     const detectedIp = requestIp.getClientIp(req);
//     if (!detectedIp) return Response.json({ error: "No IP detected" });
//     const ip = detectedIp.replace("::ffff:", "");
//     if (ip.includes("::")) return Response.json({ error: "Invalid IP" });
//     return Response.json({ ip });
//   } catch (error) {
//     return Response.json({ error });
//   }
// }
