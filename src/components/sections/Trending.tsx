import Recipe from "@components/Recipe";
import db from "@db";
import Section from "./Section";

const Trending = async () => {
    const recipes = await db.recipe.findMany({
        take: 6,
        include: {
            ingredients: true,
            votes: true,
        },
    });

    return (
        <Section title="Trending Recipes" titleClassName="text-3xl">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                {recipes.map((recipe) => (
                    <Recipe recipe={recipe} />
                ))}
            </div>
        </Section>
    );
};
export default Trending;
