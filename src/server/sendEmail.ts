"use server";
import { Resend } from "resend";
import { Email } from "emails/Info";
import { env } from "~/env.mjs";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const fromName = env.NEXT_PUBLIC_APP_NAME;
const fromEmail = env.SYSTEM_EMAIL;
const toEmail = env.ADMIN_EMAIL;

export default async function sendEmail() {
  try {
    const data = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject: "Hello world!",
      react: Email({
        previewText: "Email testowy",
        heading: "Email testowy!",
        text: "To jest testowy email o ID: " + randomUUID(),
        cta: {
          text: "Kliknij tutaj",
          link: env.NEXTAUTH_URL + "/dashboard",
        },
      }) as React.ReactElement,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return { error: JSON.stringify(error) };
  }
}
