"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordField from "@/components/PasswordField";
import { SignUpForm, schema } from "@/models/schemes/SignUp";

const SignUp = () => {
    const session = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    if (session.status === "authenticated") return redirect("/");

    const signUp = async (data: SignUpForm) => {
        try {
            const res = await fetch("/api/auth/sign_up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (res.ok) {
                router.push("/sign_in");
            } else {
                alert(json.message);
            }
        } catch (err) {
            alert("Failed to sign up");
        }
    };

    return (
        <form className="m-auto max-w-lg rounded-lg bg-white px-10 py-12 shadow md:px-20" onSubmit={handleSubmit(signUp)}>
            <h1 className="mb-4 text-4xl font-bold">Sign Up</h1>
            <div className="mb-2 flex flex-col gap-2 md:mb-4">
                <Input name="username" placeholder="Username" register={register} errors={errors.username} />
                <Input name="email" placeholder="Email" register={register} errors={errors.email} />
                <PasswordField name="password" placeholder="Password" register={register} errors={errors.password} />
                <PasswordField name="confirmPassword" placeholder="Confirm Password" register={register} errors={errors.confirmPassword} />
            </div>
            <Button label="Sign Up" className="mt-4 w-full" type="submit" disabled={!isValid} />
            <Link
                href="/sign_in"
                className="mt-4 block text-center text-orange-400 transition hover:text-orange-300 focus-visible:text-orange-300 active:text-orange-400"
            >
                Already have an account? Sign in now!
            </Link>
        </form>
    );
};
export default SignUp;
