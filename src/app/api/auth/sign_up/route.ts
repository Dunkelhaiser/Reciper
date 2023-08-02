import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/models/schemes/SignUp";
import db from "../../db";

const checkAvailability = async (email: string, username: string) => {
    const existingUsers = await db.user.findMany({
        where: {
            OR: [{ username }, { email }],
        },
    });
    let error = "";
    existingUsers.forEach((user) => {
        if (user.username === username) {
            error = "Username already exists";
        }
        if (user.email === email) {
            error = "Email already exists";
        }
    });
    return { error };
};

export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password, confirmPassword } = await req.json();
        try {
            await schema.parseAsync({ username, email, password, confirmPassword });
        } catch {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        const isAvailable = await checkAvailability(email, username);
        if (isAvailable?.error) {
            return NextResponse.json({ message: isAvailable.error }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Failed to sign up" }, { status: 500 });
    }
};
