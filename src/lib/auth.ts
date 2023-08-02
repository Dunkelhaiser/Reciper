import axios from "axios";
import { signIn as signInNext } from "next-auth/react";
import { SignInForm } from "@models/schemes/SignIn";
import { SignUpForm } from "@/models/schemes/SignUp";

export const signIn = async (data: SignInForm, callbackUrl: string) => {
    const res = await signInNext("credentials", { ...data, callbackUrl, redirect: false });
    return res;
};

export const signUp = async (data: SignUpForm) => {
    const res = await axios.post("/api/auth/sign_up", data);
    return res.data;
};
