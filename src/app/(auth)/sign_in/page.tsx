"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordField from "@/components/PasswordField";
import { SignInForm, schema } from "@/models/schemes/SignIn";

const SignUp = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";
    const session = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    if (session.status === "authenticated") return redirect("/");

    const signInHandler = async (data: SignInForm) => {
        try {
            const res = await signIn("credentials", { ...data, callbackUrl, redirect: false });
            if (res && res.error) {
                alert("Invalid credentials");
            }
        } catch {
            alert("Failed to sign in");
        }
    };

    return (
        <form className="m-auto max-w-lg rounded-lg bg-white px-10 py-12 shadow md:px-20" onSubmit={handleSubmit(signInHandler)}>
            <h1 className="mb-4 text-4xl font-bold">Sign In </h1>
            <Button
                label="Google"
                onClick={() => signIn("google")}
                className="mt-2 w-full bg-sky-600 hover:bg-sky-500 focus-visible:bg-sky-500 active:bg-sky-600"
            />
            <p className="mb-1 mt-3 text-center text-lg font-medium uppercase">or</p>
            <div className="mb-2 flex flex-col gap-2 md:mb-4">
                <Input name="email" placeholder="Email" register={register} errors={errors.email} />
                <PasswordField name="password" placeholder="Password" register={register} errors={errors.password} />
            </div>
            <Button label="Sign In" className="mt-4 w-full" type="submit" disabled={!isValid} />
            <Link
                href="/sign_up"
                className="mt-4 block text-center text-orange-400 transition hover:text-orange-300 focus-visible:text-orange-300 active:text-orange-400"
            >
                Don&apos;t have an account? Sign up now!
            </Link>
        </form>
    );
};
export default SignUp;
