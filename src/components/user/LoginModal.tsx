"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { FaApple, FaFacebook, FaGoogle, FaDiscord } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "~/lib/utils";
import { signIn } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import { Loader, Loader2 } from "lucide-react";

function LoginButton(props: {
  variant: "apple" | "google" | "facebook" | "discord";
}) {
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async () => {
    setLoading(true);
    await signIn(props.variant);
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      className="flex h-fit w-full items-center justify-center rounded-lg py-4 text-xl"
      onClick={handleLogin}
      disabled={
        props.variant === "facebook" ||
        props.variant === "apple" ||
        props.variant === "google"
      }
    >
      {loading ? <Loader2 size={20} className="animate-spin" /> : icon()}
    </Button>
  );
}

export default function LoginModal() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  return (
    <DialogProvider>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Zaloguj się</Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "w-[90%] gap-8 rounded-2xl transition-all ease-in-out sm:rounded-2xl",
            {
              "border-blue-500 bg-gradient-to-t from-blue-500/10 to-10% shadow-lg shadow-blue-500/50":
                mode === "signin",
            },
            {
              "border-violet-500 bg-gradient-to-t from-violet-500/10 to-10% shadow-lg shadow-violet-500/50":
                mode === "signup",
            },
          )}
        >
          <DialogHeader className="text-left">
            <DialogTitle>
              <p className="text-xl font-medium">
                {mode === "signin" ? "Zaloguj się" : "Zarejestruj się"}
              </p>
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
              <Button className="w-full" variant="outline">
                Kontynuuj
              </Button>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <p>{mode === "signin" ? "Nie masz konta?" : "Masz już konto?"}</p>
              <p
                className={cn(
                  "cursor-pointer font-medium transition-all",
                  mode === "signin" ? "text-blue-500" : "text-violet-500",
                )}
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Zarejestruj się" : "Przejdź do logowania"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DialogProvider>
  );
}
