import React from "react";
import { getServerAuthSession } from "~/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignOut from "./SignOut";
import Link from "next/link";

export default async function UserAvatar() {
  const session = await getServerAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {session?.user.image && (
              <AvatarImage src={session?.user.image} alt="@shadcn" />
            )}
            <AvatarFallback className="uppercase">
              {session?.user.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard"}>
            <DropdownMenuItem>
              Zarządzanie
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOut>
          <DropdownMenuItem>
            Wyloguj się
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
