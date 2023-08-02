import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    return (
        session?.user && (
            <Link
                href="/profile"
                aria-label="Profile"
                className={`no-underline transition ${
                    true === "/profile"
                        ? "text-orange-300"
                        : "text-stone-700 hover:text-stone-600 focus-visible:text-stone-600 active:text-stone-800"
                }`}
            >
                {session?.user?.image ? (
                    <Image src={session?.user?.image} alt="Profile" className="h-[25.24px] rounded-full" width={150} height={150} />
                ) : (
                    <FaUserCircle className="hidden text-2xl md:inline" />
                )}

                <span className="md:hidden">Profile</span>
            </Link>
        )
    );
};
export default Navbar;
