import { Discount } from "@prisma/client";

export default function price(priceInLowestValue: number) {
  const price = priceInLowestValue / 100;
  return price.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

export function calculatePrice(
  price: number,
  quantity: number,
  discount?: Discount | null
) {
  const priceAmount = price / 100;

  if (discount) {
    if (discount.type === "PERCENTAGE") {
      const discountAmount = (priceAmount * discount.amount) / 100;
      const discountedPrice = priceAmount - discountAmount;
      const totalAmount = discountedPrice * quantity;
      return totalAmount.toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN",
      });
    } else if (discount.type === "AMOUNT") {
      const discountedPrice = priceAmount - discount.amount;
      const totalAmount = discountedPrice * quantity;
      return totalAmount.toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN",
      });
    }
  } else {
    const totalAmount = priceAmount * quantity;
    return totalAmount.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
    });
  }
}

export function calculatePriceAmount(
  price: number,
  quantity: number,
  discount?: Discount | null
) {
  const priceAmount = price;

  if (discount) {
    if (discount.type === "PERCENTAGE") {
      const discountAmount = (priceAmount * discount.amount) / 100;
      const discountedPrice = priceAmount - discountAmount;
      const totalAmount = discountedPrice * quantity;
      return totalAmount;
    } else if (discount.type === "AMOUNT") {
      const discountedPrice = priceAmount - discount.amount;
      const totalAmount = discountedPrice * quantity;
      return totalAmount;
    }
  } else {
    const totalAmount = priceAmount * quantity;
    return totalAmount;
  }
}
