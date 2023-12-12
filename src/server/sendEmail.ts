"use server";
import { Resend } from "resend";
import { Email } from "emails/Info";
import { env } from "~/env.mjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(props: {
  subject: string;
  heading: string;
  text: string;
  cta?: {
    text: string;
    link: string;
  };
  previewText?: string;
  fromName?: string;
  fromEmail?: string;
  toEmail?: string;
}) {
  try {
    const data = await resend.emails.send({
      from: `${props.fromName ?? env.NEXT_PUBLIC_APP_NAME} <${
        props.fromEmail ?? env.SYSTEM_EMAIL
      }>`,
      to: props.toEmail ?? env.ADMIN_EMAIL,
      subject: props.subject,
      react: Email({
        previewText: props.previewText,
        heading: props.heading,
        text: props.text,
        cta: props.cta,
      }) as React.ReactElement,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return { error: JSON.stringify(error) };
  }
}
