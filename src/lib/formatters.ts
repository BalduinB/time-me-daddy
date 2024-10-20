import { format as f } from "date-fns";
import { de } from "date-fns/locale";
export function fDate(date: Date, format: string = "dd MMM yyyy HH:mm") {
    return f(date, format, { locale: de });
}
