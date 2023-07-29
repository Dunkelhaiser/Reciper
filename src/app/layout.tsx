import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
