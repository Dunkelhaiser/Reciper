"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@ui/Button";
import Input from "@ui/Input";
import PasswordField from "@ui/PasswordField";
import { SignUpForm, schema } from "@models/schemes/SignUp";
import Form from "@components/Form";
import { signUp } from "@lib/auth";

const SignUp = () => {
    const session = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignUpForm) => signUp(data),
        onSuccess() {
            toast.success("Signed up successfully");
            router.push("/sign_in");
        },
        onError(err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message);
            } else {
                toast.error("Failed to sign up");
            }
        },
    });

    if (session.status === "authenticated") return redirect("/");

    return (
        <Form label="Sign Up" onSubmit={handleSubmit((data) => mutate(data))}>
            <div className="mb-2 flex flex-col gap-2 md:mb-4">
                <Input name="username" placeholder="Username" register={register} errors={errors.username} />
                <Input name="email" placeholder="Email" register={register} errors={errors.email} />
                <PasswordField name="password" placeholder="Password" register={register} errors={errors.password} />
                <PasswordField name="confirmPassword" placeholder="Confirm Password" register={register} errors={errors.confirmPassword} />
            </div>
            <Button className="mt-4 w-full" type="submit" loading={isLoading} disabled={!isValid}>
                Sign Up
            </Button>
            <Link
                href="/sign_in"
                className="mt-4 block text-center text-orange-400 transition hover:text-orange-300 focus-visible:text-orange-300 active:text-orange-400"
            >
                Already have an account? Sign in now!
            </Link>
        </Form>
    );
};

export default SignUp;
