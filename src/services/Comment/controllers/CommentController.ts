import { Comment } from "../models/commentModels";
import { commentApi } from "../api/commentApi";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserController } from "../../user/controllers/UserController";
import { UserPostInfos } from "../../user/models/userModels";

const getTotalCountPostComments = async (postId: string) => {
  return commentApi.getTotalCountPostComments({ postId });
};

const getPostComments = async (
  postId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
) => {
  const { data, lastVisible } = await commentApi.getPostComments(
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

const createPostComment = async (
  postId: string,
  userId: string,
  text: string
) => {
  return commentApi.createPostComment(postId, userId, text);
};

const removePostComment = async (id: string) => {
  return commentApi.removePostComment({ id });
};

export const CommentController = {
  getTotalCountPostComments,
  getPostComments,
  createPostComment,
  removePostComment,
};
