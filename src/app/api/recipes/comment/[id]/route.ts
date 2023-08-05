import { NextRequest, NextResponse } from "next/server";
import db from "@db";

export const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const comments = await db.comment.findMany({
            where: { recipeId: params.id },
            include: { author: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ comments }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Failed to get comments" }, { status: 500 });
    }
};
