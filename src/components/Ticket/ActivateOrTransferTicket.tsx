"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ActivateOrTransferTicket({ code }: { code: string }) {
  const [mode, setMode] = useState<"user" | "transfer" | null>(null);
  if (mode === null)
    return (
      <div className="flex w-full flex-wrap justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            setMode("transfer");
          }}
        >
          Przekaż dalej
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            setMode("user");
          }}
        >
          Uzupełnij dane
        </Button>
      </div>
    );

  if (mode === "user")
    return (
      <div className="flex w-full justify-between gap-2">
        <div>Uzupełnij dane uczestnika</div>
        <X
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            setMode(null);
          }}
        />
      </div>
    );

  if (mode === "transfer")
    return (
      <div className="flex w-full justify-between gap-2">
        <div>Przekaż dalej</div>
        <X
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            setMode(null);
          }}
        />
      </div>
    );
}
