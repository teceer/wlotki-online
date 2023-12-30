import { parseISO, format } from "date-fns";
import pl from "date-fns/locale/pl";
import type { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export default function DateString(props: {
  date: Date;
  format: string;
  className?: ClassNameValue;
}) {
  const date = props.date;

  if (typeof date === "string") {
    const dateISO = parseISO(date);
    return (
      <time dateTime={date} className={cn("capitalize", props.className)}>
        {format(dateISO, props.format, { locale: pl })}
      </time>
    );
  }

  return (
    <time dateTime={date.toString()} className={cn("capitalize", props.className)}>
      {format(date, props.format, { locale: pl })}
    </time>
  );
}
