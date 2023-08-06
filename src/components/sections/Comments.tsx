import { getServerSession } from "next-auth";
import { authOptions } from "@auth";
import db from "@db";
import NewComment from "@components/NewComment";
import Comment from "@components/Comment";
import Section from "./Section";

interface Props {
    recipeId: string;
}

const Comments = async ({ recipeId }: Props) => {
    const session = await getServerSession(authOptions);

    const comments = await db.comment.findMany({
        where: {
            recipeId,
        },
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <Section title="Comments">
            {session?.user && <NewComment recipeId={recipeId} session={session} />}
            <ul className="mt-6 flex max-w-2xl flex-col gap-4">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        </Section>
    );
};
export default Comments;
