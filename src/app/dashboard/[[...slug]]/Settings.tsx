"use client";
import React from "react";
import { toast } from "react-toastify";
import Card from "~/components/elements/Card";
import sendEmail from "~/server/sendEmail";

export default function Settings() {
  const onClick = async () => {
    try {
      const data = await sendEmail();
      if (data.error) {
        return toast.error(JSON.stringify(data.error));
      }
      return toast.success("Wysłano e-mail testowy");
    } catch (e: unknown) {
      toast.error(JSON.stringify(e));
    }
  };
  return <Card title="Testuj wysyłkę e-maili" className="" onClick={onClick} />;
}
