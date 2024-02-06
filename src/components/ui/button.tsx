import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "p-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
type InteractiveButtonProps = DefaultButtonProps & { isLoading?: boolean; asChild?: false };
type SlotalbleButtonProps = DefaultButtonProps & { asChild: true };
export type ButtonProps = InteractiveButtonProps | SlotalbleButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (generalProps = { asChild: false, isLoading: false }, ref) => {
        if (generalProps.asChild) {
            const { className, variant, size, children, ...props } = generalProps;
            return (
                <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
                    {children}
                </Slot>
            );
        }
        const { className, variant, size, children, isLoading, ...props } = generalProps;
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }), isLoading && "text-transparent")}
                ref={ref}
                {...props}
            >
                <>
                    {children}
                    {isLoading && <Spinner className="absolute text-white" />}
                </>
            </button>
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
