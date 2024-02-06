import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};
export function H1({ className, ...props }: Props) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props} />
    );
}
export function H2({ className, ...props }: Props) {
    return (
        <h2
            className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-4xl", className)}
            {...props}
        />
    );
}

export function H3({ className, ...props }: Props) {
    return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />;
}

export function H4({ className, ...props }: Props) {
    return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />;
}
