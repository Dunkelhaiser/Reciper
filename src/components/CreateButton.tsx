"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef, useRef } from "react";
import { AriaButtonProps, useFocusRing, useHover, mergeProps } from "react-aria";
import { mergeRefs } from "react-merge-refs";
import { FaPlus } from "react-icons/fa";
import { variants } from "@ui/Button";
import { cn } from "@utils/cn";

type Props = AriaButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const CreateButton = forwardRef<HTMLAnchorElement, Props>((props, forwardedRef) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);
    return (
        <Link
            className={cn(variants({ layout: "floating" }), "text-xl")}
            href="create"
            ref={mergeRefs([ref, forwardedRef])}
            data-hovered={isHovered}
            data-focus-visible={isFocusVisible}
            {...mergeProps(hoverProps, focusProps)}
        >
            <FaPlus />
        </Link>
    );
});

CreateButton.displayName = "CreateButton";

export default CreateButton;
