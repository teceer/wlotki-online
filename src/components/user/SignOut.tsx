"use client";
import { signOut } from "next-auth/react";

export default function SignOut({ children }: { children: React.ReactNode }) {
  return <div onClick={() => signOut()}>{children}</div>;
}
