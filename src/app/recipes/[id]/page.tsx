import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaClock, FaFire, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import db from "@db";
import { formatDate } from "@utils/formatDate";
import Section from "@components/sections/Section";
import Button from "@components/ui/Button";
import Comments from "@components/sections/Comments";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const recipe = await db.recipe.findFirst({
        where: {
            id: params.id,
        },
    });

    if (!recipe) {
        return {
            title: "Recipe not found",
            description: "The recipe you are looking for does not exist.",
        };
    }

    return {
        title: recipe.title,
        description: recipe.description,
    };
};

const Recipe = async ({ params }: { params: { id: string } }) => {
    const recipe = await db.recipe.findFirst({
        where: {
            id: params.id,
        },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                },
            },
            category: true,
            author: true,
            comments: {
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                },
            },
            votes: true,
        },
    });

    if (!recipe) {
        return notFound();
    }

    return (
        <section className="flex flex-col gap-8">
            <section className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_3fr]">
                <Image className="rounded-xl" src={recipe?.image} height={2400} width={2400} alt={recipe.title} />
                <div className="max-w-2xl">
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="mb-1 text-3xl font-bold">{recipe.title}</h1>
                        <time dateTime={recipe.createdAt.toISOString()} className="text-end text-sm text-stone-500">
                            {formatDate(recipe.createdAt)}
                        </time>
                    </div>

                    <div className="flex flex-row items-center gap-8 text-sm text-stone-500">
                        <span className="flex flex-row items-center gap-2">
                            <FaClock />
                            {recipe.time} min
                        </span>
                        <span className="flex flex-row items-center gap-2">
                            <FaFire />
                            {recipe.calories} kcal
                        </span>
                    </div>

                    <div className="mt-2 flex flex-row gap-4 text-lg">
                        <div className="flex flex-col items-center gap-1">
                            <Button
                                variant="icon"
                                className="text-stone-500 data-[focus-visible=true]:text-green-400/60 data-[hovered=true]:text-green-400/60 data-[pressed=true]:text-green-400"
                            >
                                <FaThumbsUp />
                            </Button>
                            <span className="text-sm text-stone-500">2173</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Button
                                variant="icon"
                                className="text-stone-500 data-[focus-visible=true]:text-red-400/60 data-[hovered=true]:text-red-400/60 data-[pressed=true]:text-red-400"
                            >
                                <FaThumbsDown />
                            </Button>
                            <span className="text-sm text-stone-500">113</span>
                        </div>
                    </div>
                    {recipe.category.length > 0 && (
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <span className="text-sm text-stone-500">Categories:</span>
                            {recipe.category.map((category, i) => (
                                <span key={category.id} className="text-sm text-stone-500">
                                    {category.title}
                                    {i !== recipe.category.length - 1 && ", "}
                                </span>
                            ))}
                        </div>
                    )}
                    {recipe.description && <p className="mt-2 text-stone-600">{recipe.description}</p>}
                </div>
            </section>
            {recipe.ingredients.length > 0 && (
                <Section title="Ingredients">
                    <ul className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.ingredient.id} className="flex flex-row items-center gap-2">
                                <span className="text-stone-600">
                                    <span className="font-bold">
                                        {ingredient.quantity}
                                        {ingredient.ingredient.unit === "g" ? "" : " "}
                                        {ingredient.ingredient.unit === "number"
                                            ? ""
                                            : ingredient.quantity !== 1 && ingredient.ingredient.unit !== "g"
                                            ? `${ingredient.ingredient.unit}s of`
                                            : `${ingredient.ingredient.unit} of`}
                                    </span>{" "}
                                    {ingredient.ingredient.unit === "number" && ingredient.quantity > 1
                                        ? `${ingredient.ingredient.label.toLowerCase()}s`
                                        : ingredient.ingredient.label.toLowerCase()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Section>
            )}
            {recipe.instructions.length > 0 && (
                <Section title="Instructions">
                    <ol className="flex max-w-2xl flex-col gap-2">
                        {recipe.instructions.map((instruction, i) => (
                            <li key={instruction} className="flex flex-col gap-1">
                                <span className="font-bold">Step {i + 1}</span>
                                <span className="text-stone-600">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </Section>
            )}
            <Comments recipeId={recipe.id} />
        </section>
    );
};
export default Recipe;
