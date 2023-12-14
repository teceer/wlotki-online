/* eslint-disable @typescript-eslint/require-await */
export const dynamic = "force-dynamic";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";
import md5 from "md5";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as unknown as Notification;
    console.log("data: ", data);
    if (!checkSignature(req, data))
      throw new Error("Invalid signature detected while checking signature");
    const notificationBody = req.body as unknown as
      | NotificationCompleted
      | NotificationCancelled;
    console.log("notificationBody: ", notificationBody);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return NextResponse.json({ error: `${error}`, status: 400 });
  }
}

function getSignature(req: NextRequest): Signature {
  const openPayUSignature = req.headers.get("OpenPayu-Signature");
  if (typeof openPayUSignature === "string") {
    // Parse the header to extract the signature
    const parts = openPayUSignature.split(";").reduce(
      (acc, current) => {
        const [key, value] = current.split("=");
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      },
      {} as Record<string, string>,
    );

    // Access the signature value
    // Use the signature value as needed
    console.log("Signature:", JSON.stringify(parts, null, 2));
    if (!parts) throw new Error("Invalid signature", parts);
    return parts as unknown as Signature;
  }
  throw new Error("Invalid signature");
}

function checkSignature(req: NextRequest, data: Notification): boolean {
  const signature = getSignature(req);
  const concatenated = JSON.stringify(data, null) + env.PAYU_MD5;
  console.log("concatenated: ", concatenated);
  const expectedSignature = () => {
    switch (signature.algorithm) {
      case "MD5":
        return md5(concatenated);
      case "SHA256":
        return crypto.createHash("sha256").update(concatenated).digest("hex");
      case "SHA1":
        return crypto.createHash("sha1").update(concatenated).digest("hex");
      default:
        throw new Error("Unknown signature algorithm");
    }
  };
  if (expectedSignature() !== signature.signature) {
    console.log("Expected signature:", expectedSignature());
    console.log("Received signature:", signature.signature);
    throw new Error("Signature not matching the expected value");
  }
  return true;
}

type Signature = {
  algorithm: string;
  signature: string;
  sender: string;
  content: string;
};

type Notification = NotificationCompleted | NotificationCancelled;

type NotificationCompleted = {
  order: {
    orderId: string;
    extOrderId: string;
    orderCreateDate: string;
    notifyUrl: string;
    customerIp: string;
    merchantPosId: string;
    description: string;
    currencyCode: string;
    totalAmount: string;
    buyer: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      language: string;
    };
    payMethod: {
      type: "PBL" | "CARD_TOKEN" | "INSTALLMENTS";
    };
    products: Product[];
    status: "COMPLETED";
  };
  localReceiptDateTime: string;
  properties: Property[];
};

type NotificationCancelled = {
  order: {
    orderId: string;
    extOrderId: string;
    orderCreateDate: string;
    notifyUrl: string;
    customerIp: string;
    merchantPosId: string;
    description: string;
    currencyCode: string;
    totalAmount: string;
    products: Product[];
    status: "CANCELED";
  };
};

type Product = {
  name: string;
  unitPrice: string;
  quantity: string;
};

type Property = {
  name: string;
  value: string;
};
