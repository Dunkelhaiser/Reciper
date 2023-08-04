"use client";

import { useSession, signIn as signInNext } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@ui/Button";
import Input from "@ui/Input";
import PasswordField from "@ui/PasswordField";
import { SignInForm, schema } from "@models/schemes/SignIn";
import Form from "@components/Form";
import { signIn } from "@lib/auth";

const SignIn = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";
    const session = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignInForm) => signIn(data, callbackUrl),
        onSuccess(data) {
            if (data?.error) {
                toast.error(data.error);
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
            <Button variant="google" onClick={() => signInNext("google")} className="mt-2 w-full">
                Google
            </Button>
            <p className="mb-1 mt-3 text-center text-lg font-medium uppercase">or</p>
            <div className="mb-2 flex flex-col gap-2 md:mb-4">
                <Input name="email" placeholder="Email" register={register} errors={errors.email} />
                <PasswordField name="password" placeholder="Password" register={register} errors={errors.password} />
            </div>
            <Button className="mt-4 w-full" type="submit" loading={isLoading} disabled={!isValid}>
                Sign In
            </Button>
            <Link
                href="/sign_up"
                className="mt-4 block text-center text-orange-400 transition hover:text-orange-300 focus-visible:text-orange-300 active:text-orange-400"
            >
                Don&apos;t have an account? Sign up now!
            </Link>
        </Form>
    );
};

export default SignIn;
