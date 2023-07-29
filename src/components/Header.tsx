"use client";

import { FaRegCompass, FaSignInAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import Hamburger from "./Hamburger";

const Header = () => {
    const [expanded, setExpanded] = useToggle();
    const route = usePathname();

    return (
        <header className="fixed top-0 z-[9999] flex w-full flex-row items-center justify-between bg-white px-8 py-2 shadow lg:px-20 xl:px-40">
            <Link href="/">
                <Image src="/logo.webp" alt="Logo" className="h-12" width={150} height={150} priority />
            </Link>
            <Hamburger onClick={() => setExpanded()} expanded={expanded} className="md:hidden" />
            <nav
                className={`transform max-[767px]:absolute max-[767px]:left-8 max-[767px]:right-8  max-[767px]:rounded-lg max-[767px]:bg-white max-[767px]:p-8  max-[767px]:shadow-lg max-[767px]:transition-all max-[767px]:duration-300 max-[767px]:ease-out
                ${
                    expanded
                        ? "max-[767px]:top-[5.5rem] max-[767px]:translate-y-0 max-[767px]:opacity-100"
                        : "max-[767px]:top-[-1px] max-[767px]:-translate-y-full max-[767px]:opacity-0"
                }`}
            >
                <ul className="flex list-none flex-col items-center gap-8 md:flex-row md:items-start md:gap-20">
                    <li>
                        <Link
                            href="/"
                            aria-label="Home"
                            className={`text-stone-700 no-underline transition hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 ${
                                route === "/" && "text-orange-300"
                            }`}
                        >
                            <HiHome className="hidden text-2xl md:inline" />
                            <span className="md:hidden">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/discover"
                            aria-label="Discover"
                            className={`text-stone-700 no-underline transition hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 ${
                                route === "/discover" && "text-orange-300"
                            }`}
                        >
                            <FaRegCompass className="hidden text-2xl md:inline" />
                            <span className="md:hidden">Discover</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/profile"  aria-label="Notifications"
                            className="text-stone-700 no-underline transition hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800">
                            <FaBell className="hidden text-2xl md:inline" />
                            <span className="md:hidden">Notifications</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile"  aria-label="Profile"
                            className="text-stone-700 no-underline transition hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800">
                            <FaUserCircle className="hidden text-2xl md:inline" />
                            <span className="md:hidden">Profile</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            href="/sign_in"
                            aria-label="Sign In"
                            className={`text-stone-700 no-underline transition hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800 ${
                                route === "/sign_in" && "text-orange-300"
                            }`}
                        >
                            <FaSignInAlt className="hidden text-2xl md:inline" />
                            <span className="md:hidden">Sign in</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;
