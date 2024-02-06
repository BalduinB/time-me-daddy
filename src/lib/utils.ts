import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isEmptyObject(o: object) {
    return !!Object.values(o).every((val) => val === undefined);
}
