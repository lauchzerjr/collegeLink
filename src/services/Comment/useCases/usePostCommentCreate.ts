import { usePaginatedList } from "../../hooks/usePaginatedList";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { CommentController } from "../controllers/CommentController";
import { useState } from "react";

interface Options {
  onSuccess?: (data) => void;
}

export const usePostCommentCreate = (
  postId: string,
  userId: string,
  options?: Options
) => {
  const [loading, setLoading] = useState(false);

  const createPostComment = async (comment: string) => {
    try {
      setLoading(true);
      const postComment = await CommentController.createPostComment(
        postId,
        userId,
        comment
      );
      if (options?.onSuccess) {
        options.onSuccess(postComment);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { createPostComment, loading };
};
