import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function AuthButton() {
  const session = await getServerAuthSession();
  if (!session)
    return (
      <Link href={"/api/auth/signin"}>
        <Button variant="ghost">Zaloguj się</Button>
      </Link>
    );
  if (session)
    return (
      <Link href={"/api/auth/signout"}>
        <Button variant="ghost">Wyloguj się</Button>
      </Link>
    );
}
