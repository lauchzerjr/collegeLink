import { PostCommentController } from "../../controllers/comment.controller";
import { useState } from "react";
import { useController } from "./useController";
import { useShallow } from "zustand/react/shallow";
import { usePostStore } from "../stores/postStore";
import { Comment } from "../../models/comment.model";

export const usePostCommentCreate = (postId: string, userId: string) => {
  const postCommentController = useController<PostCommentController>(
    "PostCommentController"
  );

  const { postComments, addNewPostComment } = usePostStore(
    useShallow((state) => ({
      postComments: state.postComments,
      addNewPostComment: state.addNewPostComment,
    }))
  );

  const [loading, setLoading] = useState(false);

  const createPostComment = async (comment: string) => {
    try {
      setLoading(true);
      await postCommentController.addPostComment(postId, userId, comment);

      const newPostComment: Comment = {
        createdAt: new Date().toISOString(),
        id: Math.random().toString(36),
        postId,
        text: comment,
        user: {
          name: "Josivaldooo",
          userPhoto: null,
        },
        userId,
      };

      addNewPostComment(newPostComment);
      console.log("🚀 ~ createPostComment ~ newPostComment:", newPostComment);
    } catch (error) {
      console.log("🚀 ~ createPostComment ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { createPostComment, loading };
};
