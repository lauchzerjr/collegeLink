import { Comment } from "../models/comment.model";
import { commentApi } from "../api/comment.api";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserController } from "../user/controllers/UserController";
import { UserPostInfos } from "../models/user.model";

const getTotalCountPostComments = async (postId: string) => {
  return commentApi.getTotalCountComments({ postId });
};

const getPostComments = async (
  postId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
) => {
  const { data, lastVisible } = await commentApi.getComments(
    postId,
    startAfter
  );

  const postCommentsWithDetails: Comment[] = await Promise.all(
    data.map(async (postComments: Comment) => {
      const user = (await UserController.getUserInfos(
        postComments.userId
      )) as UserPostInfos;

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

export const CommentController = {
  getTotalCountPostComments,
  getPostComments,
  addPostComment,
  removePostComment,
};
