/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Image from "next/image";
import React, { Suspense } from "react";
import QRCode from "react-qr-code";
import { BookmarkIcon, Clock, MapPin } from "lucide-react";
import { Badge, BadgeGroup } from "../elements/Badge";
import { cn } from "~/lib/utils";
import Hologram from "./Hologram";
import DateString from "../global/DateString";
import TicketOptions from "./TicketOptions";
import Link from "next/link";
import TicketActions from "./TicketActions";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { type Participant } from "@prisma/client";

export type TicketStatusType =
  | "active"
  | "used"
  | "transferred"
  | "expired"
  | "cancelled"
  | "no_user"
  | "deactivated"
  | "received"
  | "cancelled_by_buyer"
  | "error";

function TicketStatus({ status }: { status: TicketStatusType }) {
  if (status === "active") {
    return <Badge color="green">Aktywowano</Badge>;
  }
  if (status === "used") {
    return <Badge color="gray">Wykorzystano</Badge>;
  }
  if (status === "no_user") {
    return <Badge color="yellow">Brak uczestnika</Badge>;
  }
  if (status === "cancelled") {
    return <Badge color="violet">Zwrócono</Badge>;
  }
  if (status === "cancelled_by_buyer") {
    return <Badge color="red">Zwrócono</Badge>;
  }
  if (status === "error") {
    return <Badge color="red">Błąd</Badge>;
  }
  if (status === "transferred") {
    return <Badge color="yellow">Przekazano</Badge>;
  }
  if (status === "expired") {
    return <Badge color="gray">Po terminie</Badge>;
  }
  if (status === "deactivated") {
    return <Badge color="gray">Dezaktywowano</Badge>;
  }
  if (status === "received") {
    return <Badge color="blue">Otrzymano</Badge>;
  }
}

function ParticipantData({
  participant,
  status,
  allowTransfer,
}: {
  participant: Participant | null;
  status: TicketStatusType;
  allowTransfer?: boolean;
}) {
  if (participant)
    return (
      <div className="leading-none">
        <p className="text-xl font-semibold">
          {participant.firstName} {participant.lastName}
        </p>
        <div className="flex items-center leading-none opacity-30">
          <DateString date={participant.birthDate} format="dd-MM-yyyy" />
        </div>
      </div>
    );

  if (!participant) {
    if (status === "cancelled" || status === "cancelled_by_buyer") {
      return (
        <div className="leading-none">
          <p className="text-xl font-semibold">Brak uczestnika</p>
        </div>
      );
    }

    return (
      <div className="leading-none">
        <p className="text-xl font-semibold">Brak uczestnika</p>
        {/* <div className="flex items-center text-sm leading-none text-yellow-500">
          Uzupełnij wymagane dane
          {allowTransfer && " lub przekaż wlotkę innej osobie."}
        </div> */}
      </div>
    );
  }
}

export default function Ticket({ code }: { code: string }) {
  const orderStatus = Math.random() > 0.5 ? "cancelled" : "processing";
  const isBuyer = false;
  const eventEndTime = new Date(2023, 10, 12, 1, 32);
  const isScanned = true;
  const isActive = true;
  const isTransferred = true;
  const isNewOwner = true;
  const participant: Participant | null = null;
  //   const participant: Participant | null = {
  //     id: "dahe7d8ewndfwvsudhs",
  //     firstName: "Jan",
  //     lastName: "Kowalski",
  //     birthDate: new Date(2000, 12, 7),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     userId: "user_dahyeufgw2",
  //   };

  const ticketCode = code;
  const orderId = "3462";
  const eventName = "Nazwa Wydarzenia";
  const eventLocation = "Hala Olivia, Gdańsk";
  const poolTime = "Godzina 20:00";
  const ticketTypeName = "Bilet Normalny";

  const currentDate = new Date();

  // "used" | "transferred" | "active" | "expired" | "cancelled" | "no_user" | "deactivated" | "received" | "cancelled_by_buyer"
  const getStatus = () => {
    if (orderStatus === "cancelled") {
      if (isBuyer) return "cancelled";
      if (isNewOwner) return "cancelled_by_buyer";
      return "error";
    }
    if (eventEndTime < currentDate) return "expired";
    if (isScanned) return "used";
    if (!isActive) return "deactivated";
    if (isTransferred) {
      if (!isNewOwner) return "transferred";
      if (isNewOwner && !participant) return "received";
    }
    if (!participant) {
      if (isBuyer && !isTransferred) return "no_user";
      if (isNewOwner) return "no_user";
    }
    if (participant) {
      if (isBuyer && !isTransferred) return "active";
      if (isNewOwner) return "active";
    }
    return "error";
  };

  const status: TicketStatusType = getStatus();

  function BottomSection() {
    if (status === "expired" || status === "used") {
      return (
        <div className="relative flex h-2 items-start justify-between -space-x-2 overflow-hidden shadow-lg">
          <div className="relative h-4 w-4 overflow-hidden before:absolute before:right-1/2 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-border before:shadow-[0px_300px_0px_300px] before:shadow-background before:content-['']" />
          <div className="z-10 flex h-full grow items-center border-b border-dashed bg-background" />
          <div className="relative h-4 w-4 overflow-hidden before:absolute before:left-1/2 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-border before:shadow-[0px_300px_0px_300px] before:shadow-background before:content-['']" />
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-between shadow-lg">
          <div className="relative h-4 w-4 overflow-hidden before:absolute before:right-1/2 before:h-full before:w-full before:rounded-full before:border before:border-border before:shadow-[0px_300px_0px_300px] before:shadow-background before:content-['']" />
          <div className="flex h-4 grow items-center bg-background">
            <div className="h-[1px] w-full bg-foreground/10" />
          </div>
          <div className="relative h-4 w-4 overflow-hidden before:absolute before:left-1/2 before:h-full before:w-full before:rounded-full before:border before:border-border before:shadow-[0px_300px_0px_300px] before:shadow-background before:content-['']" />
        </div>
        <div
          className={cn(
            "flex flex-col items-start rounded-b-xl border border-t-0 bg-background p-6 pt-5 shadow-lg",
            status === "transferred" &&
              "border-b-yellow-500 bg-gradient-to-t from-yellow-500/10",
            status === "cancelled" &&
              "border-b-violet-500 bg-gradient-to-t from-violet-500/10",
            status === "cancelled_by_buyer" &&
              "border-b-red-500 bg-gradient-to-t from-red-500/10",
          )}
        >
          {status === "active" && (
            <div className="flex w-full gap-4">
              <div
                className={cn(
                  "relative aspect-square w-max space-y-2 rounded border bg-white p-3 text-center",
                )}
              >
                <QRCode value={ticketCode} size={120} />
                <code className="text-[10px] text-black">{ticketCode}</code>
              </div>
              <div className="min-h-[164px] grow overflow-hidden rounded border">
                <Hologram />
              </div>
            </div>
          )}
          {status === "cancelled" && (
            <>
              <p>Wlotka została zwrócona</p>
              <p className="text-xs opacity-70">
                Został zlecony zwrot środków za tę wlotkę. Jeśli potrzebujesz
                dodatkowych informacji, możesz się z nami{" "}
                <Link href="/kontakt" className="underline">
                  skontaktować
                </Link>
                .
              </p>
            </>
          )}
          {status === "cancelled_by_buyer" && (
            <>
              <p>Pierwotny właściciel zwrócił ten bilet</p>
              <p className="text-xs opacity-70">
                Został zlecony zwrot środków za tę wlotkę. Jeśli uważasz, że
                mogło dojść do oszustwa, możesz się z nami{" "}
                <Link href="/kontakt" className="underline">
                  skontaktować
                </Link>
                .
              </p>
            </>
          )}
          {status === "transferred" && (
            <>
              <p>Przekazano innemu użytkownikowi</p>
              <p className="text-xs opacity-70">
                Ta wlotka jest dostępna na koncie, na które została przekazana.
              </p>
            </>
          )}
          {status === "no_user" && (
            <Suspense
              fallback={
                <div className="h-8 w-full animate-pulse bg-foreground opacity-30" />
              }
            >
              <TicketActions code={ticketCode} allowTransfer />
            </Suspense>
          )}
          {status === "received" && (
            <Suspense
              fallback={
                <div className="h-8 w-full animate-pulse bg-foreground opacity-30" />
              }
            >
              <div className="space-y-4">
                <Card className="w-full border-l-blue-500 bg-gradient-to-r from-blue-500/10">
                  <CardHeader>
                    <CardTitle>
                      Maja Wiśniewska przekazuje Ci wlotkę 🎉
                    </CardTitle>
                    <CardDescription>
                      Teraz możesz uzupełnić swoje dane, lub przekazać wlotkę
                      dalej.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <TicketActions code={ticketCode} allowTransfer />
              </div>
            </Suspense>
          )}
          {status === "deactivated" && (
            <>
              <p>Wlotka została dezaktywowana</p>
              <p className="text-xs opacity-70">
                Z jakiegoś powodu musieliśmy dezaktywować tę wlotkę. Jeśli
                potrzebujesz dodatkowych informacji, możesz się z nami{" "}
                <Link href="/kontakt" className="underline">
                  skontaktować
                </Link>
                .
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <p>Wystąpił błąd</p>
              <p className="text-xs opacity-70">
                Coś poszło nie tak. Zostaliśmy już powiadomieni o tym błędzie i
                pracujemy nad jego rozwiązaniem. Jeśli potrzebujesz dodatkowych
                informacji, możesz się z nami{" "}
                <Link href="/kontakt" className="underline">
                  skontaktować
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-t-xl border border-b-0 bg-background shadow-lg">
        <div className="relative h-16 w-full bg-gradient-to-tr from-violet-950 to-violet-900">
          <Image
            src="/banner-default-bg.jpg"
            fill
            className="object-cover"
            alt=""
            priority
          />
        </div>
        <div className="space-y-4 p-6">
          <div className="flex justify-between gap-2">
            <ParticipantData participant={participant} status={status} />
            <TicketOptions
              getHelp
              resetTicket={status === "active"}
              returnTicket={status === "active" || status === "no_user"}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center leading-none">
              <BookmarkIcon className="mr-1 inline-block h-4 w-4" />
              <p>{eventName}</p>
            </div>
            <div className="flex items-center leading-none">
              <MapPin className="mr-1 inline-block h-4 w-4" />
              <p>{eventLocation}</p>
            </div>
            <div className="flex items-center leading-none">
              <Clock className="mr-1 inline-block h-4 w-4" />
              <p>{poolTime}</p>
            </div>
          </div>
        </div>
        <BadgeGroup className="px-4 pb-4">
          <TicketStatus status={status} />
          <Badge>{ticketTypeName}</Badge>
          <Badge tooltip="Numer zamówienia">#{orderId}</Badge>
        </BadgeGroup>
      </div>
      <BottomSection />
    </div>
  );
}
