"use client";
import { cn } from "~/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { type ClassNameValue } from "tailwind-merge";
import Link from "next/link";

export default function Topbar({
  className,
  invisible,
  authComponent,
}: {
  className?: ClassNameValue;
  invisible?: boolean;
  authComponent?: React.ReactNode;
}) {
  // hide topbar when scrolling down
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // show topbar when on top of the page
      if (window.scrollY <= 0) {
        setVisible(true);
        return;
      }
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, setVisible, setPrevScrollPos]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full",
        invisible && "invisible -z-50 block",
      )}
    >
      <div
        className={cn(
          "z-10 flex w-full items-center justify-center gap-2 bg-white/30 px-4 py-3 backdrop-blur duration-500 ease-in-out animate-in slide-in-from-top-full dark:bg-black/30",
          className,
          !visible && "invisible animate-out slide-out-to-top-full",
        )}
      >
        <div className="flex w-full max-w-5xl justify-between gap-2 px-2">
          {!invisible ? (
            <Link href="/" className="z-50">
              <div className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-[24px] w-[24px] dark:invert"
                />
                <p className="bg-gradient-to-tr from-foreground to-foreground/70 bg-clip-text text-xl font-medium tracking-tighter text-transparent">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt=""
                width={24}
                height={24}
                className="h-[24px] w-[24px] dark:invert"
              />
              <p className="bg-gradient-to-tr from-foreground to-foreground/70 bg-clip-text text-xl font-medium tracking-tighter text-transparent">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </p>
            </div>
          )}
          {authComponent}
        </div>
      </div>
    </nav>
  );
}
