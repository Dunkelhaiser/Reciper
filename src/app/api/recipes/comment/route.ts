import { NextRequest, NextResponse } from "next/server";
import { z as zod } from "zod";
import { schema } from "@models/schemes/Comment";
import db from "@db";

export const POST = async (req: NextRequest) => {
    try {
        const { comment, authorId, recipeId } = await req.json();
        await schema.parseAsync({ comment });

        await db.comment.create({
            data: {
                content: comment,
                authorId,
                recipeId,
            },
        });

        return NextResponse.json({ message: "Comment created successfully" }, { status: 201 });
    } catch (err) {
        if (err instanceof zod.ZodError) {
            return NextResponse.json({ message: err.errors[0].message }, { status: 422 });
        }
        return NextResponse.json({ message: "Failed to write a comment" }, { status: 500 });
    }
};
