"use client";

import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import NewComment from "@components/NewComment";
import Comment from "@components/Comment";
import { getComments } from "@lib/recipes";
import Section from "./Section";

interface Props {
    recipeId: string;
    session: Session | null;
}

const Comments = ({ session, recipeId }: Props) => {
    const { data } = useQuery({
        queryKey: ["comments"],
        queryFn: () => getComments(recipeId),
    });

    return (
        <Section title="Comments">
            {session?.user && <NewComment recipeId={recipeId} session={session} />}
            <ul className="mt-6 flex max-w-2xl flex-col gap-4">
                {data?.comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        </Section>
    );
};
export default Comments;
