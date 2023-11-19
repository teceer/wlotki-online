import React from "react";
import ActivateTicket from "./ActivateTicket";
import ActivateOrTransferTicket from "./ActivateOrTransferTicket";

export default function TicketActions({
  code,
  allowTransfer,
}: {
  code: string;
  allowTransfer?: boolean;
}) {
  if (allowTransfer) return <ActivateOrTransferTicket code={code} />;
  return <ActivateTicket code={code} />;
}
