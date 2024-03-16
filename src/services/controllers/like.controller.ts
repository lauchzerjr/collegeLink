import { likesApi } from "../api/like.api";
import { Like } from "../models/like.model";

const getTotalCountPostLikes = async (postId: string): Promise<number> => {
  return likesApi.getTotalCountLikes(postId);
};

const hasLikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  return likesApi.hasLiked({ postId, userId });
};

const handlePostLikePress = async ({ postId, userId }: Like) => {
  try {
    const hasLiked = await likesApi.hasLiked({ postId, userId });

    if (hasLiked) {
      await likesApi.removeLike({ postId, userId });
      return;
    } else {
      await likesApi.addLike({ postId, userId });
      return;
    }
  } catch (error) {
    console.error("Erro ao curtir/descurtir o post:", error);
    throw error;
  }
};

export const LikeController = {
  getTotalCountPostLikes,
  hasLikedPost,
  handlePostLikePress,
};
