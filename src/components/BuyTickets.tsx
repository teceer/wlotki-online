"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import price from "./global/price";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "~/lib/utils";
import ClientPortal from "./global/ClientPortal";
import ActionBar, { Action } from "./elements/ActionBar";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "./ui/button";
import type { Drop, Pool, TicketType } from "@prisma/client";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function BuyTickets({ eventId }: { eventId: string }) {
  const { data: drops } = api.drop.buyTickets.useQuery(eventId);
  const defaultValue =
    drops?.find((drop) => drop.status === "ACTIVE")?.id ?? // select the first ACTIVE drop
    drops?.find((drop) => drop.status === "UPCOMING")?.id ?? // select the first UPCOMING drop
    drops?.[drops.length - 1]?.id; // select the last drop

  const [count, setCount] = React.useState(1);

  const [selectedDrop, setSelectedDrop] = React.useState<Drop | undefined>(
    undefined,
  );

  const [selectedPool, setSelectedPool] = React.useState<
    (Pool & { TicketType: TicketType | null }) | undefined
  >(undefined);

  function createCartId() {
    const id = Math.random().toString(36).substring(2, 15);
    setCookie("cartId", id);
    return id;
  }

  const cartId = getCookie("cartId") ?? createCartId();
  const utils = api.useUtils();
  const { data: cart } = api.cart.get.useQuery(cartId);
  const createCart = api.cart.add.useMutation({
    async onMutate({ cartId, poolId, quantity }) {
      await utils.cart.get.cancel();
      const previousCart = utils.cart.get.getData();
      if (!selectedPool) {
        toast.error("Wybierz pulę");
        return { previousCart };
      }
      utils.cart.get.setData(cartId, (cart) => ({
        id: cartId,
        userId: cart?.userId ?? null,
        createdAt: cart?.createdAt ?? new Date(),
        updatedAt: cart?.updatedAt ?? new Date(),
        items: [
          {
            id: Math.random().toString(36).substring(2, 15),
            cartId,
            poolId,
            quantity:
              quantity +
              (cart?.items.find((item) => item.poolId === poolId)?.quantity ??
                0),
            createdAt: new Date(),
            updatedAt: new Date(),
            Pool: {
              ...selectedPool,
            },
          },
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

  if (!drops?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        onValueChange={(value) =>
          setSelectedDrop(drops?.find((drop) => drop.id === value))
        }
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-1/2 bg-background">
          <SelectValue placeholder="Wybierz pulę" />
        </SelectTrigger>
        <SelectContent>
          {drops.map((drop, index) => (
            <SelectItem
              value={drop.id}
              key={drop.id}
              disabled={drop.status === "ENDED"}
            >
              {drop.name ?? "DROP " + (index + 1)}
              {drop.status === "ENDED" ? " - SOLDOUT" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Tabs
        defaultValue={defaultValue}
        value={selectedDrop?.id}
        className="w-full"
      >
        {drops.map((drop) => (
          <TabsContent value={drop.id} key={drop.id}>
            <RadioGroup
              className="flex flex-wrap gap-2"
              onValueChange={(value) =>
                setSelectedPool(drop.Pool.find((pool) => pool.id === value))
              }
            >
              {drop.Pool.map((pool) => {
                const cartQuantity = cart?.items
                  .filter((item) => item.poolId === pool.id)
                  .reduce((acc, item) => acc + item.quantity, 0);

                return (
                  <RadioGroupItem
                    value={pool.id}
                    key={pool.id}
                    className={cn(
                      "relative min-w-[150px] grow rounded-xl border bg-background p-3",
                      pool.id === selectedPool?.id && "ring-1 ring-blue-500",
                    )}
                  >
                    <p>{pool.TicketType?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {price(pool.price)}
                    </p>
                    {!!cartQuantity && (
                      <div className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-full bg-blue-500 px-1 py-0.5 text-center text-xs text-white">
                        <ShoppingBag size={12} />
                        {cartQuantity}
                      </div>
                    )}
                  </RadioGroupItem>
                );
              })}
            </RadioGroup>
          </TabsContent>
        ))}
      </Tabs>
      {selectedPool?.id && (
        <ClientPortal selector="actionbar">
          <ActionBar variant="bar" className="space-y-1">
            <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
              <Action
                variant="ghost"
                onClick={() => {
                  createCart.mutate({
                    cartId,
                    poolId: selectedPool?.id,
                    quantity: count,
                  });
                  setCount(1);
                }}
              >
                Dodaj do koszyka
              </Action>
              <div className="flex grow justify-end gap-2">
                <Button
                  variant="secondary"
                  className="w-max rounded-full rounded-r-none px-3 py-6 transition-all"
                  onClick={() => setCount(count - 1 > 0 ? count - 1 : 1)}
                >
                  <Minus />
                </Button>
                <div className="flex min-w-[50px] items-center justify-center px-3">
                  <p className="text-lg font-bold">{count}</p>
                </div>
                <Button
                  variant="secondary"
                  className="w-max rounded-full rounded-l-none px-3 py-6 transition-all"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
            <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
              <Action variant="ghost" disabled className="disabled:opacity-100">
                Suma: {price((selectedPool?.price ?? 0) * count)}
              </Action>
              <Action variant="blue">Kup teraz</Action>
            </div>
            <CartItems cartId={cartId} />
          </ActionBar>
        </ClientPortal>
      )}
    </div>
  );
}

function SelectCount({
  pool,
  count,
  setCount,
}: {
  pool?: Pool;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
      <div className="flex grow items-center justify-center px-4 text-sm font-medium">
        Suma: {price((pool?.price ?? 0) * count)}
      </div>
      <div className="flex grow justify-end gap-2">
        <Button
          variant="secondary"
          className="w-max rounded-full rounded-r-none px-3 py-6 transition-all"
          onClick={() => setCount(count - 1 > 0 ? count - 1 : 1)}
        >
          <Minus />
        </Button>
        <div className="flex min-w-[50px] items-center justify-center px-3">
          <p className="text-lg font-bold">{count}</p>
        </div>
        <Button
          variant="secondary"
          className="w-max rounded-full rounded-l-none px-3 py-6 transition-all"
          onClick={() => setCount(count + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

function _CartItems({ cartId }: { cartId: string }) {
  const { data: cart } = api.cart.get.useQuery(cartId);
  const [parent] = useAutoAnimate();
  if (!cart?.items.length) return null;

  return (
    <div className="relative flex justify-between gap-2 overflow-hidden rounded-full border shadow-md backdrop-blur transition-all">
      <ScrollArea>
        <div className="flex gap-2" ref={parent}>
          {cart?.items.map((item) => (
            <div
              key={item.id}
              className="flex w-max items-center rounded-full bg-background/30 px-3 py-2 backdrop-blur"
            >
              <div className="shrink-0 px-1 text-xs">
                <p>
                  {item.quantity} x {item.Pool.TicketType?.name}
                </p>
                <p className="text-muted-foreground">
                  {price(item.Pool.price)}
                </p>
              </div>
              <X className="text-muted-foreground" size={20} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

function CartItems({ cartId }: { cartId: string }) {
  const { data: cart } = api.cart.get.useQuery(cartId);
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
                      {price(item.Pool.price)}
                    </p>
                  </div>
                  <X className="text-muted-foreground" size={20} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
