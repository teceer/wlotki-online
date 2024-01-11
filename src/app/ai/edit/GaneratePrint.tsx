"use client";
import React from "react";
import OpenAI from "openai";
import type { ImageEditParams, ImagesResponse } from "openai/resources/images.mjs";
import { Button } from "~/components/ui/button";

export default function GeneratePrint({
  imageFile,
  maskFile,
  prompt,
}: {
  imageFile: ImageEditParams["image"];
  maskFile: ImageEditParams["mask"];
  prompt: string;
}) {
  const [images, setImages] = React.useState<ImagesResponse | null>(null);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return <div>no api key</div>;
  const openai = new OpenAI({ apiKey });

  console.log(images?.data[0]?.url);
  return (
    <div>
      <Button
        onClick={async () => {
          const image = await openai.images.edit({
            image: imageFile,
            mask: maskFile,
            prompt,
            n: 1,
            size: "1024x1024",
          });
          setImages(image);
        }}
      >
        Generuj
      </Button>
      {images?.data.map((image) => {
        return (
          <div key={image.url}>
            <img src={image.url} alt="generated image" />
          </div>
        );
      })}
    </div>
  );
}
