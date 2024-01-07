"use client";
import React from "react";
import { api } from "~/trpc/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Action } from "./ActionBar";
import { ShoppingBag, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import price from "../global/price";
import { toast } from "sonner";

export default function CartItems({ cartId }: { cartId: string }) {
  const { data: cart } = api.cart.get.useQuery(cartId);
  const utils = api.useUtils();
  const removeCartItem = api.cart.remove.useMutation({
    async onMutate({ cartId, poolId }) {
      await utils.cart.get.cancel();
      const previousCart = utils.cart.get.getData();
      utils.cart.get.setData(cartId, (cart) => ({
        id: cartId,
        userId: cart?.userId ?? null,
        createdAt: cart?.createdAt ?? new Date(),
        updatedAt: cart?.updatedAt ?? new Date(),
        items: [
          ...(cart?.items.filter((item) => item.poolId !== poolId) ?? []),
        ],
      }));

      return { previousCart };
    },
    onError(err, data, ctx) {
      utils.cart.get.setData(cartId, ctx?.previousCart);
      toast.error(
        "Coś poszło nie tak. Spróbuj ponownie dodać przedmiot do koszyka.",
      );
    },
    async onSettled() {
      await utils.cart.get.invalidate();
    },
  });
  if (!cart?.items.length) return null;

  const itemsQuantity = cart?.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
      <Sheet>
        <SheetTrigger asChild>
          <Action variant="ghost">
            Wyświetl koszyk{!!itemsQuantity && ` (${itemsQuantity})`}
          </Action>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <p>Twój koszyk</p>
                <div className="flex items-center justify-center gap-1 rounded-full bg-blue-500 px-1.5 py-0.5 text-center text-sm text-white">
                  <ShoppingBag size={14} />
                  {itemsQuantity}
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="mt-8 h-72">
            <div className="flex flex-col gap-2">
              {cart?.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-xl border bg-background p-2"
                >
                  <div className="shrink-0 px-1">
                    <p>{item.Pool.TicketType?.name}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x {price(item.Pool.price)}
                    </p>
                  </div>
                  <X
                    className="text-muted-foreground"
                    size={20}
                    onClick={() => {
                      removeCartItem.mutate({
                        cartId,
                        poolId: item.poolId,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
