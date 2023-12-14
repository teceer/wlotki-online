"use client";
import Spline from "@splinetool/react-spline";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export default function NotFound(props: { className?: ClassNameValue }) {
  return (
    <>
      <Spline
        scene="https://prod.spline.design/zThT14XZpAKKzeBO/scene.splinecode"
        className={cn(props.className)}
      />
    </>
  );
}
