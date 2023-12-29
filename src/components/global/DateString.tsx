import { parseISO, format } from "date-fns";
import pl from "date-fns/locale/pl";

export default function DateString(props: {
  date: Date;
  format: string;
}) {
  const date = props.date;

  if (typeof date === "string") {
    const dateISO = parseISO(date);
    return (
      <time dateTime={date} className="capitalize">
        {format(dateISO, props.format, { locale: pl })}
      </time>
    );
  }

  return (
    <time dateTime={date.toString()} className="capitalize">
      {format(date, props.format, { locale: pl })}
    </time>
  );
}
