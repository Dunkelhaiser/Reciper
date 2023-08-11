"use client";

import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef, useRef } from "react";
import { AriaButtonProps, useFocusRing, useHover, mergeProps } from "react-aria";
import { mergeRefs } from "react-merge-refs";
import { FaPlus } from "react-icons/fa";
import Button from "@ui/Button";

type Props = AriaButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const CreateButton = forwardRef<HTMLAnchorElement, Props>((props, forwardedRef) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);
    return (
        <Button layout="floating" asChild size="large">
            <Link
                href="create"
                ref={mergeRefs([ref, forwardedRef])}
                data-hovered={isHovered}
                data-focus-visible={isFocusVisible}
                {...mergeProps(hoverProps, focusProps)}
            >
                <FaPlus />
            </Link>
        </Button>
    );
});

CreateButton.displayName = "CreateButton";

export default CreateButton;
