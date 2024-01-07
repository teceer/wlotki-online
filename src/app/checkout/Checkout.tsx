"use client";
import React from "react";
import price from "~/components/global/price";
import { api } from "~/trpc/react";

export default function Checkout({ cartId }: { cartId: string }) {
  const { data: cart } = api.cart.get.useQuery(cartId);
  const cartPrice =
    cart?.items.reduce((acc, item) => {
      return acc + item.Pool.price * item.quantity;
    }, 0) ?? 0;

  return (
    <div>
      <ul>
        {cart?.items.map((item) => {
          return (
            <li key={item.id} className="flex w-full justify-between gap-1 px-3 py-1">
              <p className="grow">{item.Pool.TicketType?.name}</p>
              <p className="text-muted-foreground">{item.quantity} x</p>
              <p className="text-muted-foreground">
                {price(item.Pool.price)} ={" "}
              </p>
              <p>{price(item.Pool.price * item.quantity)}</p>
            </li>
          );
        })}
        <li className="flex w-full justify-between gap-1 px-3 py-1 text-lg rounded-lg border">
          <p className="grow">Razem</p>
          <p>{price(cartPrice)}</p>
        </li>
      </ul>
    </div>
  );
}
