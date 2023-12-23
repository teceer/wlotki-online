import Image from "next/image";
import React from "react";
import { H1 } from "../global/Typography";
import Section from "../global/Section";

export default function EventHeader({
  image,
  title,
}: {
  image: string | null;
  title: string;
}) {
  return (
    <section className="bg-gradient-to-t from-transparent from-50% to-background to-70%">
      <div className="absolute w-full">
        <div className="relative flex h-40 w-full flex-col items-center justify-end md:h-64">
          <div className="absolute h-full w-full">
            {image && (
              <Image alt="" src={image} fill className="object-cover" />
            )}
            <div className="absolute h-full w-full bg-gradient-to-t from-background backdrop-blur-sm" />
          </div>
        </div>
      </div>
      <Section DivClassName="z-10">
        <div className="flex items-end justify-between gap-4">
          <H1 className="pb-8 md:pb-12">{title}</H1>
          <div className="relative aspect-square w-40 shrink-0 md:w-64">
            {image && (
              <>
                <Image
                  alt=""
                  src={image}
                  fill
                  className="rounded-lg object-cover blur"
                />
                <Image
                  alt=""
                  src={image}
                  fill
                  className="rounded-lg object-cover"
                />
              </>
            )}
          </div>
        </div>
      </Section>
    </section>
  );
}
