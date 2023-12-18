"use server";
import { revalidatePath as cache_revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function revalidatePath(path: string) {
  return cache_revalidatePath(path);
}
