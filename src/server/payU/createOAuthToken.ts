"use server";
import { env } from "~/env.mjs";

export default async function createOAuthToken<T extends GrantType>(
  grantType: T,
  info: GrantInfo<T>,
) {
  const body = () => {
    switch (grantType) {
      case "client_credentials":
        const clientInfo = info as GrantInfo<"client_credentials">;
        return {
          grant_type: grantType,
          client_id: !clientInfo.clientId
            ? env.PAYU_CLIENT_ID
            : clientInfo.clientId,
          client_secret: !clientInfo.clientSecret
            ? env.PAYU_CLIENT_SECRET
            : clientInfo.clientSecret,
        };
      case "partner":
        const partnerInfo = info as GrantInfo<"partner">;
        return {
          grant_type: grantType,
          client_id: !partnerInfo.clientId
            ? env.PAYU_CLIENT_ID
            : partnerInfo.clientId,
          client_secret: !partnerInfo.clientSecret
            ? env.PAYU_CLIENT_SECRET
            : partnerInfo.clientSecret,
          partner_id: partnerInfo.partnerId,
        };
      case "trusted_merchant":
        const merchantInfo = info as GrantInfo<"trusted_merchant">;
        return {
          grant_type: grantType,
          client_id: !merchantInfo.clientId
            ? env.PAYU_CLIENT_ID
            : merchantInfo.clientId,
          client_secret: !merchantInfo.clientSecret
            ? env.PAYU_CLIENT_SECRET
            : merchantInfo.clientSecret,
          email: merchantInfo.email,
          ext_customer_id: merchantInfo.extCustomerId,
        };
      default:
        console.log("Invalid grant type");
        throw new Error("Invalid grant type");
    }
  };

  const response = await fetch(
    env.PAYU_API_HOST + "/pl/standard/user/oauth/authorize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(
        body() as unknown as Record<string, string>,
      ).toString(),
    },
  );

  const responseData = (await response.json()) as OAuthToken | OAuthTokenError;

  console.log(responseData);

  if (response.status != 200) {
    throw new Error(JSON.stringify(responseData));
  }
  return {
    status: "success",
    data: responseData as OAuthToken,
  };
}

type GrantType = "client_credentials" | "partner" | "trusted_merchant";

type GrantInfo<T extends GrantType> = T extends "client_credentials"
  ? { clientId?: string; clientSecret?: string }
  : T extends "partner"
    ? { clientId?: string; clientSecret: string; partnerId: string }
    : T extends "trusted_merchant"
      ? {
          clientId?: string;
          clientSecret?: string;
          email: string;
          extCustomerId: string;
        }
      : never;

export type OAuthToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  grant_type: string;
};

export type OAuthTokenError = {
  error: string;
  error_description: string;
};
