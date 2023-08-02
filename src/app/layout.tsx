import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@components/Header";
import Providers from "@components/Providers";
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
                <Providers>
                    <Header />
                    <Toaster containerStyle={{ top: "80px" }} />
                    <main className="mb-[56px] min-h-[calc(100vh_-_56px)] bg-stone-50 px-8 py-8 md:mb-0 md:mt-[64px] md:min-h-[calc(100vh_-_64px)] lg:px-20 xl:px-40">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
