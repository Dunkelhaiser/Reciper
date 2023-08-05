import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@auth";
import Header from "@components/Header";
import Providers from "@components/Providers";
import { cn } from "@utils/cn";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en" className="antialiased">
            <body className={cn("bg-stone-50 text-stone-800 dark:bg-neutral-800 dark:text-stone-50", inter.className)}>
                <Providers>
                    <Header session={session} />
                    <Toaster containerStyle={{ top: "80px" }} />
                    <main
                        className={cn(
                            "container mb-[56px] flex h-full min-h-[calc(100vh_-_56px)] flex-col gap-8 px-8 py-8 md:mb-0 md:mt-[64px] md:min-h-[calc(100vh_-_64px)] lg:px-20 xl:px-40"
                        )}
                    >
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
