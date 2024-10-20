import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

export function H1({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className,
            )}
            {...props}
        />
    );
}
export function H2({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <h2
            className={cn(
                "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        />
    );
}
export function H3({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    );
}
export function H4({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    );
}

const pVariants = cva("leading-7 ", {
    variants: {
        variant: {
            muted: "text-muted-foreground",
            default: "text-foreground",
            destructive: "text-destructive-foreground",
        },
        size: {
            sm: "text-sm",
            default: "text-base",
            lg: "text-lg",
        },

        weight: {
            light: "font-light",
            default: "font-normal",
            semibold: "font-semibold",
            bold: "font-bold",
        },
        space: {
            true: "[&:not(:first-child)]:mt-4",
        },
    },
    defaultVariants: {
        size: "default",
        weight: "default",
        space: false,
    },
});
export function P({
    weight,
    size,
    space,
    variant,
    className,
    ...props
}: PropsWithChildren<VariantProps<typeof pVariants> & { className?: string }>) {
    return (
        <p
            className={cn(
                pVariants({ weight, size, space, variant }),
                className,
            )}
            {...props}
        />
    );
}

export function Blockquote({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <blockquote
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
            {...props}
        />
    );
}

export function Code({
    className,
    ...props
}: PropsWithChildren<{ className?: string }>) {
    return (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className,
            )}
            {...props}
        />
    );
}
