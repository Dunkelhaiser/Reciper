import Recipe from "@components/Recipe";
import db from "@db";

const Trending = async () => {
    const recipes = await db.recipe.findMany({
        take: 6,
        include: {
            ingredients: true,
            category: true,
            author: true,
            comments: true,
            votes: true,
        },
    });

    return (
        <section>
            <h2 className="mb-4 text-3xl font-bold">Trending Recipes</h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                {recipes.map((recipe) => (
                    <Recipe recipe={recipe} />
                ))}
            </div>
        </section>
    );
};
export default Trending;
