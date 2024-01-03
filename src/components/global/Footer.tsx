import Link from "next/link";
import Section from "./Section";
import Image from "next/image";

export default function Footer() {
  return (
    <Section
      SectionClassName="pt-8 bg-gradient-to-t dark:from-black from-neutral-100"
      DivClassName="space-y-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt=""
                width={24}
                height={24}
                className="h-[24px] w-[24px] dark:invert"
              />
              <p className="bg-gradient-to-tr from-foreground to-foreground/70 bg-clip-text text-xl font-medium tracking-tighter text-transparent">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </p>
            </div>
          </Link>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-black/30 dark:from-white/30" />
      </div>
      <div className="grid grid-cols-2 justify-center gap-2">
        <Link
          href={"/regulamin"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Zwroty
        </Link>
        <Link
          href={"/regulamin"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Regulamin
        </Link>
        <Link
          href={"/polityka-prywatnosci"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Polityka prywatności
        </Link>
        <Link
          href={"/bilety"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Twoje Bilety
        </Link>
        <Link
          href={"/"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Instagram
        </Link>
        <Link
          href={"/kontakt"}
          className="rounded border border-dotted px-4 py-2 text-xs font-light backdrop-blur"
        >
          Kontakt
        </Link>
      </div>
      <div className="container py-2">
        <div className="grid auto-cols-auto grid-flow-col">
          <p className="text-center text-xs font-light opacity-20">
            developed by{" "}
            <a className="underline" href="https://instagram.com/wchudzikowski">
              @wchudzikowski
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
