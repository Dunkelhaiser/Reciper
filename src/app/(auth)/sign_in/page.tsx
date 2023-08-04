import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@auth";
import SignIn from "./SignIn";

export const metadata: Metadata = {
    title: "Reciper - Sign In",
    description: "Sign in to the Reciper.",
};

const Page = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect("/");
    }

    return <SignIn />;
};
export default Page;
