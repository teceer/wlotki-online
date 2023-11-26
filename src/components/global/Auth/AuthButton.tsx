import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import LoginModal from "~/components/user/LoginModal";
import UserAvatar from "~/components/user/UserAvatar";
import { getServerAuthSession } from "~/server/auth";

export default async function AuthButton() {
  const session = await getServerAuthSession();
  if (!session) return <LoginModal />;
  if (session) return <UserAvatar />;
}
