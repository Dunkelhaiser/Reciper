import CreateButton from "@components/CreateButton";
import Recipe from "@components/Recipe";
import Section from "@components/sections/Section";
import db from "@db";

const Explore = async () => {
    const recipes = await db.recipe.findMany({
        include: {
            ingredients: true,
            votes: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <Section title="Explore" titleClassName="text-3xl">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                {recipes.map((recipe) => (
                    <Recipe recipe={recipe} />
                ))}
            </div>
            <CreateButton />
        </Section>
    );
};
export default Explore;
