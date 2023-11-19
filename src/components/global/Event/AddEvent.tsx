import React from "react";
import AddEventForm from "./AddEventForm";

export default function AddEvent() {
  return (
    <div className="space-y-4 rounded-xl border bg-background p-4">
      <p className="text-lg font-bold tracking-tighter">
        Dodaj nowe wydarzenie
      </p>
      <AddEventForm />
    </div>
  );
}
