import { env } from "~/env.mjs";

export default function createOAuthToken<T extends GrantType>(
  grantType: T,
  info: GrantInfo<T>,
) {
  const body = () => {
    switch (grantType) {
      case "client_credentials":
        const clientInfo = info as GrantInfo<"client_credentials">;
        return {
          grant_type: grantType,
          client_id: clientInfo.clientId,
          client_secret: clientInfo.clientSecret,
        };
      case "partner":
        const partnerInfo = info as GrantInfo<"partner">;
        return {
          grant_type: grantType,
          client_id: partnerInfo.clientId,
          client_secret: partnerInfo.clientSecret,
          partner_id: partnerInfo.partnerId,
        };
      case "trusted_merchant":
        const merchantInfo = info as GrantInfo<"trusted_merchant">;
        return {
          grant_type: grantType,
          client_id: merchantInfo.clientId,
          client_secret: merchantInfo.clientSecret,
          email: merchantInfo.email,
          ext_customer_id: merchantInfo.extCustomerId,
        };
      default:
        throw new Error("Invalid grant type");
    }
  };

  return fetch(env.PAYU_API_HOST + "/pl/standard/user/oauth/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body()),
  }).then((res) => res.json());
}

type GrantType = "client_credentials" | "partner" | "trusted_merchant";

type GrantInfo<T extends GrantType> = T extends "client_credentials"
  ? { clientId: string; clientSecret: string }
  : T extends "partner"
    ? { clientId: string; clientSecret: string; partnerId: string }
    : T extends "trusted_merchant"
      ? {
          clientId: string;
          clientSecret: string;
          email: string;
          extCustomerId: string;
        }
      : never;
