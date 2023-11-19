"use client";

import { useEffect, useState } from "react";
function HologramObject() {
  const [opacity, setOpacity] = useState(0);
  // make it so that the opacity changes every 1-2 seconds
  useEffect(() => {
    setOpacity(Math.random());
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setOpacity(Math.random());
      },
      Math.random() * 1000 + 2000,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-foreground transition-all duration-500 ease-in-out"
      style={{
        opacity: opacity,
      }}
    />
  );
}

export default function Hologram() {
  const [randomCharacters, setRandomCharacters] = useState("");
  const [randomColor, setRandomColor] = useState("");
  const barsQuantity = 25;
  const charactersQuantity = 4;

  useEffect(() => {
    setRandomCharacters(
      Array.from(Array(charactersQuantity).keys())
        .map(() => {
          return Math.random().toString(36).charAt(2);
        })
        .join(""),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setRandomColor(
          Array.from(Array(6).keys())
            .map(() => {
              return Math.floor(Math.random() * 16).toString(16);
            })
            .join(""),
        );
        setRandomCharacters(
          Array.from(Array(charactersQuantity).keys())
            .map(() => {
              return Math.random().toString(36).charAt(2);
            })
            .join(""),
        );
      },
      Math.random() * 1000 + 2000,
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-full w-full">
      <div className="grid h-full w-full select-none auto-cols-auto">
        {Array.from(Array(barsQuantity).keys()).map((_, i) => {
          return (
            <div key={i}>
              <HologramObject />
            </div>
          );
        })}
      </div>
      {/* <div
        className="absolute right-0 top-0 h-8 w-8 rounded-bl-full transition-all duration-1000 ease-in-out"
        style={{ backgroundColor: "#" + randomColor }}
      /> */}
      <div className="absolute bottom-0 left-0 w-full select-none bg-background p-2 font-mono text-4xl font-bold uppercase leading-none">
        <p className="opacity-30">{randomCharacters}</p>
      </div>
    </div>
  );
}
