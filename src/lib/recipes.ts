import axios from "axios";
import { CommentForm } from "@models/schemes/Comment";
import { Comment } from "@models/Comment";

export const createComment = async (data: CommentForm, authorId: string, recipeId: string) => {
    const res = await axios.post("/api/recipes/comment", { ...data, authorId, recipeId });
    return res.data;
};

export const getComments = async (recipeId: string): Promise<{ comments: Comment[] }> => {
    const res = await axios.get(`/api/recipes/comment/${recipeId}`);
    return res.data;
};
