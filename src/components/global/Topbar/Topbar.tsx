"use client";
import { cn } from "~/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { type ClassNameValue } from "tailwind-merge";
import Link from "next/link";

export default function Topbar({ className }: { className?: ClassNameValue }) {
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
    <nav className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "z-10 flex w-full items-center justify-between gap-2 bg-white/30 px-4 py-3 backdrop-blur duration-500 ease-in-out animate-in slide-in-from-top-full dark:bg-black/30 md:px-32",
          className,
          !visible && "invisible animate-out slide-out-to-top-full",
        )}
      >
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt=""
              width={24}
              height={24}
              className="h-[24px] w-[24px] dark:invert"
            />
            <p className="text-2xl font-bold tracking-tighter">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
