import React from "react";
import { Plus } from "lucide-react";

export default function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 pt-0 duration-500 ease-in-out animate-in slide-in-from-right-full">
      <div className="rounded-full border border-primary/30 bg-secondary/70 p-4 backdrop-blur">
        {children}
      </div>
    </div>
  );
}
