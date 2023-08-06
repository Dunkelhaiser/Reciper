"use client";

import Image from "next/image";
import Link from "next/link";
import { AnchorHTMLAttributes, forwardRef, useRef } from "react";
import { AriaButtonProps, useFocusRing, useHover, mergeProps } from "react-aria";
import { mergeRefs } from "react-merge-refs";
import { cn } from "@utils/cn";
import { Recipe as RecipeType } from "@models/Recipe";

type Props = AriaButtonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        className?: string;
        recipe: Omit<RecipeType, "author" | "comments" | "category">;
    };

const Recipe = forwardRef<HTMLAnchorElement, Props>((props, forwardedRef) => {
    const { className, recipe } = props;
    const ref = useRef<HTMLAnchorElement>(null);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);
    return (
        <Link
            ref={mergeRefs([ref, forwardedRef])}
            href={`/recipes/${recipe.id}`}
            {...mergeProps(hoverProps, focusProps)}
            data-hovered={isHovered}
            data-focus-visible={isFocusVisible}
            className={cn(
                "relative top-0 inline-block h-80 overflow-hidden rounded-xl px-6 py-4 outline-none transition-all duration-300 data-[focus-visible=true]:-top-[2px] data-[hovered=true]:-top-[2px]",
                className
            )}
        >
            <Image
                alt={recipe.title}
                src={recipe.image}
                height={500}
                width={500}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-300/0 to-stone-800/75" />
            <div className="flex h-full flex-col justify-end">
                <h3 className="text-xl font-bold text-stone-50">{recipe.title}</h3>
                <span className="text-sm text-stone-200 xl:text-xs">
                    {recipe.time} Min | {recipe.ingredients.length} {recipe.ingredients.length === 1 ? "Ingredient" : "Ingredients"}
                </span>
            </div>
        </Link>
    );
});

Recipe.displayName = "Recipe";

export default Recipe;
