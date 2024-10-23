import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Icons } from "./icons";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground [&>.loader]:text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 [&>.loader]:text-destructive-foreground",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground [&>.loader]:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 [&>.loader]:text-secondary-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground [&>.loader]:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline [&>.loader]:text-primary",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            children,
            isLoading = false,
            disabled,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                    isLoading && "text-transparent",
                )}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                <>
                    {isLoading && <Icons.spinner className="loader absolute" />}{" "}
                    {children}
                </>
            </Comp>
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
