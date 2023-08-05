"use client";

import clsx from "clsx";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useButton, AriaButtonProps, useHover, useFocusRing, mergeProps } from "react-aria";
import { mergeRefs } from "react-merge-refs";

type Props = AriaButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof variants> & {
        loading?: boolean;
    };

const Loader = ({ className }: { className?: string }) => {
    return (
        <div
            className={twMerge("absolute h-4 w-4 animate-spin rounded-full border-2 border-stone-50", className, "border-b-transparent")}
        />
    );
};

const variants = cva(
    [
        "flex",
        "items-center",
        "justify-center",
        "rounded-lg",
        "tracking-wide",
        "font-medium",
        "shadow-sm",
        "outline-none",
        "ring-offset-2",
        "transition",
        "border-[1.5px]",
        "border-transparent",
        "data-[pressed=true]:scale-[0.99]",
        "data-[focus-visible=true]:ring-2",
        "disabled:!cursor-not-allowed",
        "disabled:!shadow-sm",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-orange-300 dark:bg-orange-400/95",
                    "text-stone-50",
                    "ring-orange-200",
                    "data-[hovered=true]:bg-orange-200",
                    "data-[pressed=true]:bg-orange-400",
                    "disabled:!bg-orange-300/50 dark:disabled:!bg-orange-100/25",
                ],
                secondary: [
                    "shadow",
                    "bg-stone-50",
                    "text-stone-800",
                    "ring-stone-700",
                    "data-[hovered=true]:bg-white",
                    "data-[pressed=true]:bg-stone-100",
                    "disabled:!bg-stone-50/50",
                    "disabled:!text-stone-700/50",
                ],
                danger: [
                    "bg-red-500 dark:bg-red-600",
                    "text-stone-50",
                    "ring-red-500 dark:ring-red-600",
                    "data-[hovered=true]:bg-red-400 dark:data-[hovered=true]:bg-red-500",
                    "data-[pressed=true]:bg-red-600 dark:data-[pressed=true]:bg-red-700",
                    "disabled:!bg-red-500/50 dark:disabled:!bg-red-600/20",
                ],
                success: [
                    "bg-green-500 dark:bg-green-600",
                    "text-stone-50",
                    "ring-green-500 dark:ring-green-600",
                    "data-[hovered=true]:bg-green-400 dark:data-[hovered=true]:bg-green-500",
                    "data-[pressed=true]:bg-green-600 dark:data-[pressed=true]:bg-green-700",
                    "disabled:!bg-green-500/50 dark:disabled:!bg-green-600/20",
                ],
                outline: [
                    "shadow-none",
                    "bg-transparent",
                    "text-orange-300 dark:text-orange-400",
                    "ring-orange-300 dark:ring-orange-400",
                    "border-orange-300 dark:border-orange-400",
                    "data-[hovered=true]:border-orange-200 dark:data-[hovered=true]:border-orange-300",
                    "data-[hovered=true]:text-orange-200 dark:data-[hovered=true]:text-orange-300",
                    "data-[pressed=true]:border-orange-400 dark:data-[pressed=true]:border-orange-500",
                    "data-[pressed=true]:text-orange-400 dark:data-[pressed=true]:text-orange-500",
                    "disabled:!shadow-none",
                    "disabled:!text-orange-300/50 dark:disabled:!text-orange-100/25",
                    "disabled:!border-orange-300/50 dark:disabled:!border-orange-100/25",
                ],
                link: [
                    "shadow-none",
                    "bg-transparent",
                    "text-orange-300 dark:text-orange-400",
                    "ring-orange-200 dark:ring-orange-300",
                    "data-[hovered=true]:text-orange-200 dark:data-[hovered=true]:text-orange-300",
                    "data-[pressed=true]:text-orange-400 dark:data-[pressed=true]:text-orange-500",
                    "disabled:!shadow-none",
                    "disabled:!text-orange-300/50 dark:disabled:!text-orange-100/25",
                ],
                ghost: [
                    "shadow-none",
                    "bg-transparent",
                    "text-stone-800 dark:text-stone-100",
                    "ring-stone-700 dark:ring-stone-200",
                    "data-[hovered=true]:bg-stone-100 dark:data-[hovered=true]:bg-stone-800",
                    "data-[pressed=true]:bg-stone-200 dark:data-[pressed=true]:bg-stone-800",
                    "disabled:!shadow-none",
                    "disabled:!text-stone-800/50 dark:disabled:!text-stone-100/25",
                    "disabled:!bg-transparent",
                ],
                google: [
                    "bg-sky-600",
                    "text-stone-50",
                    "ring-sky-600",
                    "data-[hovered=true]:bg-sky-500",
                    "data-[pressed=true]:bg-sky-600",
                    "disabled:!bg-sky-600/50",
                ],
                icon: [
                    "bg-transparent",
                    "text-stone-500",
                    "ring-transparent",
                    "ring-0",
                    "ring-offset-0",
                    "data-[hovered=true]:text-orange-300",
                    "data-[pressed=true]:text-orange-400",
                    "data-[focus-visible=true]:text-orange-300",
                    "shadow-none",
                    "border-none",
                    "data-[pressed=true]:scale-[1]",
                    "!px-0",
                    "!py-0",
                ],
            },
            size: {
                small: ["text-sm", "px-[0.6563rem]", "py-[0.4063rem]"],
                normal: ["px-[0.9063rem]", "py-[0.4063rem]"],
                large: ["text-lg", "px-[1.1563rem]", "py-[0.4063rem]"],
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "normal",
        },
    }
);

const Button = forwardRef<HTMLButtonElement, Props>((props, forwardedRef) => {
    const { children, className, loading, disabled, variant, type = "button", size, ...rest } = props;
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps, isPressed } = useButton({ ...props, isDisabled: disabled || loading }, ref);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);
    return (
        <button
            ref={mergeRefs([ref, forwardedRef])}
            {...rest}
            className={twMerge(variants({ variant, size, className }))}
            type={type}
            {...mergeProps(buttonProps, hoverProps, focusProps)}
            data-loading={loading}
            data-pressed={isPressed}
            data-hovered={isHovered}
            data-focus-visible={isFocusVisible}
        >
            {loading && (
                <Loader
                    className={clsx({
                        "border-stone-700": variant === "secondary" || variant === "ghost",
                        "border-orange-300": variant === "outline" || variant === "link",
                    })}
                />
            )}
            <span
                className={clsx("flex items-center justify-center gap-2 transition", {
                    "opacity-0": loading,
                    "opacity-100": !loading,
                })}
            >
                {children}
            </span>
        </button>
    );
});

Button.displayName = "Button";

export default Button;
