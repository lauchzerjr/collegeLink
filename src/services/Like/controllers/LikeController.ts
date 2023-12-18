import { likesApi } from "../api/likeApi";
import { Like } from "../models/likeModels";

const getTotalCountLikesPost = async (postId: string) => {
  return likesApi.getTotalCountLikesPost(postId);
};

const setLikePost = async (postId: Like) => {
  likesApi.setLikePost(postId);
};

export const LikeController = {
  getTotalCountLikesPost,
  setLikePost,
};
