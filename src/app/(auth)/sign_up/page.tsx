import { Metadata } from "next";
import SignUp from "./SignUp";

export const metadata: Metadata = {
    title: "Reciper - Sign Up",
    description: "Sign up to the Reciper.",
};

const Page = () => {
    return <SignUp />;
};
export default Page;
