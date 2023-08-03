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
        label: string;
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
                    "bg-orange-300",
                    "text-stone-50",
                    "ring-orange-200",
                    "data-[hovered=true]:bg-orange-200",
                    "data-[pressed=true]:bg-orange-400",
                    "disabled:!bg-orange-300/50",
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
                    "bg-red-500",
                    "text-stone-50",
                    "ring-red-500",
                    "data-[hovered=true]:bg-red-400",
                    "data-[pressed=true]:bg-red-600",
                    "disabled:!bg-red-500/50",
                ],
                success: [
                    "bg-green-500",
                    "text-stone-50",
                    "ring-green-500",
                    "data-[hovered=true]:bg-green-400",
                    "data-[pressed=true]:bg-green-600",
                    "disabled:!bg-green-500/50",
                ],
                outline: [
                    "shadow-none",
                    "bg-transparent",
                    "text-orange-300",
                    "ring-orange-300",
                    "border-orange-300",
                    "data-[hovered=true]:border-orange-200",
                    "data-[hovered=true]:text-orange-200",
                    "data-[pressed=true]:border-orange-400",
                    "data-[pressed=true]:text-orange-400",
                    "disabled:!shadow-none",
                    "disabled:!text-orange-300/50",
                    "disabled:!border-orange-300/50",
                ],
                link: [
                    "shadow-none",
                    "bg-transparent",
                    "text-orange-300",
                    "ring-orange-200",
                    "data-[hovered=true]:text-orange-200",
                    "data-[pressed=true]:text-orange-400",
                    "disabled:!shadow-none",
                    "disabled:!text-orange-300/50",
                ],
                ghost: [
                    "shadow-none",
                    "bg-transparent",
                    "text-stone-800",
                    "ring-stone-700",
                    "data-[hovered=true]:bg-stone-100",
                    "data-[pressed=true]:bg-stone-200",
                    "disabled:!shadow-none",
                    "disabled:!text-stone-800/50",
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
    const { label, className, loading, disabled, variant, size, ...rest } = props;
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps, isPressed } = useButton({ ...props, isDisabled: disabled || loading }, ref);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);
    return (
        <button
            ref={mergeRefs([ref, forwardedRef])}
            {...rest}
            className={twMerge(variants({ variant, size, className }))}
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
                className={clsx("transition", {
                    "opacity-0": loading,
                    "opacity-100": !loading,
                })}
            >
                {label}
            </span>
        </button>
    );
});

Button.displayName = "Button";

export default Button;
