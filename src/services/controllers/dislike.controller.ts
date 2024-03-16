import { dislikeApi } from "../api/dislike.api";
import { Dislikes } from "../models/dislike.model";

const getTotalCountDislikesPost = async (postId: string) => {
  return dislikeApi.getTotalCountDislikes(postId);
};

const hasDislikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  return dislikeApi.hasDisliked({ postId, userId });
};

const handlePostDislikePress = async ({ postId, userId }: Dislikes) => {
  try {
    const hasLiked = await dislikeApi.hasDisliked({ postId, userId });

    if (hasLiked) {
      await dislikeApi.removeDislike({ postId, userId });
      return;
    } else {
      await dislikeApi.addDislike({ postId, userId });
      return;
    }
  } catch (error) {
    console.error("Erro ao descurtir o post:", error);
    throw error;
  }
};

export const DislikeController = {
  getTotalCountDislikesPost,
  hasDislikedPost,
  handlePostDislikePress,
};
