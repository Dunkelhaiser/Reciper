"use client";

/* eslint-disable react/jsx-props-no-spreading */
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef, useRef } from "react";
import { AriaTextFieldProps, useHover, useFocusRing, mergeProps, useTextField } from "react-aria";
import { FieldError, UseFormRegister } from "react-hook-form";
import { mergeRefs } from "react-merge-refs";
import { twMerge } from "tailwind-merge";

const variants = cva(
    [
        "w-full",
        "border-stone-700",
        "text-inherit",
        "outline-none",
        "placeholder:text-stone-400",
        "p-2",
        "transition",
        "ring-offset-0",
        "ring-stone-700",
    ],
    {
        variants: {
            variant: {
                box: [
                    "border",
                    "rounded-xl",
                    "data-[hovered=true]:ring-1",
                    "data-[focus-visible=true]:ring-1",
                    "data-[focused=true]:ring-1",
                ],
                line: ["bg-transparent", "border-b"],
            },
            textSize: {
                small: ["text-sm", "px-[0.6563rem]", "py-[0.4063rem]"],
                normal: ["px-[0.9063rem]", "py-[0.4063rem]"],
                large: ["text-lg", "px-[1.1563rem]", "py-[0.4063rem]"],
            },
        },
        defaultVariants: {
            variant: "box",
            textSize: "normal",
        },
    }
);

type Props = AriaTextFieldProps &
    InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof variants> & {
        name?: string;
        placeholder?: string;
        value?: string;
        type?: "text" | "email" | "password" | "color" | "date" | "file" | "number" | "radio" | "range" | "tel";
        min?: number;
        max?: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        register?: UseFormRegister<any>;
        errors?: FieldError;
        onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    };

const Input: React.FC<Props> = forwardRef((props, forwardedRef) => {
    const { name, register, errors, variant, textSize, className, ...rest } = props;
    const isRegistered = register !== undefined && name !== undefined;
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useTextField(props, ref);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible, isFocused } = useFocusRing(props);

    return (
        <div className="relative flex w-full flex-col gap-2">
            <input
                ref={mergeRefs([ref, forwardedRef])}
                {...mergeProps(inputProps, hoverProps, focusProps)}
                {...rest}
                {...(isRegistered ? register(name) : null)}
                className={twMerge(variants({ variant, textSize, className }), errors && "border-red-400")}
                aria-invalid={errors ? "true" : "false"}
                data-hovered={isHovered}
                data-focused={isFocused}
                data-focus-visible={isFocusVisible}
            />
            {errors && <span className="text-xs font-medium text-red-400">{errors.message}</span>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
