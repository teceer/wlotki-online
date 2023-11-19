import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

function ResetTicket() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zresetuj dane uczestnika</CardTitle>
        <CardDescription>
          Literówka lub błąd podczas wprowadzania danych?
        </CardDescription>
        <CardDescription>
          A może po prostu chcesz przekazać wlotkę znajomemu?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Cofnij aktywację</Button>
      </CardContent>
    </Card>
  );
}

function ReturnTicket() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zwróć wlotkę</CardTitle>
        <CardDescription>Nie możesz pojawić się na wydarzeniu?</CardDescription>
        <CardDescription>
          Wlotka została zakupiona przez przypadek?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant="destructive">
          Dokonaj zwrotu
        </Button>
      </CardContent>
    </Card>
  );
}

function GetHelp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomoc z wlotką</CardTitle>
        <CardDescription>
          Masz problem, z którym nie możesz sobie poradzić?
        </CardDescription>
        <CardDescription>Potrzebujesz odpowiedzi na pytanie?</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Uzyskaj pomoc</Button>
      </CardContent>
    </Card>
  );
}

export default function TicketOptions(props: {
  resetTicket?: boolean;
  returnTicket?: boolean;
  getHelp?: boolean;
}) {
  if (!props) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <MoreVertical />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left">Opcje wlotki</SheetTitle>
          <SheetDescription className="text-left">
            Poniżej znajdziesz akcje, które możesz wykonać na tej wlotce.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-2">
          {props.resetTicket && <ResetTicket />}
          {props.returnTicket && <ReturnTicket />}
          {props.getHelp && <GetHelp />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
