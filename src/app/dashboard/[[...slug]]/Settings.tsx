"use client";
import { Coins, Mail } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import Card from "~/components/elements/Card";
import createOAuthToken from "~/server/payU/createOAuthToken";
import createOrder from "~/server/payU/order";
import sendEmail from "~/server/sendEmail";

export default function Settings(props: { session?: Session }) {
  return (
    <>
      <TestEmail />
      <TestPayment session={props.session} />
      <TestPaymentToken />
    </>
  );
}

function TestEmail() {
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      const data = await sendEmail({
        subject: "Testowy email " + new Date().toLocaleString(),
        heading: "Testowy email",
        previewText: "Testowy email " + new Date().toLocaleString(),
        text:
          "To jest testowy email wygenerowany o godzinie " +
          new Date().toLocaleString() +
          ".",
        cta: {
          link: "https://wlotki.online",
          text: "Testowy przycisk",
        },
      });
      if (data.error) {
        setLoading(false);
        return toast.error(JSON.stringify(data.error));
      }
      setLoading(false);
      return toast.success("Wysłano e-mail testowy. " + JSON.stringify(data));
    } catch (e: unknown) {
      toast.error(JSON.stringify(e));
      setLoading(false);
    }
  };
  return (
    <Card
      title="sendEmail.ts"
      icon={<Mail className="text-blue-500" />}
      onClick={onClick}
      loading={loading}
    />
  );
}

function TestPayment(props: { session?: Session }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onClick = async () => {
    setLoading(true);
    const customerIp = (await fetch("/api/v1/ip", { cache: "no-cache" }).then(
      (res) => res.json(),
    )) as { ip?: string; error?: string };
    if (customerIp.error) return toast.error(JSON.stringify(customerIp.error));
    if (!customerIp.ip) return toast.error("Nie udało się pobrać adresu IP.");
    try {
      const data = await createOrder({
        host: window.location.origin,
        order: {
          customerIp: customerIp.ip,
          description: "Testowa płatność",
          totalAmount: "1",
          products: [
            {
              name: "Testowy produkt",
              quantity: "1",
              unitPrice: "1",
              virtual: true,
            },
          ],
          buyer: {
            email: props.session?.user?.email ?? undefined,
            firstName: props.session?.user?.name?.split(" ")[0] ?? undefined,
            lastName: props.session?.user?.name?.split(" ")[1] ?? undefined,
            phone: props.session?.user?.phoneNumber ?? undefined,
          },
        },
      });
      toast.success(
        "Pomyślnie zarejestrowano płatność. " + JSON.stringify(data),
      );
      setLoading(false);
      return router.push(data.redirectUri);
    } catch (e: unknown) {
      setLoading(false);
      toast.error(JSON.stringify(e));
    }
  };
  return (
    <Card
      title="payU /createOrder.ts"
      icon={<Coins className="text-blue-500" />}
      onClick={onClick}
      loading={loading}
    />
  );
}

function TestPaymentToken() {
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      const data = await createOAuthToken("client_credentials", {});
      toast.success("Pomyślnie uzyskano token PayU. " + data.data.access_token);
      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      toast.error(JSON.stringify(e));
    }
  };
  return (
    <Card
      title="payU /createOAuthToken.ts"
      icon={<Coins className="text-blue-500" />}
      onClick={onClick}
      loading={loading}
    />
  );
}
