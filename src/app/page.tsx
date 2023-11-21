import Ticket from "~/components/Ticket/Ticket";
import AddEvent from "~/components/global/Event/AddEvent";
import EventCard from "~/components/global/Event/EventCard";
import ImageUploadTest from "~/components/global/ImageUploadTest";
import Section from "~/components/global/Section";

export default function Home() {
  return (
    <Section DivClassName="space-y-4">
      <AddEvent />
      <div className="grid gap-4 sm:grid-cols-2 ">
        <EventCard isVertical />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <Ticket code="ABCD12345" />
      </div>
    </Section>
  );
}
