import { likeApi } from "../../services/like.service";
import { Like } from "../../models/like.model";

const getTotalCountPostLikes = async (postId: string): Promise<number> => {
  return likeApi.getTotalCountLikes(postId);
};

const hasLikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  return likeApi.hasLiked({ postId, userId });
};

const handlePostLikePress = async ({ postId, userId }: Like) => {
  try {
    const hasLiked = await likeApi.hasLiked({ postId, userId });

    if (hasLiked) {
      await likeApi.removeLike({ postId, userId });
      return;
    } else {
      await likeApi.addLike({ postId, userId });
      return;
    }
  } catch (error) {
    console.error("Erro ao curtir o post:", error);
    throw error;
  }
};

export const LikeController = {
  getTotalCountPostLikes,
  hasLikedPost,
  handlePostLikePress,
};
