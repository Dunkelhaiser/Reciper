import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import AuthProvider from "@/components/Providers/AuthProvider";
import QueryProvider from "@/components/Providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Reciper",
    description: "Reciper - discover, create, and share delicious recipes.",
    keywords:
        "reciper, recipe, recipe book, social, network, social network, recipe book, search, food, cooking, culinary, ingredients, rating, review, kitchen",
    authors: [{ name: "KaeserOfHonour", url: "https://github.com/KaeserOfHonour" }],
    applicationName: "Reciper",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <QueryProvider>
                        <Header />
                        <main className="mt-[64px] min-h-[calc(100vh_-_64px)] bg-stone-50 px-8 py-8 lg:px-20 xl:px-40">{children}</main>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
