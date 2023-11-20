"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "~/lib/utils";

// TODO: convert to form object and validation (zod and react-hook-form)

export default function AddNewPool() {
  type NewPoolObject = {
    index: number;
    price: number;
    time: string;
    type: string;
  };
  const [pools, setPools] = React.useState<NewPoolObject[]>([]);

  function PoolAdder({ index, isFirst }: { index: number; isFirst?: boolean }) {
    const [pool, setPool] = React.useState<NewPoolObject>({
      index,
      price: 0,
      time: "",
      type: "",
    });

    const isEmpty = pool.price === 0 && pool.time === "" && pool.type === "";

    return (
      <div
        className={cn(
          "grid grid-cols-3 gap-1",
          !isFirst && isEmpty && "opacity-30",
        )}
      >
        <div className="">
          {isFirst && (
            <Label className="text-xs opacity-70" id="price">
              Cena
            </Label>
          )}
          <Input
            className="rounded-none border-0 border-b focus-visible:border-foreground focus-visible:ring-0"
            id="price"
            type="number"
            inputMode="decimal"
            onChange={(e) => {
              setPool((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }));
              setPools((prev) => [...prev, pool]);
            }}
          />
        </div>
        <div className="">
          {isFirst && (
            <Label className="text-xs opacity-70" id="time">
              Godzina
            </Label>
          )}
          <Input
            className="rounded-none border-0 border-b focus-visible:border-foreground focus-visible:ring-0"
            id="time"
            type="time"
            onChange={(e) => {
              setPool((prev) => ({
                ...prev,
                time: e.target.value,
              }));
              setPools((prev) => [...prev, pool]);
            }}
          />
        </div>
        <div className="">
          {isFirst && (
            <Label className="text-xs opacity-70" id="type">
              Typ
            </Label>
          )}
          <Input
            className="rounded-none border-0 border-b focus-visible:border-foreground focus-visible:ring-0"
            id="type"
            type="text"
            onChange={(e) => {
              setPool((prev) => ({
                ...prev,
                type: e.target.value,
              }));
              setPools((prev) => [...prev, pool]);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dodaj pule biletowe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <PoolAdder isFirst index={0} />
        {Array.from(Array(pools.length)).map((_, i) => (
          <PoolAdder key={i} index={i + 1} />
        ))}
      </CardContent>
    </Card>
  );
}
