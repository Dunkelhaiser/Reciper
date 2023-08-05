import { z as zod } from "zod";

export const schema = zod.object({
    comment: zod.string().nonempty({ message: "Enter your comment" }),
});

export type CommentForm = zod.infer<typeof schema>;
