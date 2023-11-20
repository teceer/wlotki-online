import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import Topbar from "~/components/global/Topbar/Topbar";
import DotsTexture from "~/components/global/DotsTexture";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ToastContainer } from "react-toastify";
import { getServerAuthSession } from "~/server/auth";
import AuthButton from "~/components/global/Auth/AuthButton";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "System biletowy dla wydarzeń",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body className="dark:dark relative">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <TRPCReactProvider cookies={cookies().toString()}>
          <DotsTexture />
          <Topbar
            className="absolute"
            authComponent={
              <Suspense
                fallback={
                  <Button className="animate-pulse" disabled>
                    Zaloguj się
                  </Button>
                }
              >
                <AuthButton />
              </Suspense>
            }
          />
          <main className="animate-slide-in flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-t from-neutral-300 transition-all duration-500 ease-in-out dark:from-black">
            <Topbar invisible />
            <div className="w-full grow transition-all ease-in-out ">
              {children}
            </div>
          </main>
          <ToastContainer
            toastClassName="font-sans"
            className={`${GeistSans.className} font-sans dark:invisible`}
            theme="light"
          />
          <ToastContainer
            toastClassName="font-sans"
            className={`${GeistSans.className} invisible font-sans dark:visible`}
            theme="dark"
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
