import { Plus } from "lucide-react";
import React from "react";

export default function AddEvent() {
  return (
    <div className="group flex items-center justify-center rounded-xl border p-4 opacity-80 backdrop-blur transition-all hover:border-foreground/30">
      <Plus className="opacity-30 transition-all group-hover:opacity-70" />
    </div>
  );
}
