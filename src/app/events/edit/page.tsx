import React from "react";
import Section from "~/components/global/Section";

export default function page({ params }: { params: { eventId: string } }) {
  return <Section>{params.eventId}</Section>;
}
