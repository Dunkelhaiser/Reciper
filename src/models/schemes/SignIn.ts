import { z as zod } from "zod";

export const schema = zod.object({
    email: zod.string().nonempty({ message: "Enter your email" }),
    password: zod.string().nonempty({ message: "Enter your password" }),
});

export type SignInForm = zod.infer<typeof schema>;
