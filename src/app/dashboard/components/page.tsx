import { Calendar, MapPinned } from "lucide-react";
import Image from "next/image";
import React from "react";
import AvailabilityIndicator from "~/components/global/Event/AvailabilityIndicator";
import { Badge } from "~/components/teceerui/badge";
import {
  Card,
  CardContent,
  CardCover,
  CardCoverImage,
  CardHeader,
  CardHeading,
} from "~/components/teceerui/card";
import { Header, Section } from "~/components/teceerui/layout";
import {
  Description,
  Heading,
  Paragraph,
  Subheading,
} from "~/components/teceerui/typography";

export default function Page() {
  return (
    <>
      <Header>Komponenty TeceerUi</Header>
      <Section>
        <Heading>Nagłówek główny</Heading>
        <Subheading>Nagłówek podrzędny</Subheading>
        <Paragraph>
          Enim reprehenderit ipsum fugiat nostrud culpa est do pariatur est anim
          magna dolor ipsum eiusmod. Culpa culpa enim amet minim non ut ut
          incididunt nisi mollit labore laboris ullamco.
        </Paragraph>
        <Description>
          Ut dolor velit adipisicing consequat elit consequat. Velit ad tempor
          sunt nulla enim laboris nisi. Mollit tempor cupidatat labore in
          laboris culpa consequat laboris. Consequat irure nulla consectetur eu
          ad officia proident pariatur mollit quis enim.
        </Description>
      </Section>

      <Section>
        <Card>
          <CardCover src="/pexels-amazingd-312297.jpg" className="h-16">
            <div className="absolute h-full w-full rounded-t-xl backdrop-blur-3xl" />
            <CardCoverImage className="-bottom-12">
              <Image
                src="/ticket-render.png"
                alt="logo"
                width={200}
                height={200}
                className="aspect-square w-32 object-contain drop-shadow-md"
              />
            </CardCoverImage>
          </CardCover>
          <CardHeader>
            <CardHeading>Karta</CardHeading>
          </CardHeader>
          <CardContent>
            <Paragraph>
              Enim reprehenderit ipsum fugiat nostrud culpa est do pariatur est
              anim magna dolor ipsum eiusmod. Culpa culpa enim amet minim non ut
              ut incididunt nisi mollit labore laboris ullamco.
            </Paragraph>
            <Description>
              Ut dolor velit adipisicing consequat elit consequat. Velit ad
              tempor sunt nulla enim laboris nisi. Mollit tempor cupidatat
              labore in laboris culpa consequat laboris. Consequat irure nulla
              consectetur eu ad officia proident pariatur mollit quis enim.
            </Description>
          </CardContent>
        </Card>

        <Card>
          <CardCover src="https://utfs.io/f/a7a3a250-ceff-4216-9b9a-0e5ca6c4b58a-5kcjrf.jpeg" />
          <CardHeader>
            <div className="flex w-full flex-wrap gap-2">
              <Description>
                <Calendar size={14} className="inline-block pb-0.5" /> Piątek,
                12 stycznia
              </Description>
              <Description>
                <MapPinned size={14} className="inline-block pb-0.5" /> Hala
                Olivia
              </Description>
            </div>
            <CardHeading>Połowinki VLO & IIILO & ULO</CardHeading>
          </CardHeader>
          <div className="bg-secondary p-4 py-2">
            <AvailabilityIndicator available={25} className="w-[150px]" />
          </div>
        </Card>
      </Section>
    </>
  );
}
