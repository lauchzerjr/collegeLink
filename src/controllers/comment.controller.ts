import { Comment } from "../models/comment.model";
import { commentApi } from "../services/comment.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { userProfileController } from "./user.controller";
import { UserPostCommentInfos } from "../models/user.model";

const getTotalCountPostComments = async (postId: string) => {
  return commentApi.getTotalCountComments({ postId });
};

const getPostComments = async (
  postId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
) => {
  const { data, lastVisible } = await commentApi.getComments(
    postId,
    startAfter
  );

  const postCommentsWithDetails: Comment[] = await Promise.all(
    data.map(async (postComments: Comment) => {
      const user = (await userProfileController.getUserPostCommentInfo(
        postComments.userId
      )) as UserPostCommentInfos;

      return {
        ...postComments,
        userId: postComments.userId,
        user,
      };
    })
  );

  return {
    data: postCommentsWithDetails as Comment[],
    lastVisible,
  };
};

const addPostComment = async (postId: string, userId: string, text: string) => {
  return commentApi.addComment(postId, userId, text);
};

const removePostComment = async (id: string) => {
  return commentApi.removeComment({ id });
};

export const postCommentController = {
  getTotalCountPostComments,
  getPostComments,
  addPostComment,
  removePostComment,
};
