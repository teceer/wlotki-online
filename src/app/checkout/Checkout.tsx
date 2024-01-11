"use client";
import { getCookie, setCookie } from "cookies-next";
import React from "react";
import { v4 } from "uuid";
import price from "~/components/global/price";
import { api } from "~/trpc/react";

export default function Checkout() {
  const [cartId, setCartId] = React.useState<string>("");
  const { data: cart } = api.cart.get.useQuery(cartId);
  function createCartId() {
    const id = v4();
    setCookie("cartId", id);
    return id;
  }
  React.useEffect(() => {
    if (!cartId && !cart?.id) {
      setCartId(getCookie("cartId") ?? createCartId());
    }
    if (cart?.id) {
      setCartId(cart.id);
    }
  }, [cart?.id, cartId]);

  const cartPrice =
    cart?.items.reduce((acc, item) => {
      return acc + item.Pool.price * item.quantity;
    }, 0) ?? 0;

  const events =
    cart?.items
      .map((item) => item.Pool.Drop?.Event)
      .filter((event, index, self) => {
        return self.findIndex((e) => e?.id === event?.id) === index;
      }) ?? [];

  return (
    <div>
      {/* {cart?.items.map((item) => {
          return (
            <li
              key={item.id}
              className="flex w-full justify-between gap-1 px-3 py-1"
            >
              <p className="grow">{item.Pool.TicketType?.name}</p>
              <p className="text-muted-foreground">{item.quantity} x</p>
              <p className="text-muted-foreground">
                {price(item.Pool.price)} ={" "}
              </p>
              <p>{price(item.Pool.price * item.quantity)}</p>
            </li>
          );
        })} */}
      {events?.map((event) => {
        return (
          <div key={event?.id} className="space-y-2">
            <div className="flex gap-1 items-center">
              <div className="h-[1px] w-2 bg-secondary" />
              <p className="text-muted-foreground">{event?.title}</p>
              <div className="h-[1px] grow bg-secondary" />
            </div>
            <ul>
              {cart?.items
                .filter((item) => item.Pool.Drop?.Event?.id === event?.id)
                .map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex w-full justify-between gap-1 px-3 py-1"
                    >
                      <p className="grow">{item.Pool.TicketType?.name}</p>
                      <p className="text-muted-foreground">{item.quantity} x</p>
                      <p className="text-muted-foreground">
                        {price(item.Pool.price)} ={" "}
                      </p>
                      <p>{price(item.Pool.price * item.quantity)}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
      <li className="flex w-full justify-between gap-1 rounded-lg border px-3 py-1 text-lg">
        <p className="grow">Razem</p>
        <p>{price(cartPrice)}</p>
      </li>
    </div>
  );
}
