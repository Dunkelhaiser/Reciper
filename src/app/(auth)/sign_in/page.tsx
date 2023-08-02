import { Metadata } from "next";
import SignIn from "./SignIn";

export const metadata: Metadata = {
    title: "Reciper - Sign In",
    description: "Sign in to the Reciper.",
};

const Page = () => {
    return <SignIn />;
};
export default Page;
