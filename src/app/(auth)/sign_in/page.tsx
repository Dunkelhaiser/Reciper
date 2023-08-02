"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordField from "@/components/PasswordField";
import { SignInForm, schema } from "@/models/schemes/SignIn";
import Form from "@/components/Form";

const SignUp = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";
    const session = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const signInHandler = async (data: SignInForm) => {
        const res = await signIn("credentials", { ...data, callbackUrl, redirect: false });
        return res;
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignInForm) => signInHandler(data),
        onSuccess(data) {
            if (data?.error) {
                toast.error("Invalid credentials");
            } else {
                toast.success("Signed in successfully");
            }
        },
        onError() {
            toast.error("Failed to sign in");
        },
    });

    if (session.status === "authenticated") return redirect("/");

    return (
        <Form label="Sign In" onSubmit={handleSubmit((data) => mutate(data))}>
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
            <Button label="Sign In" className="mt-4 w-full" type="submit" disabled={!isValid || isLoading} />
            <Link
                href="/sign_up"
                className="mt-4 block text-center text-orange-400 transition hover:text-orange-300 focus-visible:text-orange-300 active:text-orange-400"
            >
                Don&apos;t have an account? Sign up now!
            </Link>
        </Form>
    );
};

export default SignUp;
