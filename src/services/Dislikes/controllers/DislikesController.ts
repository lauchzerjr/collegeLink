import { dislikesApi } from "../api/DislikesApi";
import { Dislikes } from "../models/DislikesModels";

const getTotalCountDislikesPost = async (postId: string) => {
  return dislikesApi.getTotalCountDislikesPost(postId);
};

const hasDislikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  return dislikesApi.hasDislikedPost({ postId, userId });
};

const setDislikePost = async ({ postId, userId }: Dislikes) => {
  dislikesApi.setDislikePost({ postId, userId });
};

export const DislikesController = {
  getTotalCountDislikesPost,
  hasDislikedPost,
  setDislikePost,
};
