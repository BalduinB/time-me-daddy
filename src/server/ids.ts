import { ulid } from "ulid";

const prefixes = {
    project: "proj",
    task: "task",
} as const;

export function createID(prefix: keyof typeof prefixes): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return `${prefixes[prefix]}_${ulid()}`;
}
