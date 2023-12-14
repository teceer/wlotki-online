"use server";
import { env } from "~/env.mjs";
import createOAuthToken from "./createOAuthToken";

export async function confirmOrder(orderId: string) {
  const token = await createOAuthToken("client_credentials", {});
  const response = await fetch(
    env.PAYU_API_HOST + `/api/v2_1/orders/${orderId}/captures`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.access_token}`,
      },
    },
  );
  const data = (await response.json()) as unknown as OrderResponse;
  if (data.status.statusCode != "SUCCESS") {
    throw new Error(JSON.stringify(data));
  }
  return true;
}

export async function cancelOrder(orderId: string) {
  const token = await createOAuthToken("client_credentials", {});
  const response = await fetch(
    env.PAYU_API_HOST + `/api/v2_1/orders/${orderId}/captures`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.access_token}`,
      },
    },
  );
  const data = (await response.json()) as unknown as OrderResponse;
  if (data.status.statusCode != "SUCCESS") {
    throw new Error(JSON.stringify(data));
  }
  return true;
}

type OrderResponse = {
  status: {
    statusCode: string;
    statusDesc?: string;
  };
};
