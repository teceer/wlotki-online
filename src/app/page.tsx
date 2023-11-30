import Ticket from "~/components/Ticket/Ticket";
import AddEvent from "~/components/global/Event/AddEvent";
import Events from "~/components/global/Event/Events";
import Section from "~/components/global/Section";

export default function Home() {
  return (
    <Section DivClassName="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 ">
        <Events />
        <Ticket code="ABCD12345" />
      </div>
      <AddEvent />
    </Section>
  );
}
