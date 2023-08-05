import { Prisma } from "@prisma/client";

export type Comment = Prisma.CommentGetPayload<{
    include: {
        author: true;
    };
}>;
