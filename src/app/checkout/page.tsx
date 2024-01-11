import React from "react";
import Section from "~/components/global/Section";
import { Header } from "~/components/teceerui/layout";
import Checkout from "./Checkout";
import { cookies } from "next/headers";
import { api } from "~/trpc/server";
import ActionBar from "~/components/elements/ActionBar";
import CartItems from "~/components/elements/CartItems";

export default async function page() {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return <div>Nie znaleziono koszyka.</div>;
  }

  const cart = await api.cart.get.query(cartId);

  if (!cart?.items.length) {
    return <div>Brak przedmiotów w koszyku.</div>;
  }

  return (
    <>
      <Header currentPath="Podsumowanie">Podsumowanie</Header>
      <Section>
        <Checkout />
      </Section>
      <ActionBar variant="bar">
        <CartItems />
      </ActionBar>
    </>
  );
}
