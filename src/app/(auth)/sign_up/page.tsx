import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@auth";
import SignUp from "./SignUp";

export const metadata: Metadata = {
    title: "Reciper - Sign Up",
    description: "Sign up to the Reciper.",
};

const Page = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect("/");
    }

    return <SignUp />;
};
export default Page;
