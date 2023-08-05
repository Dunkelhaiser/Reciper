import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrpyt from "bcrypt";
import db from "@db";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
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
                if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) throw new Error("Invalid credentials");

                const passwordValid = await bcrpyt.compare(credentials.password, user.password);
                if (!passwordValid) throw new Error("Invalid credentials");

                if (!user.emailVerified) throw new Error("Email is not verified");

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                };
            }
            return token;
        },
        async session({ session, token }: any) {
            // eslint-disable-next-line no-param-reassign
            session.user.id = token.id;
            // eslint-disable-next-line no-param-reassign
            session.user.username = token.username;
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
