import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrpyt from "bcrypt";
import db from "../../db";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/sign_in",
    },
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
            profile(profile) {
                return {
                    id: profile.sub,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    username: profile.email.split("@")[0],
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture,
                };
            },
        }),
        CredentialsProvider({
            name: "email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;
                if (!user.password) return null;

                const passwordValid = await bcrpyt.compare(credentials.password, user.password);

                if (!passwordValid) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }: any) => {
            return {
                ...session,
                id: token.id,
                username: token.username,
            };
        },
        jwt: ({ token, user }: any) => {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                };
            }
            return token;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
