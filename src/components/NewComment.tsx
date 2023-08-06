"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CommentForm, schema } from "@models/schemes/Comment";
import Button from "@ui/Button";
import { createComment } from "@lib/recipes";

interface Props {
    recipeId: string;
    session: Session;
}

const NewComment = ({ recipeId, session }: Props) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<CommentForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: CommentForm) => createComment(data, session.user.id, recipeId),
        onSuccess(data) {
            toast.success(data.message);
            reset();
            router.refresh();
        },
        onError(err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            } else {
                toast.error("Failed to create a comment");
            }
        },
    });

    return (
        <form
            className="flex max-w-2xl flex-col items-start rounded-xl bg-white px-6 py-4 shadow sm:px-8"
            onSubmit={handleSubmit((data) => mutate(data))}
        >
            <h3 className="mb-4 text-xl font-bold">Write a comment</h3>
            <textarea
                {...register("comment")}
                rows={5}
                className="resize-none self-stretch rounded-lg bg-stone-100 px-4 py-2 text-stone-700 outline-none ring-orange-200 ring-offset-2 transition focus:ring-2"
            />
            <Button className="mt-3" type="submit" disabled={!isValid} loading={isLoading}>
                Comment
            </Button>
        </form>
    );
};
export default NewComment;
