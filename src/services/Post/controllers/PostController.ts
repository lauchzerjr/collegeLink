import { postApi } from "../../api/post.api";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../../models/user.model";
import { UserController } from "../../user/controllers/UserController";
import { LikeController } from "../../controllers/like.controller";
import { DislikeController } from "../../controllers/dislike.controller";
import { CommentController } from "../../Comment/controllers/CommentController";
import { PaginatedData } from "../../models/paginatedData.model";
import { Post } from "../../models/post.model";

const getPosts = async (
  nameCollection: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
): Promise<PaginatedData<Post>> => {
  const { data, lastVisible } = await postApi.getPosts(
    nameCollection,
    startAfter
  );

  const postsWithDetails: Post[] = await Promise.all(
    data.map(async (post: Post) => {
      const user = (await UserController.getUserInfos(
        post.userId
      )) as UserPostInfos;

      const postLikes = await LikeController.getTotalCountPostLikes(post.id);
      const postDislikes = await DislikeController.getTotalCountDislikesPost(
        post.id
      );
      const postComments = await CommentController.getTotalCountPostComments(
        post.id
      );

      return {
        ...post,
        userId: post.userId,
        user,
        postLikes,
        postDislikes,
        postComments,
      };
    })
  );

  return {
    data: postsWithDetails as Post[],
    lastVisible,
  };
};

export const PostController = {
  getPosts,
};
