import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { Comment as CommentType } from "@models/Comment";
import { formatDate } from "@utils/formatDate";

interface Props {
    comment: CommentType;
}

const Comment = ({ comment }: Props) => {
    return (
        <div key={comment.id} className="flex flex-col gap-2 rounded-xl bg-white px-6 py-4 shadow sm:px-8">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                    {comment.author.image ? (
                        <Image
                            className="h-6 w-6"
                            src={comment.author.image}
                            height={150}
                            width={150}
                            alt={`${comment.author.username}s avatar`}
                        />
                    ) : (
                        <FaUserCircle className="text-2xl" />
                    )}
                    <span className="font-bold">{comment.author.username}</span>
                </div>
                <time dateTime={new Date(comment.createdAt).toISOString()} className="text-end text-sm text-stone-500">
                    {formatDate(new Date(comment.createdAt))}
                </time>
            </div>
            <span className="text-stone-600">{comment.content}</span>
        </div>
    );
};
export default Comment;
