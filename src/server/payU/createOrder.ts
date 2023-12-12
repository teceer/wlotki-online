"use server";

import { env } from "~/env.mjs";
import createOAuthToken from "./createOAuthToken";

export default async function createOrder(props: OrderProps) {
  const token = await createOAuthToken("client_credentials", {});

  const body: Order = {
    ...props.order,
    merchantPosId: props.order.merchantPosId ?? env.PAYU_POS_ID,
    currencyCode: props.order.currencyCode ?? "PLN",
    continueUrl: (props.host ?? env.APP_URL) + "/payment/continue",
    notifyUrl: (props.host ?? env.APP_URL) + "/api/v1/payu/notify",
  };
  console.log(JSON.stringify(body, null, 2));

  const response = await fetch(env.PAYU_API_HOST + "/api/v2_1/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
      "Content-Type": "application/json",
    },
    redirect: "manual",
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as OrderResponse;
  console.log(response.status, response.statusText, data);
  return data;
}

type OrderProps = {
  order: Partial<Order> & {
    customerIp: string;
    description: string;
    totalAmount: string;
    products: Product[];
  };
  host?: string;
};

type OrderResponse = {
  status: {
    statusCode: string;
    security: string;
  };
  redirectUri: string;
  iframeAllowed: boolean;
  threeDsProtocolVersion: string;
  orderId: string;
  extOrderId: string;
  payMethods: {
    payMethod: {
      card: {
        number: number;
        expirationMonth: number;
        expirationYear: number;
      };
      type: string;
      value: string;
    };
  };
};

type Order = {
  customerIp: string; // Payer’s IP address, e.g. 123.123.123.123. Note: 0.0.0.0 is not accepted.
  merchantPosId: string; // Point of sale ID.
  description: string; // Description of the order.
  currencyCode: string;
  totalAmount: string;

  continueUrl?: string; // <= 1024 characters Address for redirecting the customer after payment is commenced.
  notifyUrl?: string; // The address for sending notifications
  additionalDescription?: string; // Additional description of the order.
  visibleDescription?: string; // <= 80 characters Order/Payment description visible for Buyer on the PayU payment page.
  statementDescription?: string; // <= 22 characters Payment recipient name followed by payment description (order ID, ticket number etc) visible on card statement. The name should be easy to recognize by the cardholder. If field is not provided, static name configured by PayU will be used.
  extOrderId?: string; // ID of an order used in merchant system. Order identifier assigned by the merchant. It enables merchants to find a specific order in their system. This value must be unique within a single POS.
  validityTime?: string;
  cardOnFile?: string;
  recurring?: "FIRST" | "STANDARD";
  buyer?: Buyer;
  shoppingCarts?: ShoppingCart[];
  products: Product[];
  payMethods?: PayMethod;
  mcpData?: McpData;
  threeDsAuthentication?: ThreeDsAuthentication;
  credit?: Credit;
  submerchant?: Submerchant;
  deviceFingerprint?: string; // Hashed identifier of the user or its device.
};

type Submerchant = {
  id: string;
};

type Buyer = {
  extCustomerId?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  nin?: string;
  language?: string;
  delivery?: Delivery;
};

type Delivery = {
  street: string;
  postalBox: string;
  postalCode: string;
  city: string;
  state: string;
  countryCode: string;
  name: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
};

type ShoppingCart = {
  extCustomerId: string;
  amount: number;
  fee?: string;
  shippingMethods: ShippingMethod[];
  products: Product[];
};

type ShippingMethod = {
  country: string;
  price: number;
  name: string;
};

type Product = {
  name: string;
  unitPrice: string;
  quantity: string;
  virtual?: boolean;
  listingDate?: string;
};

type PayMethod = {
  type:
    | "PBL"
    | "CARD_TOKEN"
    | "PAYMENT_WALL"
    | "BLIK_AUTHORIZATION_CODE"
    | "BLIK_TOKEN";
  value: string;
  authorizationCode?: string;
  authorizationType?: "PRE_AUTHORIZATION" | "AUTHORIZATION";
  card?: CardPlainData;
  specificData?: SpecificData[];
  blikData?: BlikData;
  threeDsData?: ThreeDsData;
};

type CardPlainData = {
  number: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  firstTransactionId?: string;
};

type SpecificData = {
  name: string;
  value: string;
  amount: string;
};

type BlikData = {
  aliasLabelProposal?: string;
  registerTokenValue?: string;
  register?: boolean;
  appKey?: string;
  recommendedAuthLevel?: "NO_CONFIRMATION" | "REQUIRED_CONFIRMATION";
};

type ThreeDsData = {
  status3Ds: "Y" | "A";
  status3DsDescription?: string;
  xid?: string; // 1 to 20 characters (plain text), 28 characters (Base64encoded), or 40 characters (HEXencoded).
  dsTransactionId: string; // 1 to 36 characters
  eciCode: "5" | "6" | "7" | "2" | "1" | "0";
  cavv?: string; // 1 to 200 characters
};

type McpData = {
  mcpCurrency: string;
  mcpAmount: string;
  mcpRate: string;
  mcpFxTableId: string;
  mcpPartnerId: string;
};

type ThreeDsAuthentication = {
  challangeRequested?: "YES" | "NO" | "MANDATE";
  exemption?: Exemption;
  riskScore?: string; // <= 128 characters
  browser?: BrowserData;
  sdk?: SdkData;
  merchantRiskIndicator?: MerchantRiskIndicator;
  merchantFunds?: MerchantFunds;
  recurring?: RecurringData;
  cardholder?: CardholderData;
};

type Exemption = {
  value: "LOW_RISK" | "LOW_VALUE";
  rejectionHandling: "PERFORM_AUTHENTICATION" | "DECLINE";
};

type BrowserData = {
  acceptHeaders: string;
  requestIP: string;
  screenWidth: string;
  javaEnabled: boolean;
  timezoneOffset: string;
  screenHeight: string;
  userAgent: string;
  colorDepth: string;
  language: string; // Max. 8 chars
};

type SdkData = {
  sdkReferenceNumber: string;
  sdkMaxTimeout: string; // In minutes, >= 05
  sdkAppID: string;
  sdkEncData: string;
  sdkTransID: string;
  sdkEphemPubKey: SdkEphemPubKey;
};

type SdkEphemPubKey = {
  y: string;
  x: string;
  kty: string;
  crv: string;
};

type MerchantRiskIndicator = {
  orderType: "PURCHASE" | "ACC_FUNDING" | "LOAN";
  shipIndicator:
    | "BILLING_ADDRESS"
    | "VERIFIED_ADDRESS"
    | "OTHER_ADDRESS"
    | "SHIP_TO_STORE"
    | "DIGITAL_GOODS"
    | "TICKETS"
    | "NOT_SHIPPED";
  preOrdered: boolean;
  preOrderedDate?: string; // ISO format
  deliveryTimeFrame:
    | "ELECTRONIC"
    | "SAME_DAY"
    | "OVERNIGHT"
    | "TWO_OR_MORE_DAYS";
  reordered: boolean;
};

type MerchantFunds = {
  amount: string; // In pennies
  currencyCode: string; // ISO 4217
};

type RecurringData = {
  frequency?: string;
  expiry?: string; // ISO format, e.g., "2025-03-27T00:00:00.000Z"
};

type CardholderData = {
  name: string;
  accountInformation?: AccountInformation;
  billingAddress?: BillingAddress;
};

type AccountInformation = {
  createDate?: string; // ISO format
  suspiciousActivity?: boolean;
  deliveryAddressFirstUsedDate?: string; // ISO format
  deliveryAdressUsageIndicator?:
    | "THIS_TRANSACTION"
    | "LESS_THAN_30_DAYS"
    | "30_TO_60_DAYS"
    | "MORE_THAN_60_DAYS";
  pastOrdersYear?: number; // 1 to 9999
  pastOrdersDay?: number; // 1 to 9999
  purchasesLastSixMonths?: number; // 1 to 9999
  changeDate?: string; // ISO format
  changeIndicator?:
    | "THIS_TRANSACTION"
    | "LESS_THAN_30_DAYS"
    | "30_TO_60_DAYS"
    | "MORE_THAN_60_DAYS";
  passwordChanged?: string; // ISO format
  passwordChangeIndicator?:
    | "NO_CHANGE"
    | "THIS_TRANSACTION"
    | "LESS_THAN_30_DAYS"
    | "30_TO_60_DAYS"
    | "MORE_THAN_60_DAYS";
  nameToRecipientMatch?: boolean;
  addCardAttemptsDay?: string;
  authMethod?:
    | "GUEST"
    | "LOGIN"
    | "FEDERATED_ID"
    | "THIRD_PARTY"
    | "ISSUER"
    | "FIDO";
  authDateTime?: string; // ISO format
  cardAddedDate?: string; // ISO format
  cardAddedIndicator?:
    | "GUEST"
    | "THIS_TRANSACTION"
    | "LESS_THAN_30_DAYS"
    | "30_TO_60_DAYS"
    | "MORE_THAN_60_DAYS";
};

type BillingAddress = {
  street: string; // 1 to 50 characters
  postalCode: string; // 1 to 16 characters
  city: string; // 1 to 50 characters
  state: string; // 1 to 3 characters, ISO-3166
  countryCode: string; // 1 to 2 characters, ISO-3166
};

type CreditShoppingCart = {
  shippingMethod: CreditShippingMethod;
  products: Product[];
  extCustomerId: string;
  additionalInfo?: AdditionalInfo;
};

type CreditShippingMethod = {
  type:
    | "COURIER"
    | "COLLECTION_POINT_PICKUP"
    | "PARCEL_LOCKER"
    | "STORE_PICKUP";
  price: string;
  address: Address;
  pointId?: string;
};

type Address = {
  street: string;
  streetNo: string;
  flatNo?: string;
  postalCode: string;
  city: string;
  countryCode: string;
};

type Applicant = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  language: string; // ISO-639-1
  nin?: string;
  address: Address;
};

type AdditionalInfo = {
  hasSuccessfullyFinishedOrderInShop: string;
};

type Credit = {
  shoppingCarts?: CreditShoppingCart[];
  applicant?: Applicant;
};
