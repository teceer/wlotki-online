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
            <div className="absolute h-full w-full bg-gradient-to-b from-background to-background/30 backdrop-blur-sm" />
          </div>
        </div>
      </div>
      <Section
        DivClassName="z-10 flex flex-col max-w-full"
        SectionClassName="pt-0 pl-0 md:pl-0 md:py-0"
      >
        <div className="flex h-full grow justify-between gap-4">
          <div className="flex h-max items-end rounded-br-lg border-b border-r bg-background/70 p-4 backdrop-blur md:pl-36 md:pr-8 md:pt-8">
            <H1>{title}</H1>
          </div>
          <div className="relative mt-[18px] aspect-square w-28 shrink-0 rotate-6 md:mt-8 md:w-64">
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
                  className="rounded-lg border object-cover"
                />
              </>
            )}
          </div>
        </div>
      </Section>
    </section>
  );
}
