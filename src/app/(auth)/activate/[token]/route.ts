import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import db from "@db";

export const GET = async (req: NextRequest, { params }: { params: { token: string } }) => {
    const { token } = params;

    const user = await db.user.findFirst({
        where: {
            verificationTokens: {
                some: {
                    AND: [
                        { activatedAt: null },
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                            },
                        },
                        { token },
                    ],
                },
            },
        },
    });

    if (!user) {
        throw new Error("Invalid token");
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
        },
    });

    await db.verificationToken.update({
        where: { token },
        data: {
            activatedAt: new Date(),
        },
    });

    redirect("/sign_in");
};
