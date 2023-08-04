import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z as zod } from "zod";
import db from "@db";
import { schema } from "@models/schemes/SignUp";
import { transporter } from "@lib/nodemailer";

const sendVerificationEmail = async (email: string, token: string) => {
    const mailOptions = {
        from: process.env.GMAIL_ADDRESS,
        to: email,
        subject: "Reciper - Verification",
        html: `Click <a href="${process.env.CLIENT}/activate/${token}">here</a> to verify your account`,
    };
    await transporter.sendMail(mailOptions);
};

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
        await schema.parseAsync({ username, email, password, confirmPassword });

        const isAvailable = await checkAvailability(email, username);
        if (isAvailable?.error) {
            return NextResponse.json({ message: isAvailable.error }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        const token = await db.verificationToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            },
        });

        await sendVerificationEmail(email, token.token);

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
        if (err instanceof zod.ZodError) {
            return NextResponse.json({ message: err.errors[0].message }, { status: 422 });
        }
        return NextResponse.json({ message: "Failed to sign up" }, { status: 500 });
    }
};
