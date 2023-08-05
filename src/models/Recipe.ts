import { Prisma } from "@prisma/client";

export type Recipe = Prisma.RecipeGetPayload<{
    include: { ingredients: true; category: true; author: true; comments: true; votes: true };
}>;
