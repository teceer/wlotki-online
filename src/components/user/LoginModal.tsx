"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { FaApple, FaFacebook, FaGoogle, FaDiscord } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function LoginButton(props: {
  variant: "apple" | "google" | "facebook" | "discord";
}) {
  const icon = () => {
    switch (props.variant) {
      case "apple":
        return <FaApple />;
      case "google":
        return <FaGoogle />;
      case "facebook":
        return <FaFacebook />;
      case "discord":
        return <FaDiscord />;
      default:
        return null;
    }
  };
  return (
    <Button variant="outline" className="h-fit w-full rounded-lg py-4 text-xl">
      {icon()}
    </Button>
  );
}

export default function LoginModal() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Zaloguj się</Button>
      </DialogTrigger>
      <DialogContent className="gap-8 sm:rounded-2xl w-[90%] rounded-2xl">
        <DialogHeader className="text-left">
          <DialogTitle>
            {mode === "signin" ? "Zaloguj się" : "Zarejestruj się"}
          </DialogTitle>
          <DialogDescription>aby kontynuować na {appName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          <div className="flex w-full gap-2">
            <LoginButton variant="apple" />
            <LoginButton variant="google" />
            <LoginButton variant="discord" />
            {/* <LoginButton variant="facebook" /> */}
          </div>
          <div className="flex w-full items-center gap-4">
            <Separator className="shrink" />
            <p className="opacity-70">lub</p>
            <Separator className="shrink" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Adres email</Label>
              <Input type="email" id="email" />
            </div>
            <Button className="w-full">Kontynuuj</Button>
          </div>
          <div className="flex items-baseline gap-2 text-sm">
            <p>{mode === "signin" ? "Nie masz konta?" : "Masz już konto?"}</p>
            <p
              className="cursor-pointer font-medium text-blue-500 hover:underline"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Zarejestruj się" : "Zaloguj się"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
