import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import UserAvatar from "~/components/user/UserAvatar";
import { getServerAuthSession } from "~/server/auth";

export default async function AuthButton() {
  const session = await getServerAuthSession();
  if (!session)
    return (
      <Link href={"/api/auth/signin"}>
        <Button variant="ghost">Zaloguj się</Button>
      </Link>
    );
  if (session) return <UserAvatar />;
}
