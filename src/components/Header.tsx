"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaBell, FaRegCompass, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

const Header = () => {
    const route = usePathname();
    const session = useSession();

    return (
        <header className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow dark:bg-stone-900 md:bottom-auto md:top-0 ">
            <div className="container flex flex-row items-center justify-between px-8 py-4 md:py-2 lg:px-20 xl:px-40">
                <Link href="/" className="hidden md:inline">
                    <Image src="/logo.png" alt="Logo" className="h-12" width={150} height={150} priority />
                </Link>
                <nav className="w-full md:w-auto">
                    <ul className="flex list-none flex-row justify-between gap-8 md:items-start md:gap-20">
                        <li>
                            <Link
                                href="/"
                                aria-label="Home"
                                className={`no-underline transition  ${
                                    route === "/"
                                        ? "text-orange-300"
                                        : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 dark:text-stone-400 dark:hover:text-stone-500 dark:focus-visible:text-stone-500 dark:active:text-stone-300"
                                }`}
                            >
                                <HiHome className="text-2xl" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/explore"
                                aria-label="Explore"
                                className={`no-underline transition ${
                                    route === "/explore"
                                        ? "text-orange-300"
                                        : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 dark:text-stone-400 dark:hover:text-stone-500 dark:focus-visible:text-stone-500 dark:active:text-stone-300"
                                }`}
                            >
                                <FaRegCompass className="text-2xl" />
                            </Link>
                        </li>
                        {session.data?.user ? (
                            <>
                                <li>
                                    <Link
                                        href="/notifications"
                                        aria-label="Notifications"
                                        className={`no-underline transition ${
                                            route === "/notifications"
                                                ? "text-orange-300"
                                                : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 dark:text-stone-400 dark:hover:text-stone-500 dark:focus-visible:text-stone-500 dark:active:text-stone-300"
                                        }`}
                                    >
                                        <FaBell className="text-2xl" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/profile"
                                        aria-label="Profile"
                                        className={`no-underline transition ${
                                            route === "/profile"
                                                ? "text-orange-300"
                                                : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 dark:text-stone-400 dark:hover:text-stone-500 dark:focus-visible:text-stone-500 dark:active:text-stone-300"
                                        }`}
                                    >
                                        {session.data?.user.image ? (
                                            <Image
                                                src={session.data?.user.image}
                                                alt="Profile"
                                                className="h-[25.24px] rounded-full"
                                                width={150}
                                                height={150}
                                            />
                                        ) : (
                                            <FaUserCircle className="text-2xl" />
                                        )}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    href="/sign_in"
                                    aria-label="Sign In"
                                    className={`no-underline transition ${
                                        route === "/sign_in" || route === "/sign_up"
                                            ? "text-orange-300"
                                            : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 dark:text-stone-400 dark:hover:text-stone-500 dark:focus-visible:text-stone-500 dark:active:text-stone-300"
                                    }`}
                                >
                                    <FaSignInAlt className="text-2xl" />
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;
