import { likesApi } from "../api/likeApi";
import { Like } from "../models/likeModels";

const getTotalCountLikesPost = async (postId: string) => {
  return likesApi.getTotalCountLikesPost(postId);
};

const hasLikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  return likesApi.hasLikedPost({ postId, userId });
};

const setLikePost = async ({ postId, userId }: Like) => {
  likesApi.setLikePost({ postId, userId });
};

export const LikeController = {
  getTotalCountLikesPost,
  hasLikedPost,
  setLikePost,
};
